'use client'

import { useState, useEffect, useRef } from 'react'
import { FaDownload, FaPalette } from 'react-icons/fa'
import QRCode from 'qrcode'
import { saveAs } from 'file-saver'
import { motion } from 'framer-motion'

interface QRGeneratorProps {
  type: 'url' | 'wifi' | 'vcard' | 'text' | 'email'
}

export default function QRGenerator({ type }: QRGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrData, setQrData] = useState('')
  const [qrColor, setQrColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [size, setSize] = useState(300)
  
  // Form fields for different types
  const [url, setUrl] = useState('https://example.com')
  const [wifiSSID, setWifiSSID] = useState('')
  const [wifiPassword, setWifiPassword] = useState('')
  const [wifiEncryption, setWifiEncryption] = useState('WPA')
  const [vcardName, setVcardName] = useState('')
  const [vcardPhone, setVcardPhone] = useState('')
  const [vcardEmail, setVcardEmail] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [textContent, setTextContent] = useState('')

  useEffect(() => {
    let data = ''
    
    switch (type) {
      case 'url':
        data = url
        break
      case 'wifi':
        data = `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;`
        break
      case 'vcard':
        data = `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`
        break
      case 'email':
        data = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}`
        break
      case 'text':
        data = textContent
        break
    }
    
    setQrData(data)
  }, [type, url, wifiSSID, wifiPassword, wifiEncryption, vcardName, vcardPhone, vcardEmail, emailAddress, emailSubject, textContent])

  useEffect(() => {
    if (canvasRef.current && qrData) {
      QRCode.toCanvas(canvasRef.current, qrData, {
        width: size,
        margin: 2,
        color: {
          dark: qrColor,
          light: bgColor,
        },
      })
    }
  }, [qrData, qrColor, bgColor, size])

  const downloadQR = (format: 'png' | 'svg') => {
    if (format === 'png' && canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) saveAs(blob, 'qrcode.png')
      })
    } else if (format === 'svg') {
      QRCode.toString(qrData, {
        type: 'svg',
        color: { dark: qrColor, light: bgColor },
      }).then((svg) => {
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        saveAs(blob, 'qrcode.svg')
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">QR Code Content</h2>

        {type === 'url' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        )}

        {type === 'wifi' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WiFi Network Name (SSID)
              </label>
              <input
                type="text"
                value={wifiSSID}
                onChange={(e) => setWifiSSID(e.target.value)}
                placeholder="MyNetwork"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="text"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                placeholder="password123"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Encryption
              </label>
              <select
                value={wifiEncryption}
                onChange={(e) => setWifiEncryption(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
              </select>
            </div>
          </div>
        )}

        {type === 'vcard' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={vcardName}
                onChange={(e) => setVcardName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={vcardPhone}
                onChange={(e) => setVcardPhone(e.target.value)}
                placeholder="+1234567890"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={vcardEmail}
                onChange={(e) => setVcardEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        )}

        {type === 'email' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="contact@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Hello"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        )}

        {type === 'text' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Content
            </label>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Enter your text here..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        )}

        {/* Customization */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <FaPalette className="mr-2 text-purple-600" /> Customize
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Color
              </label>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size: {size}px
            </label>
            <input
              type="range"
              min="200"
              max="600"
              step="50"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* QR Code Preview & Download */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Preview & Download</h2>

        <motion.div
          key={qrData}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center mb-6"
        >
          <canvas ref={canvasRef} className="border-4 border-gray-200 rounded-lg" />
        </motion.div>

        <div className="space-y-3">
          <button
            onClick={() => downloadQR('png')}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center justify-center"
          >
            <FaDownload className="mr-2" /> Download PNG
          </button>
          <button
            onClick={() => downloadQR('svg')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <FaDownload className="mr-2" /> Download SVG
          </button>
        </div>
      </div>
    </div>
  )
}
