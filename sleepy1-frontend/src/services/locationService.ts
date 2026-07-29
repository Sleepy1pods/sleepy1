import { locations, getLocationBySlug as findBySlug, getFeaturedLocations as findFeatured } from '@/data/locations'
import type { Location } from '@/types/location'
import { delay } from '@/utils/delay'

/**
 * Service abstraction over location data. Currently reads static mock data;
 * swap the function bodies for HTTP calls (e.g. `fetch('/api/locations')`)
 * once the backend is available, without changing any calling views.
 */
export const locationService = {
  async getAll(): Promise<Location[]> {
    return delay(locations)
  },

  async getBySlug(slug: string): Promise<Location | undefined> {
    return delay(findBySlug(slug))
  },

  async getFeatured(): Promise<Location[]> {
    return delay(findFeatured())
  },

  async search(query: string, city?: string): Promise<Location[]> {
    const q = query.trim().toLowerCase()
    const filtered = locations.filter((loc) => {
      const matchesQuery = !q || loc.name.toLowerCase().includes(q) || loc.city.toLowerCase().includes(q)
      const matchesCity = !city || city === 'All' || loc.city === city
      return matchesQuery && matchesCity
    })
    return delay(filtered, 250)
  },
}
