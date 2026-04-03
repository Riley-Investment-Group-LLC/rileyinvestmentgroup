'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { bankApi } from '@/lib/api'
import Link from 'next/link'
import { ArrowLeft, Upload, FileText } from 'lucide-react'

export default function ImportBank() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!file) {
      setError('Please select a CSV file')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await bankApi.importChaseCSV(file)
      setSuccess(`Successfully imported ${response.data.imported_count} transactions`)
      setTimeout(() => router.push('/bank'), 2000)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to import CSV file')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/bank" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4" />
            Back to Bank
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Upload className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Import Chase CSV</h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">How to Export from Chase:</h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Log into Chase Business Online Banking</li>
              <li>Go to Account Activity</li>
              <li>Select date range (last 30 days recommended)</li>
              <li>Click "Download" → Select "CSV" format</li>
              <li>Save the file to your computer</li>
              <li>Upload it here</li>
            </ol>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chase CSV File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="csv-upload"
                />
                <label htmlFor="csv-upload" className="cursor-pointer">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  {file ? (
                    <p className="text-sm text-gray-700 font-medium">{file.name}</p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 mb-1">
                        Click to select CSV file
                      </p>
                      <p className="text-xs text-gray-500">
                        or drag and drop
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || !file}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {loading ? 'Importing...' : 'Import Transactions'}
              </button>
              <Link
                href="/bank"
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">What happens after import:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• System will parse all transactions from the CSV</li>
              <li>• Automatically match deposits to invoices</li>
              <li>• Automatically match charges to purchases</li>
              <li>• You can review and manually match any remaining transactions</li>
              <li>• Mark transactions as reconciled when verified</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
