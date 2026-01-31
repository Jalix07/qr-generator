'use client'

import { useState } from 'react'
import { FaQrcode, FaLink, FaWifi, FaAddressCard, FaEnvelope } from 'react-icons/fa'
import QRGenerator from '@/components/QRGenerator'

export default function Home() {
  const [qrType, setQrType] = useState<'url' | 'wifi' | 'vcard' | 'text' | 'email'>('url')

  return (
    <main className="min-h-screen py-8 px-4">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
            <FaQrcode className="inline-block mr-3 text-purple-600" />
            QR Code Generator
          </h1>
          <p className="text-center text-gray-600">
            Create custom QR codes for free • No sign-up • Unlimited downloads
          </p>
        </div>
      </header>

      {/* QR Type Selection */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button
            onClick={() => setQrType('url')}
            className={`p-6 rounded-lg shadow-md text-center transition-all ${
              qrType === 'url'
                ? 'bg-purple-600 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 hover:shadow-lg'
            }`}
          >
            <FaLink className="text-3xl mx-auto mb-2" />
            <p className="font-bold">URL</p>
          </button>

          <button
            onClick={() => setQrType('wifi')}
            className={`p-6 rounded-lg shadow-md text-center transition-all ${
              qrType === 'wifi'
                ? 'bg-purple-600 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 hover:shadow-lg'
            }`}
          >
            <FaWifi className="text-3xl mx-auto mb-2" />
            <p className="font-bold">WiFi</p>
          </button>

          <button
            onClick={() => setQrType('vcard')}
            className={`p-6 rounded-lg shadow-md text-center transition-all ${
              qrType === 'vcard'
                ? 'bg-purple-600 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 hover:shadow-lg'
            }`}
          >
            <FaAddressCard className="text-3xl mx-auto mb-2" />
            <p className="font-bold">vCard</p>
          </button>

          <button
            onClick={() => setQrType('email')}
            className={`p-6 rounded-lg shadow-md text-center transition-all ${
              qrType === 'email'
                ? 'bg-purple-600 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 hover:shadow-lg'
            }`}
          >
            <FaEnvelope className="text-3xl mx-auto mb-2" />
            <p className="font-bold">Email</p>
          </button>

          <button
            onClick={() => setQrType('text')}
            className={`p-6 rounded-lg shadow-md text-center transition-all ${
              qrType === 'text'
                ? 'bg-purple-600 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 hover:shadow-lg'
            }`}
          >
            <FaQrcode className="text-3xl mx-auto mb-2" />
            <p className="font-bold">Text</p>
          </button>
        </div>
      </div>

      {/* Generator */}
      <div className="max-w-6xl mx-auto">
        <QRGenerator type={qrType} />
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-16">
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
          <p className="mb-2">© 2026 QR Code Generator. Free forever.</p>
          <p className="text-sm">
            Generated QR codes are yours to keep. No watermarks, no limitations.
          </p>
        </div>
      </footer>
    </main>
  )
}
