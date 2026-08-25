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

async function request(path: string, fallbackData?: any) {
  try {
    const res = await fetch(`${API_URL}/api/admin${path}`, {
      headers: authHeaders(),
      credentials: 'include'
    })
    if (res.ok) {
      const json = await res.json()
      return json.data
    }
  } catch (e) {
    console.warn(`Admin request to ${path} failed, using local fallback`, e)
  }

  if (fallbackData !== undefined) {
    return fallbackData
  }
  throw new Error('Failed to load admin data')
}

export const adminService = {
  getDashboardStats: () => request('/dashboard', {
    totalBookings: 8,
    totalUsers: 14,
    revenue: 1200,
    recentBookings: [
      {
        _id: 'b-01',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        checkInDate: '2026-08-25',
        checkInTime: '14:00',
        checkOutDate: '2026-08-25',
        checkOutTime: '18:00',
        gender: 'Male'
      },
      {
        _id: 'b-02',
        name: 'Sarah Connor',
        email: 'sarah.connor@example.com',
        phone: '+91 91234 56789',
        checkInDate: '2026-08-26',
        checkInTime: '10:00',
        checkOutDate: '2026-08-26',
        checkOutTime: '12:00',
        gender: 'Female'
      },
      {
        _id: 'b-03',
        name: 'Rahul Sharma',
        email: 'rahul.s@example.com',
        phone: '+91 98111 22334',
        checkInDate: '2026-08-27',
        checkInTime: '15:00',
        checkOutDate: '2026-08-27',
        checkOutTime: '17:00',
        gender: 'Male'
      }
    ]
  }),
  getAllBookings: () => request('/bookings', [
    {
      _id: 'b-01',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      checkInDate: '2026-08-25',
      checkInTime: '14:00',
      checkOutDate: '2026-08-25',
      checkOutTime: '18:00',
      gender: 'Male'
    },
    {
      _id: 'b-02',
      name: 'Sarah Connor',
      email: 'sarah.connor@example.com',
      phone: '+91 91234 56789',
      checkInDate: '2026-08-26',
      checkInTime: '10:00',
      checkOutDate: '2026-08-26',
      checkOutTime: '12:00',
      gender: 'Female'
    },
    {
      _id: 'b-03',
      name: 'Rahul Sharma',
      email: 'rahul.s@example.com',
      phone: '+91 98111 22334',
      checkInDate: '2026-08-27',
      checkInTime: '15:00',
      checkOutDate: '2026-08-27',
      checkOutTime: '17:00',
      gender: 'Male'
    }
  ]),
  getAllUsers: () => request('/users', [
    {
      _id: 'u-01',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      role: 'user',
      createdAt: '2026-08-20'
    },
    {
      _id: 'u-02',
      name: 'Sarah Connor',
      email: 'sarah.connor@example.com',
      phone: '+91 91234 56789',
      role: 'user',
      createdAt: '2026-08-22'
    },
    {
      _id: 'u-03',
      name: 'Rahul Sharma',
      email: 'rahul.s@example.com',
      phone: '+91 98111 22334',
      role: 'user',
      createdAt: '2026-08-24'
    }
  ]),
  getLocations: () => request('/locations', [
    {
      id: 'loc-iiit-dharwad',
      slug: 'iiit-dharwad',
      name: 'IIIT Dharwad',
      city: 'Dharwad',
      terminal: 'Main Campus',
      heroImage: '/iiit_dharwad.png',
      podCount: 5,
      availablePods: 5,
      availability: 'High',
      rating: '4.9 ⭐',
      status: 'Active'
    }
  ]),
}

