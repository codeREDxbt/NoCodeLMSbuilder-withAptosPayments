'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Wallet, CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react'
import { useAptos, CONTRACT_ADDRESS, MODULE_NAME } from '@/components/providers/aptos-provider'
import WalletModal from '@/components/wallet/wallet-modal'

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
  const { 
    connected, 
    account, 
    balance, 
    sendTransaction, 
    loading: walletLoading, 
    error: walletError 
  } = useAptos()
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [paymentStep, setPaymentStep] = useState<'connect' | 'confirm' | 'processing' | 'success' | 'error'>('connect')

  useEffect(() => {
    if (connected && account) {
      setPaymentStep('confirm')
    } else {
      setPaymentStep('connect')
      setTransactionHash('')
    }
  }, [connected, account])

  const processPayment = async () => {
    if (!connected || !account) {
      onPaymentError('Wallet not connected')
      return
    }

    if (balance !== null && balance < price) {
      onPaymentError('Insufficient balance. Please add more APT to your wallet.')
      return
    }

    setIsProcessing(true)
    setPaymentStep('processing')
    
    try {
      // Create the payment transaction payload
      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::purchase_course`,
        arguments: [courseId, (price * 100000000).toString()], // Convert to octas
        type_arguments: [],
      }

      // Send the transaction
      const txnHash = await sendTransaction(payload)
      setTransactionHash(txnHash)
      setPaymentStep('success')
      onPaymentSuccess(txnHash)
      
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentStep('error')
      const errorMessage = error instanceof Error ? error.message : 'Payment failed'
      onPaymentError(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  const simulatePayment = async () => {
    // For demo purposes when wallet is not connected
    setIsProcessing(true)
    setPaymentStep('processing')
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate mock transaction hash
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64)
      setTransactionHash(mockTxHash)
      setPaymentStep('success')
      onPaymentSuccess(mockTxHash)
      
    } catch (error) {
      setPaymentStep('error')
      onPaymentError('Simulated payment failed')
    } finally {
      setIsProcessing(false)
    }
  }

  // Success state
  if (paymentStep === 'success' && transactionHash) {
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
                  onClick={() => window.open(`https://explorer.aptoslabs.com/txn/${transactionHash}?network=testnet`, '_blank')}
                  className="text-green-600 border-green-300"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => window.location.href = `/course/${courseId}`}
            >
              Start Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Error state
  if (paymentStep === 'error') {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <CardTitle className="text-red-900">Payment Failed</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                The payment could not be processed. Please try again.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => setPaymentStep(connected ? 'confirm' : 'connect')}
              className="w-full"
            >
              Try Again
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
        {/* Wallet Error */}
        {walletError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{walletError}</AlertDescription>
          </Alert>
        )}

        {/* Payment Step: Connect Wallet */}
        {paymentStep === 'connect' && (
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
            
            <div className="flex space-x-2">
              <WalletModal />
              <Button 
                variant="outline"
                onClick={simulatePayment} 
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Demo Payment'
                )}
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              Supported wallets: Petra, Martian, Pontem
            </p>
          </div>
        )}

        {/* Payment Step: Confirm Payment */}
        {paymentStep === 'confirm' && connected && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-green-900">
                    Wallet Connected
                  </h3>
                  <p className="text-sm text-green-700 font-mono">
                    {account?.slice(0, 16)}...{account?.slice(-8)}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Balance: {balance?.toFixed(4)} APT
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

            {/* Insufficient Balance Warning */}
            {balance !== null && balance < price && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Insufficient balance. You need {price} APT but only have {balance.toFixed(4)} APT.
                  <br />
                  <a 
                    href="https://faucet.testnet.aptoslabs.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Get testnet APT from faucet
                  </a>
                </AlertDescription>
              </Alert>
            )}
            
            <Button 
              onClick={processPayment} 
              disabled={isProcessing || walletLoading || (balance !== null && balance < price)}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                'Pay Now'
              )}
            </Button>
            
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

        {/* Payment Step: Processing */}
        {paymentStep === 'processing' && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
            <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
            <p className="text-sm text-gray-600">
              Please confirm the transaction in your wallet...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AptosPayment