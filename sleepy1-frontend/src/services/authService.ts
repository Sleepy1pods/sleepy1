import type { AuthCredentials, RegisterPayload, User } from '@/types/user'
import { mockUser } from '@/data/user'
import { delay } from '@/utils/delay'

/**
 * Mock-only authentication. Credentials are not verified against any real
 * backend and localStorage is used purely to persist a demo session across
 * page reloads. Do not treat this as production authentication.
 */
const SESSION_KEY = 'sleepy1_mock_session'
const USERS_DB_KEY = 'sleepy1_mock_users_db'

function getSavedUsers(): Record<string, User> {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveUserToDb(user: User): void {
  try {
    const db = getSavedUsers()
    db[user.email.toLowerCase()] = user
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(db))
  } catch {
    // ignore storage errors
  }
}

function formatNameFromEmail(email?: string): { fullName: string; avatarInitials: string } {
  if (!email || !email.includes('@')) {
    return { fullName: 'Sleepy1 Member', avatarInitials: 'S' }
  }
  const localPart = email.split('@')[0] || ''
  const clean = localPart.replace(/[._+-]+/g, ' ').replace(/\d+/g, '').trim()
  const words = clean.split(/\s+/).filter(Boolean)
  if (words.length === 0) {
    const fallbackWord = localPart.trim() || 'Member'
    const fullName = fallbackWord.charAt(0).toUpperCase() + fallbackWord.slice(1).toLowerCase()
    return { fullName, avatarInitials: fullName.charAt(0).toUpperCase() }
  }
  const fullName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
  const avatarInitials = words[0].charAt(0).toUpperCase()
  return { fullName, avatarInitials }
}

export const authService = {
  async login(credentials: AuthCredentials): Promise<User> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required.')
    }
    const emailKey = (credentials.email || '').trim().toLowerCase()
    const savedUsers = getSavedUsers()
    let user = savedUsers[emailKey]

    if (!user) {
      const { fullName, avatarInitials } = formatNameFromEmail(credentials.email)
      user = {
        ...mockUser,
        id: `usr-${Date.now()}`,
        email: credentials.email,
        fullName,
        avatarInitials,
      }
      saveUserToDb(user)
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    return delay(user, 500)
  },

  async register(payload: RegisterPayload): Promise<User> {
    const user: User = {
      ...mockUser,
      id: `usr-${Date.now()}`,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      avatarInitials: payload.fullName.trim().charAt(0).toUpperCase() || 'S',
      membershipTier: 'explorer',
    }
    saveUserToDb(user)
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
      const user = JSON.parse(raw) as User
      if (user && user.fullName === 'Rupesh Kumar' && user.email) {
        const emailKey = user.email.trim().toLowerCase()
        const savedUsers = getSavedUsers()
        const saved = savedUsers[emailKey]
        if (saved && saved.fullName !== 'Rupesh Kumar') {
          user.fullName = saved.fullName
          user.avatarInitials = saved.avatarInitials
        } else {
          const { fullName, avatarInitials } = formatNameFromEmail(user.email)
          user.fullName = fullName
          user.avatarInitials = avatarInitials
        }
        localStorage.setItem(SESSION_KEY, JSON.stringify(user))
        saveUserToDb(user)
      }
      return user
    } catch {
      return null
    }
  },
}
