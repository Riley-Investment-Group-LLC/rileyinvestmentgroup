/**
 * API client for Riley Investment Group LLC backend
 */
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(API_KEY && { 'X-API-Key': API_KEY }),
  },
});

// Invoices
export const invoiceApi = {
  create: (data: any) => api.post('/invoices', data),
  list: (params?: any) => api.get('/invoices', { params }),
  get: (id: string) => api.get(`/invoices/${id}`),
  update: (id: string, data: any) => api.patch(`/invoices/${id}`, data),
  delete: (id: string) => api.delete(`/invoices/${id}`),
  getPdf: (id: string) => api.get(`/invoices/${id}/pdf`, { responseType: 'blob' }),
};

// Purchases
export const purchaseApi = {
  create: (data: any) => api.post('/purchases', data),
  list: (params?: any) => api.get('/purchases', { params }),
  get: (id: string) => api.get(`/purchases/${id}`),
  update: (id: string, data: any) => api.patch(`/purchases/${id}`, data),
  listSuppliers: () => api.get('/purchases/supplier/list'),
};

// Products
export const productApi = {
  create: (data: any) => api.post('/products', data),
  list: (params?: any) => api.get('/products', { params }),
  get: (id: string) => api.get(`/products/${id}`),
  getBySku: (sku: string) => api.get(`/products/sku/${sku}`),
  update: (id: string, data: any) => api.patch(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
  getProfitability: () => api.get('/products/profitability/report'),
};

// Customers
export const customerApi = {
  create: (data: any) => api.post('/customers', data),
  list: (params?: any) => api.get('/customers', { params }),
  get: (id: string) => api.get(`/customers/${id}`),
  update: (id: string, data: any) => api.patch(`/customers/${id}`, data),
  delete: (id: string) => api.delete(`/customers/${id}`),
  getInvoices: (id: string) => api.get(`/customers/${id}/invoices`),
};

// Reports
export const reportApi = {
  getMonthlySales: () => api.get('/reports/monthly-sales'),
  getST103: (params?: { year?: number; month?: number }) => 
    api.get('/reports/st103', { params }),
  getProfitMargins: (params?: { start_date?: string; end_date?: string }) => 
    api.get('/reports/profit-margins', { params }),
  getDashboard: () => api.get('/reports/dashboard'),
  getLowMarginSales: (threshold?: number) => 
    api.get('/reports/low-margin-sales', { params: { threshold } }),
};

// Bank
export const bankApi = {
  importChaseCSV: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/bank/import-chase-csv', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  listTransactions: (params?: any) => api.get('/bank/transactions', { params }),
  getUnreconciled: () => api.get('/bank/unreconciled'),
  reconcile: (id: string, data: any) => api.post(`/bank/reconcile/${id}`, data),
  autoReconcile: () => api.post('/bank/auto-reconcile'),
};

export default api;
