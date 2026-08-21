const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_URL = rawUrl.replace(/\/+$/, '')
const TOKEN_KEY = 'sleepy1_auth_token'

function authHeaders() {
  const token = localStorage.getItem(TOKEN_KEY)
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

async function request(path: string) {
  const res = await fetch(`${API_URL}/api/admin${path}`, {
    headers: authHeaders(),
    credentials: 'include'
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Request failed')
  return json.data
}

export const adminService = {
  getDashboardStats: () => request('/dashboard'),
  getAllBookings: () => request('/bookings'),
  getAllUsers: () => request('/users'),
  getLocations: () => request('/locations'),
}
