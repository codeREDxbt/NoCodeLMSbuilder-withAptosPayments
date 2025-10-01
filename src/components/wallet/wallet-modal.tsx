"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Wallet, 
  AlertCircle, 
  CheckCircle, 
  Copy, 
  ExternalLink,
  Loader2,
  LogOut,
  RefreshCw
} from 'lucide-react'
import { useAptos } from '@/components/providers/aptos-provider'

interface WalletOption {
  name: string
  icon: string
  description: string
  installUrl: string
  available: boolean
  recommended?: boolean
}

const walletOptions: WalletOption[] = [
  {
    name: 'Petra',
    icon: '🟠',
    description: 'The most popular Aptos wallet',
    installUrl: 'https://petra.app/',
    available: typeof window !== 'undefined' && !!window.aptos,
    recommended: true
  },
  {
    name: 'Martian',
    icon: '🔵', 
    description: 'Multi-chain wallet with Aptos support',
    installUrl: 'https://martianwallet.xyz/',
    available: false
  },
  {
    name: 'Fewcha',
    icon: '🟡',
    description: 'Simple and secure Aptos wallet',
    installUrl: 'https://fewcha.app/',
    available: false
  }
]

export function WalletModal() {
  const { 
    connected, 
    account, 
    balance, 
    connect, 
    disconnect, 
    loading, 
    error, 
    getBalance 
  } = useAptos()
  
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  useEffect(() => {
    if (connected && account) {
      getBalance()
    }
  }, [connected, account, getBalance])

  const copyAddress = async () => {
    if (account) {
      await navigator.clipboard.writeText(account)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const openExplorer = () => {
    if (account) {
      window.open(`https://explorer.aptoslabs.com/account/${account}?network=testnet`, '_blank')
    }
  }

  const handleConnect = async (walletName: string) => {
    setSelectedWallet(walletName)
    try {
      await connect()
      setIsOpen(false)
    } catch (err) {
      console.error('Connection failed:', err)
    } finally {
      setSelectedWallet(null)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setIsOpen(false)
  }

  if (connected) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{account ? truncateAddress(account) : 'Connected'}</span>
            <Wallet className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Wallet Connected</span>
            </DialogTitle>
            <DialogDescription>
              Your Aptos wallet is connected and ready to use
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Account Info */}
            <div className="p-4 bg-green-50 rounded-lg space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Account Address</label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="text-sm bg-white px-2 py-1 rounded border flex-1 font-mono">
                    {account || 'Loading...'}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={openExplorer}
                    className="h-8 w-8 p-0"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
                {copied && (
                  <p className="text-xs text-green-600 mt-1">✓ Copied to clipboard</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Balance</label>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-lg font-semibold">
                    {balance !== null ? `${balance.toFixed(4)} APT` : 'Loading...'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={getBalance}
                    disabled={loading}
                    className="h-8"
                  >
                    {loading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <RefreshCw className="w-3 h-3" />
                    )}
                  </Button>
                </div>
                {balance !== null && balance < 0.01 && (
                  <Alert className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Low balance. Get testnet APT from{' '}
                      <a 
                        href="https://faucet.testnet.aptoslabs.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        faucet
                      </a>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Network Info */}
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium">Network</span>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                Aptos Testnet
              </Badge>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Actions */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => window.open('https://faucet.testnet.aptoslabs.com', '_blank')}
                className="flex-1"
              >
                Get Testnet APT
              </Button>
              <Button
                variant="destructive"
                onClick={handleDisconnect}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to the Aptos network and start making payments
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            {walletOptions.map((wallet) => (
              <div
                key={wallet.name}
                className={`p-4 border rounded-lg transition-all ${
                  wallet.available 
                    ? 'hover:border-indigo-300 cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => wallet.available && handleConnect(wallet.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{wallet.name}</h3>
                        {wallet.recommended && (
                          <Badge variant="secondary" className="text-xs">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{wallet.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {wallet.available ? (
                      <Button
                        size="sm"
                        disabled={loading && selectedWallet === wallet.name}
                      >
                        {loading && selectedWallet === wallet.name ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          'Connect'
                        )}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(wallet.installUrl, '_blank')
                        }}
                      >
                        Install
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-gray-500">
              New to Aptos wallets?{' '}
              <a 
                href="https://aptosfoundation.org/ecosystem/wallets" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Learn more
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WalletModal