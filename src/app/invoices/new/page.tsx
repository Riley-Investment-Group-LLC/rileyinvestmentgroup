'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { invoiceApi, customerApi, productApi } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Trash2 } from 'lucide-react'

interface InvoiceItem {
  product_id?: string
  sku: string
  description: string
  quantity: number
  unit_price: number
  cost_basis?: number
}

export default function NewInvoicePage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  
  const [customerId, setCustomerId] = useState('')
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0])
  const [dueDate, setDueDate] = useState('')
  const [items, setItems] = useState<InvoiceItem[]>([{
    sku: '',
    description: '',
    quantity: 1,
    unit_price: 0,
    cost_basis: 0
  }])
  const [notes, setNotes] = useState('')
  const [shippingCost, setShippingCost] = useState(0)

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await customerApi.list()
      return response.data
    },
  })

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productApi.list()
      return response.data
    },
  })

  const createInvoiceMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await invoiceApi.create(data)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
      router.push(`/invoices/${data.id}`)
    },
    onError: (error: any) => {
      alert(`Failed to create invoice: ${error.response?.data?.detail || error.message}`)
    },
  })

  const addItem = () => {
    setItems([...items, {
      sku: '',
      description: '',
      quantity: 1,
      unit_price: 0,
      cost_basis: 0
    }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const handleProductSelect = (index: number, productId: string) => {
    const product = products?.products?.find((p: any) => p.id === productId)
    if (product) {
      updateItem(index, 'product_id', product.id)
      updateItem(index, 'sku', product.sku)
      updateItem(index, 'description', product.name)
      updateItem(index, 'unit_price', product.unit_price || 0)
      updateItem(index, 'cost_basis', product.cost_basis || 0)
    }
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)
  }

  const calculateTax = () => {
    const customer = customers?.customers?.find((c: any) => c.id === customerId)
    if (customer?.tax_exempt) return 0
    return calculateSubtotal() * 0.07 // Indiana 7%
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + shippingCost
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!customerId) {
      alert('Please select a customer')
      return
    }

    if (items.length === 0 || items.some(item => !item.description || item.quantity <= 0)) {
      alert('Please add at least one valid item')
      return
    }

    const invoiceData = {
      customer_id: customerId,
      invoice_date: invoiceDate,
      due_date: dueDate || undefined,
      items: items.map(item => ({
        product_id: item.product_id || undefined,
        sku: item.sku || undefined,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        cost_basis: item.cost_basis || undefined
      })),
      shipping_cost: shippingCost,
      notes: notes || undefined
    }

    createInvoiceMutation.mutate(invoiceData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/invoices" className="text-sm text-blue-600 hover:text-blue-800 mb-2 block">
            ← Back to Invoices
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create New Invoice</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Customer and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer *
              </label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select customer...</option>
                {customers?.customers?.map((customer: any) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.company_name || customer.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invoice Date *
              </label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Line Items *
              </label>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Product (optional)
                      </label>
                      <select
                        value={item.product_id || ''}
                        onChange={(e) => handleProductSelect(index, e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="">Select or enter manually...</option>
                        {products?.products?.map((product: any) => (
                          <option key={product.id} value={product.id}>
                            {product.sku} - {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">SKU</label>
                      <input
                        type="text"
                        value={item.sku}
                        onChange={(e) => updateItem(index, 'sku', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description *</label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Qty *</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Unit Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.unit_price}
                        onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Cost Basis</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.cost_basis || ''}
                        onChange={(e) => updateItem(index, 'cost_basis', parseFloat(e.target.value) || 0)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="For margin tracking"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Total</label>
                      <div className="text-sm font-medium text-gray-900 py-1">
                        ${(item.quantity * item.unit_price).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Margin</label>
                      <div className="text-sm font-medium text-gray-900 py-1">
                        {item.cost_basis && item.cost_basis > 0
                          ? `${(((item.unit_price - item.cost_basis) / item.cost_basis) * 100).toFixed(1)}%`
                          : '-'}
                      </div>
                    </div>
                    <div className="md:col-span-2 flex items-end">
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Cost
              </label>
              <input
                type="number"
                step="0.01"
                value={shippingCost}
                onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Payment terms, special instructions..."
              />
            </div>
          </div>

          {/* Totals Summary */}
          <div className="border-t pt-6">
            <div className="max-w-md ml-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              {shippingCost > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sales Tax (7%):</span>
                <span className="font-medium">${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link
              href="/invoices"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={createInvoiceMutation.isPending}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createInvoiceMutation.isPending ? 'Creating...' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
