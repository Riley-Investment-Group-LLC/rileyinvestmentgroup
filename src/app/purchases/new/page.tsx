'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { purchaseApi, productApi } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Trash2 } from 'lucide-react'

interface PurchaseItem {
  product_id?: string
  sku: string
  description: string
  quantity: number
  unit_cost: number
}

export default function NewPurchasePage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  
  const [supplier, setSupplier] = useState('')
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0])
  const [items, setItems] = useState<PurchaseItem[]>([{
    sku: '',
    description: '',
    quantity: 1,
    unit_cost: 0
  }])
  const [taxAmount, setTaxAmount] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [usedResaleCertificate, setUsedResaleCertificate] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('Chase Business Credit')
  const [paymentStatus, setPaymentStatus] = useState('paid')
  const [notes, setNotes] = useState('')

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productApi.list()
      return response.data
    },
  })

  const createPurchaseMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await purchaseApi.create(data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
      router.push('/purchases')
    },
    onError: (error: any) => {
      alert(`Failed to create purchase: ${error.response?.data?.detail || error.message}`)
    },
  })

  const addItem = () => {
    setItems([...items, {
      sku: '',
      description: '',
      quantity: 1,
      unit_cost: 0
    }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof PurchaseItem, value: any) => {
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
      updateItem(index, 'unit_cost', product.cost_basis || 0)
    }
  }

  const calculateItemsTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unit_cost), 0)
  }

  const calculateTotal = () => {
    return calculateItemsTotal() + taxAmount + shippingCost
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!supplier) {
      alert('Please enter supplier name')
      return
    }

    if (items.length === 0 || items.some(item => !item.description || item.quantity <= 0)) {
      alert('Please add at least one valid item')
      return
    }

    const purchaseData = {
      supplier,
      purchase_date: purchaseDate,
      items: items.map(item => ({
        product_id: item.product_id || undefined,
        sku: item.sku || undefined,
        description: item.description,
        quantity: item.quantity,
        unit_cost: item.unit_cost
      })),
      tax_amount: taxAmount,
      shipping_cost: shippingCost,
      used_resale_certificate: usedResaleCertificate,
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      notes: notes || undefined
    }

    createPurchaseMutation.mutate(purchaseData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/purchases" className="text-sm text-blue-600 hover:text-blue-800 mb-2 block">
            ← Back to Purchases
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Record New Purchase</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Supplier and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier *
              </label>
              <input
                type="text"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Newegg Business, Best Buy, etc."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Date *
              </label>
              <input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Items Purchased *
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
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-3">
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
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Unit Cost *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.unit_cost}
                        onChange={(e) => updateItem(index, 'unit_cost', parseFloat(e.target.value) || 0)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Total</label>
                      <div className="text-sm font-medium text-gray-900 py-1">
                        ${(item.quantity * item.unit_cost).toFixed(2)}
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

          {/* Tax and Shipping */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={taxAmount}
                onChange={(e) => setTaxAmount(parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">Should be $0 if you used ST-105</p>
            </div>
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
                Used ST-105 Resale Certificate?
              </label>
              <select
                value={usedResaleCertificate ? 'yes' : 'no'}
                onChange={(e) => setUsedResaleCertificate(e.target.value === 'yes')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="yes">Yes (Tax Exempt)</option>
                <option value="no">No (Paid Tax)</option>
              </select>
            </div>
          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <input
                type="text"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Chase Business Credit, Check, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              rows={3}
              placeholder="ST-105 certificate sent, invoice #12345, etc."
            />
          </div>

          {/* Totals Summary */}
          <div className="border-t pt-6">
            <div className="max-w-md ml-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items Total:</span>
                <span className="font-medium">${calculateItemsTotal().toFixed(2)}</span>
              </div>
              {shippingCost > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
              )}
              {taxAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">${taxAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link
              href="/purchases"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={createPurchaseMutation.isPending}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createPurchaseMutation.isPending ? 'Recording...' : 'Record Purchase'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
