import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Location } from '@/types/location'
import { locationService } from '@/services/locationService'
import { cities as allCities } from '@/data/locations'

export const useLocationsStore = defineStore('locations', () => {
  const all = ref<Location[]>([])
  const isLoading = ref(false)
  const hasLoaded = ref(false)
  const searchQuery = ref('')
  const selectedCity = ref('All')

  const cities = computed(() => ['All', ...allCities])

  const filtered = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    return all.value.filter((loc) => {
      const matchesQuery = !q || loc.name.toLowerCase().includes(q) || loc.city.toLowerCase().includes(q)
      const matchesCity = selectedCity.value === 'All' || loc.city === selectedCity.value
      return matchesQuery && matchesCity
    })
  })

  async function fetchAll(force = false) {
    if (hasLoaded.value && !force) return
    isLoading.value = true
    try {
      all.value = await locationService.getAll()
      hasLoaded.value = true
    } finally {
      isLoading.value = false
    }
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setCity(city: string) {
    selectedCity.value = city
  }

  function clearFilters() {
    searchQuery.value = ''
    selectedCity.value = 'All'
  }

  return { all, filtered, cities, isLoading, searchQuery, selectedCity, fetchAll, setSearchQuery, setCity, clearFilters }
})
