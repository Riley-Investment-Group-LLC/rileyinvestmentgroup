'use client'

import { useQuery } from '@tanstack/react-query'
import { reportApi } from '@/lib/api'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, AlertTriangle, FileText } from 'lucide-react'

export default function ReportsPage() {
  const { data: profitMargins, isLoading: loadingMargins } = useQuery({
    queryKey: ['profit-margins'],
    queryFn: async () => {
      const response = await reportApi.getProfitMargins()
      return response.data
    },
  })

  const { data: monthlySales, isLoading: loadingSales } = useQuery({
    queryKey: ['monthly-sales'],
    queryFn: async () => {
      const response = await reportApi.getMonthlySales()
      return response.data
    },
  })

  const { data: lowMarginSales, isLoading: loadingLowMargin } = useQuery({
    queryKey: ['low-margin-sales'],
    queryFn: async () => {
      const response = await reportApi.getLowMarginSales(10)
      return response.data
    },
  })

  const { data: st103, isLoading: loadingST103 } = useQuery({
    queryKey: ['st103'],
    queryFn: async () => {
      const response = await reportApi.getST103()
      return response.data
    },
  })

  const chartData = monthlySales?.monthly_sales?.map((month: any) => ({
    month: new Date(month.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    revenue: month.total_revenue,
    tax: month.total_tax_collected,
  })) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-800 mb-2 block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profit Margins Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Profit Margins Overview
          </h2>
          {loadingMargins ? (
            <div className="text-gray-600">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${profitMargins?.total_revenue?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total COGS</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${profitMargins?.total_cogs?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gross Profit</p>
                <p className="text-2xl font-bold text-green-600">
                  ${profitMargins?.gross_profit?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gross Margin</p>
                <p className={`text-2xl font-bold ${
                  (profitMargins?.gross_margin_percentage || 0) >= 10 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {profitMargins?.gross_margin_percentage?.toFixed(1) || '0.0'}%
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Monthly Sales Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales</h2>
          {loadingSales ? (
            <div className="text-gray-600">Loading...</div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => `$${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="revenue" fill="#2563eb" name="Revenue" />
                <Bar dataKey="tax" fill="#10b981" name="Tax Collected" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600">No sales data available</p>
          )}
        </div>

        {/* Low Margin Sales Alert */}
        {lowMarginSales && lowMarginSales.count > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Low Margin Sales (Below 10%)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">COGS</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Profit</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Margin</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lowMarginSales.invoices?.slice(0, 10).map((invoice: any) => (
                    <tr key={invoice.invoice_number} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-blue-600">{invoice.invoice_number}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{invoice.invoice_date}</td>
                      <td className="px-4 py-3 text-sm text-right">${invoice.revenue.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-right">${invoice.cogs.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-right">${invoice.profit.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <span className={`font-medium ${invoice.margin_percentage < 5 ? 'text-red-600' : 'text-yellow-600'}`}>
                          {invoice.margin_percentage.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ST-103 Tax Report */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            ST-103 Tax Report (Current Year)
          </h2>
          {loadingST103 ? (
            <div className="text-gray-600">Loading...</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Total Taxable Sales</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${st103?.total_taxable_sales?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Tax Collected</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${st103?.total_tax_collected?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tax Rate</p>
                  <p className="text-2xl font-bold text-gray-900">7.0%</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Indiana Taxpayer ID: {st103?.tid}</p>
                <p>Location: {st103?.location}</p>
                <p className="mt-4 text-xs">
                  File your ST-103 monthly by the 30th of the following month in INTIME.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
