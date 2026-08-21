<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { adminService } from '@/services/adminService'

const stats = ref({ totalBookings: 0, totalUsers: 0, revenue: 0, recentBookings: [] as any[] })
const isLoading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    stats.value = await adminService.getDashboardStats()
  } catch (e: any) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="admin-dashboard">
    <!-- Error Banner -->
    <div v-if="error" class="admin-error">{{ error }}</div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-label">Total Bookings</span>
          <div class="stat-icon-wrapper">
            <svg class="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
        </div>
        <div class="stat-value" :class="{ loading: isLoading }">{{ isLoading ? '—' : stats.totalBookings }}</div>
        <div class="stat-trend up">
          <svg class="trend-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          <span>12% increase</span>
          <span class="trend-sub">vs last month</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-label">Active Users</span>
          <div class="stat-icon-wrapper">
            <svg class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
        </div>
        <div class="stat-value" :class="{ loading: isLoading }">{{ isLoading ? '—' : stats.totalUsers }}</div>
        <div class="stat-trend up">
          <svg class="trend-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          <span>5.4% increase</span>
          <span class="trend-sub">vs last month</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-label">Revenue (Credits)</span>
          <div class="stat-icon-wrapper">
            <svg class="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
        <div class="stat-value" :class="{ loading: isLoading }">{{ isLoading ? '—' : stats.revenue.toLocaleString() }}</div>
        <div class="stat-trend neutral">
          <span class="trend-sub">Estimated credit volume</span>
        </div>
      </div>
    </div>

    <!-- Recent Bookings Table Card -->
    <div class="admin-card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Recent Bookings</h2>
          <p class="card-subtitle">Live bookings synced with backend</p>
        </div>
        <router-link to="/admin/bookings" class="card-action-btn">
          View all bookings &rarr;
        </router-link>
      </div>

      <div class="table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact Email</th>
              <th>Date & Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="4" class="table-state-cell">
                <div class="loading-spinner"></div>
                <span>Loading recent bookings...</span>
              </td>
            </tr>
            <tr v-else-if="stats.recentBookings.length === 0">
              <td colspan="4" class="table-state-cell">No recent bookings recorded yet.</td>
            </tr>
            <tr v-else v-for="b in stats.recentBookings" :key="b._id" class="table-row">
              <td>
                <div class="user-profile-cell">
                  <div class="user-avatar-sm">{{ (b.name || 'U').substring(0, 2).toUpperCase() }}</div>
                  <div>
                    <div class="primary-text font-semibold">{{ b.name }}</div>
                    <div class="muted-text text-xs">{{ b.phone }}</div>
                  </div>
                </div>
              </td>
              <td>
                <span class="secondary-text font-mono text-xs">{{ b.email }}</span>
              </td>
              <td>
                <div class="primary-text text-sm font-medium">{{ b.checkInDate }}</div>
                <div class="muted-text text-xs">{{ b.checkInTime }} – {{ b.checkOutTime }}</div>
              </td>
              <td>
                <span class="badge badge-emerald">Confirmed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}
.admin-error {
  padding: 0.875rem 1.25rem;
  border-radius: 0.75rem;
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  font-size: 0.875rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
@media (min-width: 768px) {
  .stats-grid { grid-template-columns: repeat(3, 1fr); }
}

.stat-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.stat-card:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 0, 0, 0.15);
}
.dark .stat-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}
.stat-icon-wrapper {
  padding: 0.5rem;
  background-color: var(--bg);
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-value {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.1;
  font-family: var(--font-display, inherit);
}
.stat-value.loading { opacity: 0.3; }

.stat-trend {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 1rem;
  font-size: 0.8125rem;
  font-weight: 500;
}
.stat-trend.up { color: #10b981; }
.stat-trend.neutral { color: var(--text-muted); }
.trend-sub { color: var(--text-muted); font-size: 0.75rem; margin-left: 0.25rem; }
.trend-icon { width: 1rem; height: 1rem; flex-shrink: 0; }

/* Admin Card & Table */
.admin-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;
}
.card-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
}
@media (min-width: 640px) {
  .card-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}
.card-subtitle {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: 0.25rem 0 0 0;
}
.card-action-btn {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  padding: 0.5rem 0.875rem;
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
.card-action-btn:hover {
  background-color: var(--border);
}

.table-container {
  overflow-x: auto;
}
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
.table-state-cell {
  text-align: center;
  padding: 3rem 1.5rem !important;
  color: var(--text-muted);
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

/* Profile Cell */
.user-profile-cell {
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

.primary-text { color: var(--text-primary); }
.secondary-text { color: var(--text-secondary); }
.muted-text { color: var(--text-muted); }

/* Badges */
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
