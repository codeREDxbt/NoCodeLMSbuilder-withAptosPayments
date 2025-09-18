"use client"

import { ReactNode, createContext, useContext } from 'react'
import { AptosWalletAdapterProvider, useWallet } from '@aptos-labs/wallet-adapter-react'
import { Network } from '@aptos-labs/ts-sdk'
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter'
import { PontemWallet } from '@pontem/wallet-adapter-plugin'
import { RiseWallet } from '@rise-wallet/wallet-adapter'

// Contract configuration
export const CONTRACT_ADDRESS = "0x9e1ce87a71fcfe3322e03bf7e87243ad1052ff6f6b0b08981efc55ebff0a581e"
export const MODULE_NAME = "course_payments"

const wallets = [
  new MartianWallet(),
  new PontemWallet(),
  new RiseWallet(),
]

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      dappConfig={{
        network: Network.DEVNET,
        mizuwallet: {
          manifestURL: "https://assets.mizuwallet.com/dapp-config.json",
        },
      }}
      onError={(error) => {
        console.error("Wallet connection error:", error)
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  )
}

// Custom hook that extends the wallet adapter functionality
export function useAptosWallet() {
  const {
    connect,
    disconnect,
    account,
    connected,
    wallet,
    wallets,
    signAndSubmitTransaction,
    signMessage,
    signTransaction,
  } = useWallet()

  return {
    connect,
    disconnect,
    account,
    connected,
    wallet,
    wallets,
    signAndSubmitTransaction,
    signMessage,
    signTransaction,
    address: account?.address,
    publicKey: account?.publicKey,
  }
}

// Keep the old provider name for compatibility
export const AptosProvider = WalletProvider
export const useAptos = useAptosWallet