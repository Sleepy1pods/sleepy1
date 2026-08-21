import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    guestOnly?: boolean
    requiresAdmin?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },

    { path: '/locations', name: 'locations', component: () => import('@/views/LocationsView.vue') },
    { path: '/locations/:slug', name: 'location-detail', component: () => import('@/views/LocationDetailView.vue') },

    { path: '/pod-experience', name: 'pod-experience', component: () => import('@/views/PodExperienceView.vue') },
    { path: '/how-it-works', name: 'how-it-works', component: () => import('@/views/HowItWorksView.vue') },
    { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
    { path: '/faq', name: 'faq', component: () => import('@/views/FaqView.vue') },
    { path: '/contact', name: 'contact', component: () => import('@/views/ContactView.vue') },
    { path: '/support', redirect: '/contact' },

    { path: '/book', name: 'book', component: () => import('@/views/BookingView.vue'), meta: { requiresAuth: true } },
    { path: '/quick-book', name: 'quick-book', component: () => import('@/views/QuickBookingView.vue'), meta: { requiresAuth: true } },
    { path: '/bookings', name: 'my-bookings', component: () => import('@/views/MyBookingsView.vue'), meta: { requiresAuth: true } },
    { path: '/bookings/:id', name: 'booking-detail', component: () => import('@/views/BookingDetailView.vue'), meta: { requiresAuth: true } },

    { path: '/wallet', name: 'wallet', component: () => import('@/views/CreditsWalletView.vue'), meta: { requiresAuth: true } },
    { path: '/credits', name: 'credits-guide', component: () => import('@/views/CreditsGuideView.vue') },
    { path: '/membership', name: 'membership', component: () => import('@/views/MembershipView.vue') },

    { path: '/corporate', name: 'corporate', component: () => import('@/views/CorporateView.vue') },
    { path: '/gift-credits', name: 'gift-credits', component: () => import('@/views/GiftCreditsView.vue') },
    { path: '/offers', name: 'offers', component: () => import('@/views/OffersView.vue') },
    { path: '/newsletter', name: 'newsletter', component: () => import('@/views/NewsletterView.vue') },
    { path: '/refer', name: 'refer', component: () => import('@/views/ReferEarnView.vue') },
    { path: '/blog', name: 'blog', component: () => import('@/views/BlogView.vue') },
    { path: '/blog/:slug', name: 'blog-post', component: () => import('@/views/BlogPostView.vue') },
    { path: '/careers', name: 'careers', component: () => import('@/views/CareersView.vue') },
    { path: '/press', name: 'press', component: () => import('@/views/PressView.vue') },

    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue'), meta: { guestOnly: true } },
    { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue'), meta: { guestOnly: true } },
    { path: '/forgot-password', name: 'forgot-password', component: () => import('@/views/ForgotPasswordView.vue'), meta: { guestOnly: true } },
    { path: '/reset-password', name: 'reset-password', component: () => import('@/views/ResetPasswordView.vue'), meta: { guestOnly: true } },

    { path: '/legal/privacy-policy', name: 'privacy-policy', component: () => import('@/views/legal/PrivacyPolicyView.vue') },
    { path: '/legal/terms', name: 'terms', component: () => import('@/views/legal/TermsView.vue') },
    { path: '/legal/cancellation-policy', name: 'cancellation-policy', component: () => import('@/views/legal/CancellationPolicyView.vue') },
    { path: '/legal/refund-policy', name: 'refund-policy', component: () => import('@/views/legal/RefundPolicyView.vue') },
    { path: '/legal/cookie-policy', name: 'cookie-policy', component: () => import('@/views/legal/CookiePolicyView.vue') },

    { path: '/admin/login', name: 'admin-login', component: () => import('@/views/admin/AdminLoginView.vue'), meta: { guestOnly: true } },
    { path: '/admin/register', name: 'admin-register', component: () => import('@/views/admin/AdminRegisterView.vue'), meta: { guestOnly: true } },
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        { path: '', redirect: '/admin/dashboard' },
        { path: 'dashboard', name: 'admin-dashboard', component: () => import('@/views/admin/AdminDashboardView.vue') },
        { path: 'bookings', name: 'admin-bookings', component: () => import('@/views/admin/AdminBookingsView.vue') },
        { path: 'users', name: 'admin-users', component: () => import('@/views/admin/AdminUsersView.vue') },
        { path: 'locations', name: 'admin-locations', component: () => import('@/views/admin/AdminLocationsView.vue') },
      ]
    },

    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    const ui = useUiStore()
    ui.pushToast({ 
      type: 'error', 
      title: 'Authentication Required', 
      description: 'You must be logged in to access this page. Please log in first.' 
    })
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresAdmin && auth.user?.role !== 'admin') {
    const ui = useUiStore()
    ui.pushToast({ type: 'error', title: 'Access Denied', description: 'Admin access only.' })
    return { path: '/' }
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    if (auth.user?.role === 'admin') {
      if (to.path.startsWith('/admin')) {
        return { path: '/admin/dashboard' }
      }
      return true
    }
    return { path: '/' }
  }
  return true
})

export default router
