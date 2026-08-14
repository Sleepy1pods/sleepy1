<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: 'button' | 'RouterLink' | 'a'
    to?: string
    href?: string
    type?: 'button' | 'submit'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
  }>(),
  {
    as: 'button',
    to: undefined,
    href: undefined,
    type: 'button',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
)

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm sm:text-base',
  lg: 'px-8 py-4 text-base sm:text-lg',
}
</script>

<template>
  <component
    :is="as === 'RouterLink' ? 'router-link' : as"
    :to="as === 'RouterLink' ? to : undefined"
    :href="as === 'a' ? href : undefined"
    :type="as === 'button' ? type : undefined"
    :disabled="as === 'button' ? disabled || loading : undefined"
    :class="[
      'btn-base shadow-soft transition-all duration-200 hover:opacity-85 hover:-translate-y-px active:translate-y-0 active:opacity-70',
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
    ]"
    :style="{ backgroundColor: 'var(--cta-bg)', color: 'var(--cta-text)' }"
  >
    <svg v-if="loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    <slot />
  </component>
</template>
