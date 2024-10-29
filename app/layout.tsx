import DeployButton from '@/components/supabase/deploy-button'
import { EnvVarWarning } from '@/components/supabase/env-var-warning'
import HeaderAuth from '@/components/supabase/header-auth'
import { hasEnvVars } from '@/utils/supabase/check-env-vars'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import './globals.css'
import SideNavigation from '@/components/layouts/SideNavigation'
import Header from '@/components/layouts/header'
import Headerbar from '@/components/layouts/Headerbar'
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Portfolio',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <Header />
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SideNavigation />
          {/* <DeployButton /> */}
          {/* {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />} */}
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <Headerbar />
              <div className="flex flex-col w-full p-12 pl-24 ">{children}</div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
