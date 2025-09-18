import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NoCode LMS Builder - Create Courses with Aptos Payments',
  description: 'Build and sell online courses with ease. Accept payments in APT cryptocurrency on the Aptos blockchain.',
  keywords: ['LMS', 'Course Builder', 'Aptos', 'Cryptocurrency', 'Online Learning', 'No Code'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}