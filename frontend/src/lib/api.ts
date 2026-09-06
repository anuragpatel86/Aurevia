const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'API Error');
  }
  return response.json();
}

export const api = {
  getProducts: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return fetchAPI(`/products${query}`);
  },
  getProduct: (id: string) => fetchAPI(`/products/${id}`),
  getFeaturedProducts: () => fetchAPI('/products/featured'),
  getCategories: () => fetchAPI('/categories'),
  login: (data: any) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data: any) => fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  createOrder: (data: any) => fetchAPI('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getMyOrders: () => fetchAPI('/orders/myorders'),
};
