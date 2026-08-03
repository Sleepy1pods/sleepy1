<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    as?: 'button' | 'RouterLink' | 'a'
    to?: string
    href?: string
    type?: 'button' | 'submit'
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'danger'
    disabled?: boolean
    fullWidth?: boolean
  }>(),
  {
    as: 'button',
    to: undefined,
    href: undefined,
    type: 'button',
    size: 'md',
    variant: 'default',
    disabled: false,
    fullWidth: false,
  },
)

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm sm:text-base',
  lg: 'px-8 py-4 text-base sm:text-lg',
}

const variantClasses: Record<string, string> = {
  default: 'border border-white/20 text-ivory-100 hover:border-white/40 hover:bg-white/5 active:bg-white/10',
  danger: 'border border-rose-400/40 text-rose-300 hover:bg-rose-400/10 active:bg-rose-400/15',
}
</script>

<template>
  <component
    :is="as === 'RouterLink' ? 'router-link' : as"
    :to="as === 'RouterLink' ? to : undefined"
    :href="as === 'a' ? href : undefined"
    :target="as === 'a' ? '_blank' : undefined"
    :rel="as === 'a' ? 'noopener noreferrer' : undefined"
    :type="as === 'button' ? type : undefined"
    :disabled="as === 'button' ? disabled : undefined"
    :class="[
      'btn-base',
      variantClasses[props.variant],
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
    ]"
  >
    <slot />
  </component>
</template>
