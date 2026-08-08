import type { AuthCredentials, RegisterPayload, User } from '@/types/user'
import { mockUser } from '@/data/user'
import { delay } from '@/utils/delay'

/**
 * Mock-only authentication. Credentials are not verified against any real
 * backend and localStorage is used purely to persist a demo session across
 * page reloads. Do not treat this as production authentication.
 */
const SESSION_KEY = 'sleepy1_mock_session'

export const authService = {
  async login(credentials: AuthCredentials): Promise<User> {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include'
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || 'Login failed')
    }
    const json = await res.json()
    const userData = json.data || {}
    
    const user = {
      ...mockUser,
      id: userData._id || userData.id || `usr-${Date.now()}`,
      fullName: userData.name || userData.fullName || 'User',
      email: userData.email,
      phone: userData.phone,
      avatarInitials: (userData.name || 'User').charAt(0).toUpperCase(),
    }
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    return user
  },

  async register(payload: RegisterPayload): Promise<User> {
    const body = {
      name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      password: payload.password
    }
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include'
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || 'Registration failed')
    }
    const json = await res.json()
    const userData = json.data || {}
    
    const user: User = {
      ...mockUser,
      id: userData._id || userData.id || `usr-${Date.now()}`,
      fullName: userData.name || userData.fullName || payload.fullName,
      email: userData.email || payload.email,
      phone: userData.phone || payload.phone,
      avatarInitials: (userData.name || payload.fullName).charAt(0).toUpperCase(),
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    return user
  },

  async requestOtp(_phoneOrEmail: string): Promise<{ demoOtp: string }> {
    return delay({ demoOtp: '123456' }, 400)
  },

  async verifyOtp(otp: string): Promise<boolean> {
    return delay(otp === '123456', 400)
  },

  async requestPasswordReset(_email: string): Promise<void> {
    await delay(null, 500)
  },

  async resetPassword(_token: string, _newPassword: string): Promise<void> {
    await delay(null, 500)
  },

  async logout(): Promise<void> {
    try {
      await fetch('http://localhost:5000/api/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      })
    } catch (e) {
      console.warn('Logout request failed', e)
    }
    localStorage.removeItem(SESSION_KEY)
  },

  restoreSession(): User | null {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as User
    } catch {
      return null
    }
  },

  async fetchUser(): Promise<User | null> {
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      if (!res.ok) return null
      const json = await res.json()
      const userData = json.data?.user || {}
      
      const user: User = {
        ...mockUser,
        id: userData._id || userData.id,
        fullName: userData.name || userData.fullName,
        email: userData.email,
        phone: userData.phone,
        avatarInitials: (userData.name || 'User').charAt(0).toUpperCase(),
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
      return user
    } catch {
      return null
    }
  }
}
