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
  icons: {
    icon: [
      { url: "/Mosaic_Logo-removebg-preview.png", sizes: "any", type: "image/png" },
      { url: "/Mosaic_Logo-removebg-preview.png", sizes: "16x16", type: "image/png" },
      { url: "/Mosaic_Logo-removebg-preview.png", sizes: "32x32", type: "image/png" },
      { url: "/Mosaic_Logo-removebg-preview.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/Mosaic_Logo-removebg-preview.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Mosaic_Logo-removebg-preview.png" sizes="any" type="image/png" />
        <link rel="icon" href="/Mosaic_Logo-removebg-preview.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/Mosaic_Logo-removebg-preview.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/Mosaic_Logo-removebg-preview.png" sizes="48x48" type="image/png" />
        <link rel="apple-touch-icon" href="/Mosaic_Logo-removebg-preview.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <TooltipProvider delayDuration={300}>
          <Suspense fallback={null}>{children}</Suspense>
        </TooltipProvider>
        <Analytics />
      </body>
    </html>
  )
}
