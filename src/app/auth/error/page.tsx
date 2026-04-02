'use client'

import { useSearchParams } from 'next/navigation'
import { AlertCircle, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You are not authorized to access this system
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">
            <strong>Only @rileyinvestmentgroup.com accounts are allowed.</strong>
          </p>
          <p className="text-sm text-red-600 mt-2">
            {error === 'AccessDenied' 
              ? 'Your email domain is not authorized.'
              : 'An authentication error occurred.'}
          </p>
        </div>

        <Link
          href="/auth/signin"
          className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Try Again
        </Link>
      </div>
    </div>
  )
}
