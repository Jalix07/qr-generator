import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Free QR Code Generator - Create Custom QR Codes Online | URL, WiFi, vCard',
  description: 'Generate QR codes for free. Create custom QR codes for URLs, WiFi, vCard, text, email, and more. Customize colors, add logos, download PNG/SVG. No sign-up required!',
  keywords: 'qr code generator, free qr code maker, custom qr code, wifi qr code, vcard qr code, qr code with logo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
