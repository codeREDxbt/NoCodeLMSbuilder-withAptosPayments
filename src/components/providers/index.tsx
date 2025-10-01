'use client'

import { AptosProvider } from './aptos-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AptosProvider>
      {children}
    </AptosProvider>
  )
}