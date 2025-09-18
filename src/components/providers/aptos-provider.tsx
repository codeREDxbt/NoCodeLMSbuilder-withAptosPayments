"use client"

import { ReactNode, createContext, useContext, useState, useCallback } from 'react'
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'

// Contract configuration
export const CONTRACT_ADDRESS = "0x9e1ce87a71fcfe3322e03bf7e87243ad1052ff6f6b0b08981efc55ebff0a581e"
export const MODULE_NAME = "course_payments"

interface AptosContextType {
  aptos: Aptos
  connected: boolean
  account: string | null
  balance: number | null
  connect: () => Promise<void>
  disconnect: () => void
  sendTransaction: (payload: any) => Promise<string>
  getBalance: () => Promise<void>
  loading: boolean
  error: string | null
}

const AptosContext = createContext<AptosContextType | null>(null)

interface AptosProviderProps {
  children: ReactNode
}

// Initialize Aptos client
const config = new AptosConfig({ 
  network: Network.TESTNET // Use testnet for development
})
const aptos = new Aptos(config)

export function AptosProvider({ children }: AptosProviderProps) {
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connect = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Check if wallet is available (Petra wallet)
      if (!window.aptos) {
        throw new Error('Petra wallet not found. Please install Petra wallet extension.')
      }

      // Connect to wallet
      const response = await window.aptos.connect()
      setAccount(response.address)
      setConnected(true)
      
      // Get balance
      await getBalance()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
      console.error('Wallet connection error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setConnected(false)
    setAccount(null)
    setBalance(null)
    setError(null)
  }, [])

  const getBalance = useCallback(async () => {
    if (!account) return

    try {
      const resources = await aptos.getAccountResources({
        accountAddress: account
      })
      
      const coinResource = resources.find(
        (resource) => resource.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
      )
      
      if (coinResource) {
        const balanceValue = (coinResource.data as any).coin.value
        setBalance(parseInt(balanceValue) / 100000000) // Convert from octas to APT
      }
    } catch (err) {
      console.error('Error fetching balance:', err)
    }
  }, [account])

  const sendTransaction = useCallback(async (payload: any): Promise<string> => {
    if (!connected || !account || !window.aptos) {
      throw new Error('Wallet not connected')
    }

    try {
      setLoading(true)
      setError(null)

      // Sign and submit transaction
      const pendingTransaction = await window.aptos.signAndSubmitTransaction(payload)
      
      // Wait for transaction confirmation
      const txnResponse = await aptos.waitForTransaction({
        transactionHash: pendingTransaction.hash
      })

      // Refresh balance after transaction
      await getBalance()

      return txnResponse.hash
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Transaction failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [connected, account, getBalance])

  const value: AptosContextType = {
    aptos,
    connected,
    account,
    balance,
    connect,
    disconnect,
    sendTransaction,
    getBalance,
    loading,
    error
  }

  return (
    <AptosContext.Provider value={value}>
      {children}
    </AptosContext.Provider>
  )
}

export function useAptos() {
  const context = useContext(AptosContext)
  if (!context) {
    throw new Error('useAptos must be used within an AptosProvider')
  }
  return context
}

// Extend window type for Petra wallet
declare global {
  interface Window {
    aptos?: {
      connect(): Promise<{ address: string; publicKey: string }>
      disconnect(): Promise<void>
      signAndSubmitTransaction(transaction: any): Promise<{ hash: string }>
      signMessage(payload: any): Promise<any>
      network(): Promise<string>
      isConnected(): Promise<boolean>
    }
  }
}