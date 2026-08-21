<script setup lang="ts">
import { onMounted } from 'vue'
import { useLocationsStore } from '@/stores/locations'

const store = useLocationsStore()

onMounted(() => {
  store.fetchAll()
})
</script>

<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h2 class="page-title">Locations Management</h2>
        <p class="page-desc">All Sleepy1 pod locations synced with live location services.</p>
      </div>
      <div class="header-actions">
        <div class="search-input-wrapper">
          <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            :value="store.searchQuery"
            @input="store.setSearchQuery(($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="Search locations or cities..."
            class="admin-search"
          />
        </div>
      </div>
    </div>

    <div class="locations-grid">
      <div v-if="store.isLoading && store.all.length === 0" class="empty-state">
        <div class="loading-spinner"></div>
        <span>Loading locations...</span>
      </div>
      <div v-else-if="store.filtered.length === 0" class="empty-state">No locations found matching your search.</div>
      <div v-else v-for="loc in store.filtered" :key="loc.id" class="location-card">
        <div class="location-image">
          <img :src="loc.heroImage || '/iiit_dharwad.png'" :alt="loc.name" />
        </div>
        <div class="location-body">
          <div class="location-top">
            <div>
              <h3 class="location-name">{{ loc.name }}</h3>
              <p class="location-city">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {{ loc.city }} — {{ loc.terminal || loc.hubType || 'Main Campus' }}
              </p>
            </div>
            <span class="badge badge-emerald">Active</span>
          </div>
          <div class="location-stats">
            <div class="stat-pill">
              <span class="stat-small-label">Total Pods</span>
              <span class="stat-small-value">{{ loc.podCount || 5 }} Units</span>
            </div>
            <div class="stat-pill">
              <span class="stat-small-label">Availability</span>
              <span class="stat-small-value capitalize">{{ loc.availability || 'High' }}</span>
            </div>
          </div>
        </div>
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
  min-width: 260px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.admin-search:focus {
  border-color: var(--text-primary);
  box-shadow: 0 0 0 2px var(--border);
}
.admin-search::placeholder {
  color: var(--text-muted);
}

.locations-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
@media (min-width: 1024px) {
  .locations-grid { grid-template-columns: repeat(2, 1fr); }
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
}

.location-card {
  display: flex;
  flex-direction: column;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.location-card:hover {
  transform: translateY(-2px);
  border-color: var(--text-primary);
}
@media (min-width: 640px) {
  .location-card { flex-direction: row; }
}

.location-image {
  width: 100%;
  height: 9rem;
  flex-shrink: 0;
  overflow: hidden;
}
@media (min-width: 640px) {
  .location-image { width: 9rem; height: auto; }
}
.location-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.location-body {
  flex: 1;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.location-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}
.location-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}
.location-city {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.location-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
}
.stat-pill {
  background-color: var(--bg);
  border: 1px solid var(--border);
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
}
.stat-small-label {
  font-size: 0.6875rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}
.stat-small-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 0.125rem;
}

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
</style>
