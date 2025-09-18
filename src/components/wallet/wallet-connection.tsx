"use client"

import { useState } from 'react'
import { useAptos } from '@/components/providers/aptos-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, LogOut, AlertCircle, Loader2 } from 'lucide-react'

export function WalletConnection() {
  const { connected, account, balance, connect, disconnect, loading, error, getBalance } = useAptos()
  const [refreshingBalance, setRefreshingBalance] = useState(false)

  const handleRefreshBalance = async () => {
    setRefreshingBalance(true)
    try {
      await getBalance()
    } catch (err) {
      console.error('Failed to refresh balance:', err)
    } finally {
      setRefreshingBalance(false)
    }
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!connected) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Wallet className="h-12 w-12 mx-auto text-primary mb-4" />
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your Aptos wallet to start buying and selling courses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <Button 
            onClick={connect} 
            disabled={loading} 
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Petra Wallet
              </>
            )}
          </Button>
          
          <div className="text-xs text-center text-muted-foreground">
            <p>Don't have a wallet? 
              <a 
                href="https://petra.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-1"
              >
                Download Petra
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Wallet Connected</span>
          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
        </CardTitle>
        <CardDescription>
          {account && truncateAddress(account)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Balance:</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono">
                {balance !== null ? `${balance.toFixed(4)} APT` : 'Loading...'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefreshBalance}
                disabled={refreshingBalance}
              >
                {refreshingBalance ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  '↻'
                )}
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <Button 
          onClick={disconnect} 
          variant="outline" 
          className="w-full"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </Button>
      </CardContent>
    </Card>
  )
}