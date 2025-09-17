import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mosaic Sport Capital - Connecting Diaspora to Israeli Football",
  description:
    "Private advisory in legacy sport acquisitions. Connecting diaspora capital with Israeli football opportunities.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <TooltipProvider delayDuration={300}>
          <Suspense fallback={null}>{children}</Suspense>
        </TooltipProvider>
        <Analytics />
      </body>
    </html>
  )
}
