import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import {ReactNode} from "react";

const inter = Poppins({ weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Check24 Artisan\'s',
  description: 'Search for the best artisans in the world',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
