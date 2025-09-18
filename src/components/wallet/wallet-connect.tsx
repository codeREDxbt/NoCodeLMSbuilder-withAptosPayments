"use client"

import { useState } from 'react'
import { useAptosWallet } from '@/components/providers/enhanced-aptos-provider'
import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react'

// Simple toast function
const toast = {
  success: (message: string) => {
    console.log('✅', message)
    // You can replace this with a proper toast implementation
    alert(message)
  },
  error: (message: string) => {
    console.error('❌', message)
    alert(message)
  }
}

export function WalletConnect() {
  const { 
    connect, 
    disconnect, 
    connected, 
    account, 
    wallet, 
    wallets 
  } = useAptosWallet()
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async (walletName: string) => {
    try {
      setIsConnecting(true)
      await connect(walletName as any)
      setIsDialogOpen(false)
      toast.success('Wallet connected successfully!')
    } catch (error) {
      console.error('Connection error:', error)
      toast.error('Failed to connect wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
      toast.success('Wallet disconnected')
    } catch (error) {
      console.error('Disconnect error:', error)
      toast.error('Failed to disconnect wallet')
    }
  }

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address)
      toast.success('Address copied to clipboard')
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const openExplorer = () => {
    if (account?.address) {
      window.open(`https://explorer.aptoslabs.com/account/${account.address}?network=devnet`, '_blank')
    }
  }

  if (connected && account) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-700">
            {formatAddress(account.address)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyAddress}
            className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={openExplorer}
            className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
        >
          <LogOut className="h-4 w-4 mr-1" />
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Your Aptos Wallet
          </DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to the LMS platform and start earning with APT.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {wallets?.map((walletInfo) => (
            <Button
              key={walletInfo.name}
              variant="outline"
              className="w-full justify-start h-12 text-left"
              onClick={() => handleConnect(walletInfo.name)}
              disabled={isConnecting}
            >
              <div className="flex items-center gap-3">
                {walletInfo.icon && (
                  <img 
                    src={walletInfo.icon} 
                    alt={walletInfo.name}
                    className="w-6 h-6 rounded"
                  />
                )}
                <div>
                  <div className="font-medium">{walletInfo.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {walletInfo.name === 'Martian' && 'Secure & user-friendly'}
                    {walletInfo.name === 'Pontem' && 'Full-featured wallet'}
                    {walletInfo.name === 'Rise' && 'Advanced features'}
                  </div>
                </div>
              </div>
            </Button>
          )) || (
            <div className="text-center py-4 text-muted-foreground">
              No wallets available
            </div>
          )}
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>New to Aptos?</strong> Install any of these wallets to get started with APT payments and course enrollment.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}