'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react'

interface AptosPaymentProps {
  courseId: string
  courseTitle: string
  price: number
  onPaymentSuccess: (transactionHash: string) => void
  onPaymentError: (error: string) => void
}

export function AptosPayment({ 
  courseId, 
  courseTitle, 
  price, 
  onPaymentSuccess, 
  onPaymentError 
}: AptosPaymentProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [transactionHash, setTransactionHash] = useState('')

  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      // Mock wallet connection - in real implementation, you'd use Aptos wallet adapter
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate wallet connection
      const mockAddress = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      setWalletAddress(mockAddress)
      setWalletConnected(true)
      
    } catch (error) {
      onPaymentError('Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  const processPayment = async () => {
    setIsProcessing(true)
    try {
      // Mock payment processing - in real implementation, you'd call Aptos smart contract
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulate successful transaction
      const mockTxHash = '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
      setTransactionHash(mockTxHash)
      onPaymentSuccess(mockTxHash)
      
    } catch (error) {
      onPaymentError('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const disconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress('')
    setTransactionHash('')
  }

  if (transactionHash) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <CardTitle className="text-green-900">Payment Successful!</CardTitle>
          </div>
          <CardDescription className="text-green-700">
            Your enrollment has been confirmed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-green-900">Course</p>
              <p className="text-sm text-green-700">{courseTitle}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Amount Paid</p>
              <p className="text-sm text-green-700">{price} APT</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Transaction Hash</p>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-green-700 font-mono">
                  {transactionHash.slice(0, 16)}...{transactionHash.slice(-8)}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://explorer.aptoslabs.com/txn/${transactionHash}`, '_blank')}
                  className="text-green-600 border-green-300"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => window.location.href = `/course/${courseId}/learn`}
            >
              Start Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-5 w-5" />
          <span>Aptos Payment</span>
        </CardTitle>
        <CardDescription>
          Secure payment via Aptos blockchain
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!walletConnected ? (
          <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-100 rounded-full p-2">
                  <Wallet className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-indigo-900">
                    Connect Your Aptos Wallet
                  </h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Connect your Aptos wallet to enroll in this course using APT tokens.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Course:</span>
                <span className="font-medium">{courseTitle}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Price:</span>
                <span className="font-medium">{price} APT</span>
              </div>
            </div>
            
            <Button 
              onClick={connectWallet} 
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Aptos Wallet
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Supported wallets: Petra, Martian, Pontem
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-green-900">
                    Wallet Connected
                  </h3>
                  <p className="text-sm text-green-700 font-mono">
                    {walletAddress.slice(0, 16)}...{walletAddress.slice(-8)}
                  </p>
                </div>
                <Badge variant="outline" className="text-green-700 border-green-300">
                  Connected
                </Badge>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Payment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Course:</span>
                  <span>{courseTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span>{price} APT</span>
                </div>
                <div className="flex justify-between">
                  <span>Network Fee:</span>
                  <span>~0.001 APT</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{(price + 0.001).toFixed(3)} APT</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={disconnectWallet}
                className="flex-1"
              >
                Disconnect
              </Button>
              <Button 
                onClick={processPayment} 
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Pay Now'
                )}
              </Button>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-xs text-yellow-800">
                    <strong>Important:</strong> Make sure you have sufficient APT balance 
                    and approve the transaction in your wallet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}