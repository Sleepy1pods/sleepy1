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
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required.')
    }
    const user: User = { ...mockUser, email: credentials.email || mockUser.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    return delay(user, 500)
  },

  async register(payload: RegisterPayload): Promise<User> {
    const user: User = {
      ...mockUser,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      avatarInitials: payload.fullName.trim().charAt(0).toUpperCase() || 'S',
      membershipTier: 'explorer',
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    return delay(user, 600)
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
    localStorage.removeItem(SESSION_KEY)
    await delay(null, 200)
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
}
