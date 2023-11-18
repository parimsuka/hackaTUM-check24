import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import {ReactNode} from "react";
import classNames from "classnames";
import SideNavbar from "@/components/SideNavbar";

const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin', 'latin-ext', 'devanagari'] })

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
      <body className={classNames(poppins.className, 'bg-background')}>
      <main className="flex">
        <div className="w-1/4 p-4 sticky top-0 h-screen">
          <SideNavbar/>
        </div>
        <div className="w-3/4">
          {children}
        </div>
      </main>
      </body>
    </html>
  )
}
