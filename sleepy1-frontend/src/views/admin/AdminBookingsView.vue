<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { adminService } from '@/services/adminService'

const bookings = ref<any[]>([])
const isLoading = ref(true)
const error = ref('')
const searchQuery = ref('')

onMounted(async () => {
  try {
    bookings.value = await adminService.getAllBookings()
  } catch (e: any) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
})

const filtered = computed(() => {
  if (!searchQuery.value) return bookings.value
  const q = searchQuery.value.toLowerCase()
  return bookings.value.filter(b =>
    b.name?.toLowerCase().includes(q) ||
    b.email?.toLowerCase().includes(q) ||
    b.phone?.toLowerCase().includes(q) ||
    b._id?.toLowerCase().includes(q)
  )
})

function exportCsv() {
  const headers = ['Booking ID', 'Customer Name', 'Email', 'Phone', 'Check-In Date', 'Check-In Time', 'Check-Out Time', 'Gender', 'Status']
  const rows = filtered.value.map(b => [
    `"${b._id}"`,
    `"${b.name || ''}"`,
    `"${b.email || ''}"`,
    `"${b.phone || ''}"`,
    `"${b.checkInDate || ''}"`,
    `"${b.checkInTime || ''}"`,
    `"${b.checkOutTime || ''}"`,
    `"${b.gender || ''}"`,
    '"Confirmed"'
  ])
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sleepy1_bookings_${new Date().toISOString().slice(0,10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h2 class="page-title">Bookings Management</h2>
        <p class="page-desc">View, filter, and export all customer pod bookings.</p>
      </div>
      <div class="header-actions">
        <div class="search-input-wrapper">
          <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input v-model="searchQuery" type="text" placeholder="Search by name, email, ID..." class="admin-search" />
        </div>
        <button @click="exportCsv" class="btn-export">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Export CSV
        </button>
      </div>
    </div>

    <div v-if="error" class="admin-error">{{ error }}</div>

    <div class="admin-table-card">
      <div class="table-scroll">
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Contact Details</th>
              <th>Booking Schedule</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="6" class="table-empty">
                <div class="loading-spinner"></div>
                <span>Loading bookings...</span>
              </td>
            </tr>
            <tr v-else-if="filtered.length === 0">
              <td colspan="6" class="table-empty">No bookings found matching your search.</td>
            </tr>
            <tr v-else v-for="b in filtered" :key="b._id" class="table-row">
              <td>
                <span class="id-badge font-mono">#{{ b._id.substring(0, 8) }}</span>
              </td>
              <td>
                <div class="user-cell">
                  <div class="user-avatar-sm">{{ (b.name || 'U').substring(0, 2).toUpperCase() }}</div>
                  <span class="primary-text font-semibold">{{ b.name }}</span>
                </div>
              </td>
              <td>
                <div class="primary-text text-sm">{{ b.email }}</div>
                <div class="muted-text text-xs">{{ b.phone }}</div>
              </td>
              <td>
                <div class="primary-text text-sm font-medium">{{ b.checkInDate }}</div>
                <div class="muted-text text-xs">{{ b.checkInTime }} – {{ b.checkOutTime }}</div>
              </td>
              <td>
                <span class="secondary-text text-sm capitalize">{{ b.gender || '—' }}</span>
              </td>
              <td>
                <span class="badge badge-emerald">Confirmed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-footer">
        <span>Showing <strong>{{ filtered.length }}</strong> of <strong>{{ bookings.length }}</strong> bookings</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}
.page-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
@media (min-width: 640px) {
  .page-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}
.page-desc {
  color: var(--text-secondary);
  margin-top: 0.25rem;
  font-size: 0.875rem;
}
.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: 0.875rem;
  width: 1rem;
  height: 1rem;
  color: var(--text-muted);
  pointer-events: none;
}
.admin-search {
  background-color: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 0.625rem 1rem 0.625rem 2.25rem;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  outline: none;
  min-width: 240px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.admin-search:focus {
  border-color: var(--text-primary);
  box-shadow: 0 0 0 2px var(--border);
}
.admin-search::placeholder {
  color: var(--text-muted);
}

.btn-export {
  background-color: var(--cta-bg);
  color: var(--cta-text);
  padding: 0.625rem 1.125rem;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-export:hover {
  opacity: 0.85;
}

.admin-error {
  padding: 0.875rem 1.25rem;
  border-radius: 0.75rem;
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  font-size: 0.875rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.admin-table-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;
}
.table-scroll { overflow-x: auto; }
.admin-table {
  width: 100%;
  text-align: left;
  font-size: 0.875rem;
  border-collapse: collapse;
}
.admin-table thead {
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
}
.admin-table th {
  padding: 0.875rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}
.admin-table td {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border);
  vertical-align: middle;
}
.table-row:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
.dark .table-row:hover {
  background-color: rgba(255, 255, 255, 0.02);
}
.table-empty {
  text-align: center;
  padding: 3rem 1.5rem !important;
  color: var(--text-muted);
}
.table-footer {
  padding: 0.875rem 1.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid var(--border);
  border-top-color: var(--text-primary);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin: 0 auto 0.5rem;
}
@keyframes spin { to { transform: rotate(360deg); } }

.user-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.user-avatar-sm {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background-color: var(--bg);
  border: 1px solid var(--border);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.id-badge {
  background-color: var(--bg);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
}

.primary-text { color: var(--text-primary); }
.secondary-text { color: var(--text-secondary); }
.muted-text { color: var(--text-muted); }

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.badge-emerald {
  background-color: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.25);
}
</style>
