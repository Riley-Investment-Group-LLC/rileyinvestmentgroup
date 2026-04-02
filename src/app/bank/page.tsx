'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bankApi } from '@/lib/api'
import Link from 'next/link'
import { Upload, RefreshCw, CheckCircle } from 'lucide-react'

export default function BankPage() {
  const queryClient = useQueryClient()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { data: unreconciled, isLoading } = useQuery({
    queryKey: ['unreconciled-transactions'],
    queryFn: async () => {
      const response = await bankApi.getUnreconciled()
      return response.data
    },
  })

  const importMutation = useMutation({
    mutationFn: async (file: File) => {
      const response = await bankApi.importChaseCSV(file)
      return response.data
    },
    onSuccess: (data) => {
      alert(`Imported ${data.imported} transactions, skipped ${data.skipped} duplicates`)
      queryClient.invalidateQueries({ queryKey: ['unreconciled-transactions'] })
      setSelectedFile(null)
    },
    onError: (error: any) => {
      alert(`Import failed: ${error.response?.data?.detail || error.message}`)
    },
  })

  const autoReconcileMutation = useMutation({
    mutationFn: async () => {
      const response = await bankApi.autoReconcile()
      return response.data
    },
    onSuccess: (data) => {
      alert(`Auto-matched ${data.matched} transactions. ${data.remaining_unreconciled} remain unreconciled.`)
      queryClient.invalidateQueries({ queryKey: ['unreconciled-transactions'] })
    },
    onError: (error: any) => {
      alert(`Auto-reconcile failed: ${error.response?.data?.detail || error.message}`)
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleImport = () => {
    if (selectedFile) {
      importMutation.mutate(selectedFile)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-800 mb-2 block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Bank Reconciliation</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Import Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Import Chase Transactions</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Chase Business Checking CSV
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button
                  onClick={handleImport}
                  disabled={!selectedFile || importMutation.isPending}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4" />
                  {importMutation.isPending ? 'Importing...' : 'Import'}
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Download your Chase transactions as CSV from Chase Business Online, then upload here.
            </p>
          </div>
        </div>

        {/* Auto-Reconcile */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Auto-Reconcile</h2>
              <p className="text-sm text-gray-600">
                Automatically match transactions with invoices and purchases based on amount and date.
              </p>
            </div>
            <button
              onClick={() => autoReconcileMutation.mutate()}
              disabled={autoReconcileMutation.isPending}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${autoReconcileMutation.isPending ? 'animate-spin' : ''}`} />
              {autoReconcileMutation.isPending ? 'Processing...' : 'Run Auto-Reconcile'}
            </button>
          </div>
        </div>

        {/* Unreconciled Transactions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Unreconciled Transactions ({unreconciled?.count || 0})
          </h2>
          {isLoading ? (
            <div className="text-gray-600">Loading...</div>
          ) : unreconciled?.transactions?.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600">All transactions reconciled!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {unreconciled?.transactions?.map((transaction: any) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(transaction.transaction_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{transaction.description}</td>
                      <td className={`px-4 py-3 text-sm text-right font-medium ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          transaction.category === 'INCOME' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">How to Download Chase CSV</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Log in to Chase Business Online</li>
            <li>Go to your Business Checking account</li>
            <li>Click "Download" or "Activity"</li>
            <li>Select date range and choose "CSV" format</li>
            <li>Download and upload the CSV file here</li>
          </ol>
        </div>
      </main>
    </div>
  )
}
