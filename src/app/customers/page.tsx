'use client'

import { useQuery } from '@tanstack/react-query'
import { customerApi } from '@/lib/api'
import Link from 'next/link'
import { Users, Plus, CheckCircle, XCircle } from 'lucide-react'

export default function CustomersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await customerApi.list()
      return response.data
    },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/" className="text-sm text-blue-600 hover:text-blue-800 mb-2 block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
            </div>
            <Link
              href="/customers/new"
              className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Customer
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">Loading customers...</div>
        ) : data?.customers?.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers yet</h3>
            <p className="text-gray-600 mb-6">Add your first customer to start invoicing</p>
            <Link
              href="/customers/new"
              className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Customer
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company / Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax Exempt
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.customers?.map((customer: any) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {customer.company_name || customer.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>{customer.email}</div>
                      <div className="text-xs text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {customer.billing_address?.split(',')[0] || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {customer.tax_exempt ? (
                        <CheckCircle className="w-5 h-5 text-green-500 inline" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300 inline" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
