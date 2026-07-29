<script setup lang="ts">
defineProps<{
  items: { label: string; to?: string }[]
}>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="text-sm">
    <ol class="flex flex-wrap items-center gap-2 text-ivory-100/50">
      <li>
        <router-link to="/" class="hover:text-ivory-100 transition-colors">Home</router-link>
      </li>
      <li v-for="(item, i) in items" :key="i" class="flex items-center gap-2">
        <span aria-hidden="true">/</span>
        <router-link v-if="item.to && i !== items.length - 1" :to="item.to" class="hover:text-ivory-100 transition-colors">
          {{ item.label }}
        </router-link>
        <span v-else class="text-ivory-100/80" aria-current="page">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>
