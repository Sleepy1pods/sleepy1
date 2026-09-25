export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function generateBookingReference(): string {
  const digits = Math.floor(10000 + Math.random() * 89999)
  return `SLPY-${digits}`
}

export function formatTime12h(timeStr: string | null | undefined): string {
  if (!timeStr) return ''
  const parts = timeStr.trim().split(':')
  if (parts.length < 2) return timeStr
  let h = parseInt(parts[0], 10)
  const m = parts[1].slice(0, 2)
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${m} ${ampm}`
}
