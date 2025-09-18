"use client"

import { SessionProvider } from "next-auth/react"
import { AptosProvider } from "@/components/providers/aptos-provider"
import type { Session } from "next-auth"

interface ProvidersProps {
  children: React.ReactNode
  session?: Session | null
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <AptosProvider>
        {children}
      </AptosProvider>
    </SessionProvider>
  )
}