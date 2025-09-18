"use client"

import { useState } from 'react'
import { useAptos } from '@/components/providers/aptos-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle, AlertCircle, Coins } from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  price: number // Price in APT
  instructor: string
  aptosContractAddress?: string
  aptosCourseId?: string
}

interface CourseEnrollmentProps {
  course: Course
  onEnrollmentSuccess?: (transactionHash: string) => void
}

export function CourseEnrollment({ course, onEnrollmentSuccess }: CourseEnrollmentProps) {
  const { connected, account, balance, sendTransaction, loading } = useAptos()
  const [enrolling, setEnrolling] = useState(false)
  const [enrollmentStatus, setEnrollmentStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleEnrollment = async () => {
    if (!connected || !account) {
      setErrorMessage('Please connect your wallet first')
      return
    }

    if (!balance || balance < course.price) {
      setErrorMessage(`Insufficient balance. You need ${course.price} APT but only have ${balance?.toFixed(4)} APT`)
      return
    }

    setEnrolling(true)
    setEnrollmentStatus('idle')
    setErrorMessage(null)

    try {
      // Create transaction payload for course enrollment
      const payload = {
        type: "entry_function_payload",
        function: `${course.aptosContractAddress || '0x1'}::course_payments::enroll_in_course`,
        type_arguments: [],
        arguments: [
          course.aptosCourseId || "1", // course_id
          course.aptosContractAddress || '0x1' // platform_address
        ]
      }

      // For demo purposes, if no contract address is provided, simulate payment
      if (!course.aptosContractAddress) {
        // Simulate a simple APT transfer to instructor
        const transferPayload = {
          type: "entry_function_payload",
          function: "0x1::coin::transfer",
          type_arguments: ["0x1::aptos_coin::AptosCoin"],
          arguments: [
            course.instructor, // recipient
            Math.floor(course.price * 100000000).toString() // amount in octas
          ]
        }
        
        const txHash = await sendTransaction(transferPayload)
        setTransactionHash(txHash)
        setEnrollmentStatus('success')
        onEnrollmentSuccess?.(txHash)
      } else {
        // Use smart contract enrollment
        const txHash = await sendTransaction(payload)
        setTransactionHash(txHash)
        setEnrollmentStatus('success')
        onEnrollmentSuccess?.(txHash)
      }
    } catch (error) {
      setEnrollmentStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Enrollment failed')
    } finally {
      setEnrolling(false)
    }
  }

  const getStatusIcon = () => {
    switch (enrollmentStatus) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Coins className="h-5 w-5 text-primary" />
    }
  }

  const getStatusMessage = () => {
    switch (enrollmentStatus) {
      case 'success':
        return (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Successfully enrolled! Transaction hash: 
              <a 
                href={`https://explorer.aptoslabs.com/txn/${transactionHash}?network=testnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs ml-1 underline hover:no-underline"
              >
                {transactionHash?.slice(0, 10)}...
              </a>
            </AlertDescription>
          </Alert>
        )
      case 'error':
        return (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )
      default:
        return null
    }
  }

  if (!connected) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Coins className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="font-semibold">Connect Wallet to Enroll</h3>
              <p className="text-sm text-muted-foreground">
                Connect your Aptos wallet to purchase this course
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getStatusIcon()}
          <span>Course Enrollment</span>
        </CardTitle>
        <CardDescription>
          Enroll in "{course.title}" for {course.price} APT
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Course Price:</span>
            <span className="font-mono">{course.price} APT</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Your Balance:</span>
            <span className="font-mono">
              {balance !== null ? `${balance.toFixed(4)} APT` : 'Loading...'}
            </span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span>After Purchase:</span>
            <span className="font-mono">
              {balance !== null ? `${(balance - course.price).toFixed(4)} APT` : 'Loading...'}
            </span>
          </div>
        </div>

        {getStatusMessage()}

        <Button
          onClick={handleEnrollment}
          disabled={
            enrolling || 
            loading || 
            !balance || 
            balance < course.price || 
            enrollmentStatus === 'success'
          }
          className="w-full"
        >
          {enrolling ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Payment...
            </>
          ) : enrollmentStatus === 'success' ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Enrolled Successfully
            </>
          ) : (
            <>
              <Coins className="mr-2 h-4 w-4" />
              Pay {course.price} APT to Enroll
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Payment is processed on the Aptos blockchain. 
          Transaction fees may apply.
        </p>
      </CardContent>
    </Card>
  )
}