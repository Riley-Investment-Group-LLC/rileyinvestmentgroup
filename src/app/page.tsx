'use client'

import { useQuery } from '@tanstack/react-query'
import { reportApi } from '@/lib/api'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp,
  AlertCircle,
  FileText,
  LogOut
} from 'lucide-react'

export default function Dashboard() {
  const { data: session } = useSession()
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await reportApi.getDashboard()
      return response.data
    },
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.total_revenue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`,
      icon: DollarSign,
      color: 'bg-blue-500',
    },
    {
      title: 'Outstanding',
      value: `$${stats?.outstanding_revenue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`,
      icon: AlertCircle,
      color: 'bg-yellow-500',
    },
    {
      title: 'This Month',
      value: `$${stats?.month_revenue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Total Purchases',
      value: `$${stats?.total_purchases?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`,
      icon: ShoppingCart,
      color: 'bg-purple-500',
    },
    {
      title: 'Products',
      value: stats?.product_count || 0,
      icon: Package,
      color: 'bg-indigo-500',
    },
    {
      title: 'Customers',
      value: stats?.customer_count || 0,
      icon: Users,
      color: 'bg-pink-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Riley Investment Group LLC</h1>
              <p className="text-sm text-gray-600">Business Management System</p>
            </div>
            <div className="flex items-center gap-6">
              <nav className="flex gap-4">
                <Link href="/invoices" className="text-blue-600 hover:text-blue-800">
                  Invoices
                </Link>
                <Link href="/purchases" className="text-blue-600 hover:text-blue-800">
                  Purchases
                </Link>
                <Link href="/products" className="text-blue-600 hover:text-blue-800">
                  Products
                </Link>
                <Link href="/customers" className="text-blue-600 hover:text-blue-800">
                  Customers
                </Link>
                <Link href="/reports" className="text-blue-600 hover:text-blue-800">
                  Reports
                </Link>
                <Link href="/bank" className="text-blue-600 hover:text-blue-800">
                  Bank
                </Link>
              </nav>
              <div className="flex items-center gap-3 border-l pl-4">
                <span className="text-sm text-gray-600">{session?.user?.email}</span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/invoices/new"
              className="flex items-center gap-3 p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-600">New Invoice</span>
            </Link>
            <Link
              href="/purchases/new"
              className="flex items-center gap-3 p-4 border-2 border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-600">Record Purchase</span>
            </Link>
            <Link
              href="/products/new"
              className="flex items-center gap-3 p-4 border-2 border-indigo-500 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <Package className="w-5 h-5 text-indigo-600" />
              <span className="font-medium text-indigo-600">Add Product</span>
            </Link>
            <Link
              href="/bank/import"
              className="flex items-center gap-3 p-4 border-2 border-green-500 rounded-lg hover:bg-green-50 transition-colors"
            >
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-600">Import Chase CSV</span>
            </Link>
          </div>
        </div>

        {/* Alerts */}
        {stats?.unreconciled_transactions > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You have <strong>{stats.unreconciled_transactions}</strong> unreconciled bank transactions.{' '}
                  <Link href="/bank" className="font-medium underline">
                    Review now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h2>
            <Link href="/invoices" className="text-sm text-blue-600 hover:text-blue-800">
              View all invoices →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Purchases</h2>
            <Link href="/purchases" className="text-sm text-blue-600 hover:text-blue-800">
              View all purchases →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
