<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Dashboard', to: '/admin/dashboard', icon: 'home' },
  { name: 'Bookings', to: '/admin/bookings', icon: 'calendar' },
  { name: 'Users', to: '/admin/users', icon: 'users' },
  { name: 'Locations', to: '/admin/locations', icon: 'map' },
]

const currentRouteName = computed(() => {
  const current = navigation.find(item => route.path === item.to || route.path.startsWith(item.to + '/'))
  return current?.name || 'Admin'
})

function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}

async function handleLogout() {
  await authStore.logout()
  router.push('/admin/login')
}
</script>

<template>
  <div class="admin-shell">
    <!-- Sidebar (Desktop) -->
    <aside class="admin-sidebar">
      <div class="admin-sidebar-header">
        <router-link to="/admin/dashboard" class="admin-logo-link">
          <img src="/Logo.png" alt="Sleepy1" class="admin-logo-icon dark:invert-0 invert" loading="lazy" decoding="async" />
          <img src="/Logo-text.png" alt="Sleepy1" class="admin-logo-text dark:invert-0 invert" loading="lazy" decoding="async" />
        </router-link>
      </div>

      <nav class="admin-sidebar-nav">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          class="admin-nav-item"
          :class="{ active: isActive(item.to) }"
        >
          <!-- Icons -->
          <svg v-if="item.icon === 'home'" class="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <svg v-else-if="item.icon === 'calendar'" class="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <svg v-else-if="item.icon === 'users'" class="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <svg v-else-if="item.icon === 'map'" class="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
          {{ item.name }}
        </router-link>
      </nav>

      <div class="admin-sidebar-footer">
        <div class="admin-user-info">
          <div class="admin-avatar">{{ authStore.user?.avatarInitials || 'A' }}</div>
          <div class="admin-user-details">
            <p class="admin-user-name">{{ authStore.user?.fullName }}</p>
            <p class="admin-user-email">{{ authStore.user?.email }}</p>
          </div>
        </div>
        <button @click="handleLogout" class="admin-logout-btn">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Sign Out
        </button>
        <router-link to="/" class="admin-back-link">&larr; Back to Main Site</router-link>
      </div>
    </aside>

    <!-- Mobile Header -->
    <header class="admin-mobile-header">
      <router-link to="/admin/dashboard" class="admin-logo-link">
        <img src="/Logo.png" alt="Sleepy1" class="admin-logo-icon dark:invert-0 invert" loading="lazy" decoding="async" />
        <img src="/Logo-text.png" alt="Sleepy1" class="admin-logo-text dark:invert-0 invert" loading="lazy" decoding="async" />
      </router-link>
      <div class="admin-mobile-actions">
        <ThemeToggle />
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="admin-hamburger" aria-label="Toggle menu">
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </header>

    <!-- Mobile Menu Dropdown -->
    <Transition name="slide-down">
      <div v-if="mobileMenuOpen" class="admin-mobile-menu">
        <nav class="admin-mobile-nav">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            @click="mobileMenuOpen = false"
            class="admin-mobile-nav-item"
            :class="{ active: isActive(item.to) }"
          >
            {{ item.name }}
          </router-link>
        </nav>
        <div class="admin-mobile-menu-footer">
          <div class="admin-user-info mb-3">
            <div class="admin-avatar">{{ authStore.user?.avatarInitials || 'A' }}</div>
            <div class="admin-user-details">
              <p class="admin-user-name">{{ authStore.user?.fullName }}</p>
              <p class="admin-user-email">{{ authStore.user?.email }}</p>
            </div>
          </div>
          <button @click="handleLogout" class="admin-mobile-logout">Sign Out</button>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <main class="admin-main">
      <div class="admin-topbar">
        <h1 class="admin-page-title">{{ currentRouteName }}</h1>
        <div class="admin-topbar-actions">
          <ThemeToggle />
        </div>
      </div>
      <div class="admin-content">
        <router-view v-slot="{ Component, route: childRoute }">
          <Transition name="admin-fade" mode="out-in">
            <component :is="Component" :key="childRoute.path" />
          </Transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
.admin-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-sans, 'Inter', system-ui, sans-serif);
  transition: background-color 0.3s ease, color 0.3s ease;
}
@media (min-width: 768px) {
  .admin-shell { flex-direction: row; }
}

/* Sidebar */
.admin-sidebar {
  display: none;
  flex-direction: column;
  width: 260px;
  background-color: var(--surface);
  border-right: 1px solid var(--border);
  flex-shrink: 0;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
@media (min-width: 768px) {
  .admin-sidebar { display: flex; }
}
.admin-sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
}
.admin-logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}
.admin-logo-icon { height: 2rem; width: 2rem; object-fit: contain; }
.admin-logo-text { height: 1.25rem; object-fit: contain; }
.admin-sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}
.admin-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.admin-nav-item:hover {
  color: var(--text-primary);
  background-color: var(--bg);
  border-color: var(--border);
}
.admin-nav-item.active {
  color: var(--text-primary);
  background-color: var(--bg);
  border-color: var(--border);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.admin-nav-icon { width: 1.25rem; height: 1.25rem; flex-shrink: 0; }

.admin-sidebar-footer {
  padding: 1.25rem;
  border-top: 1px solid var(--border);
}
.admin-user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
}
.admin-avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background-color: var(--cta-bg);
  color: var(--cta-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}
.admin-user-details { min-width: 0; }
.admin-user-name { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.admin-user-email { font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.admin-logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 0.625rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.admin-logout-btn:hover {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
  background-color: rgba(239, 68, 68, 0.05);
}

.admin-back-link {
  display: block;
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}
.admin-back-link:hover { color: var(--text-primary); }

/* Mobile Header */
.admin-mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background-color: var(--surface);
  border-bottom: 1px solid var(--border);
}
@media (min-width: 768px) {
  .admin-mobile-header { display: none; }
}
.admin-mobile-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.admin-hamburger {
  color: var(--text-primary);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile Menu */
.admin-mobile-menu {
  background-color: var(--surface);
  border-bottom: 1px solid var(--border);
}
@media (min-width: 768px) {
  .admin-mobile-menu { display: none; }
}
.admin-mobile-nav { padding: 0.75rem 1rem; display: flex; flex-direction: column; gap: 0.375rem; }
.admin-mobile-nav-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border-radius: 0.625rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}
.admin-mobile-nav-item:hover { background-color: var(--bg); color: var(--text-primary); }
.admin-mobile-nav-item.active { background-color: var(--bg); border-color: var(--border); color: var(--text-primary); font-weight: 600; }
.admin-mobile-menu-footer {
  padding: 1rem;
  border-top: 1px solid var(--border);
}
.admin-mobile-logout {
  width: 100%;
  padding: 0.625rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 0.625rem;
  cursor: pointer;
  text-align: center;
}

/* Main Content */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background-color: var(--bg);
}
.admin-topbar {
  display: none;
  height: 4.5rem;
  border-bottom: 1px solid var(--border);
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: var(--surface);
}
@media (min-width: 768px) {
  .admin-topbar { display: flex; }
}
.admin-page-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}
.admin-topbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.admin-content {
  flex: 1;
  overflow: auto;
  padding: 1.25rem;
}
@media (min-width: 768px) {
  .admin-content { padding: 2rem; }
}

/* Transitions */
.admin-fade-enter-active, .admin-fade-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.admin-fade-enter-from, .admin-fade-leave-to { opacity: 0; transform: translateY(4px); }

.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
