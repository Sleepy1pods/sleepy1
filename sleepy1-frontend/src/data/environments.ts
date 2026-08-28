import type { HubType } from '@/types/location'

/**
 * `status` reflects what the current project data actually confirms:
 * - 'current': real, operating Sleepy1 locations exist for this environment (see data/locations.ts).
 * - 'planned': an illustrative expansion location already exists in data/locations.ts, but is explicitly
 *   marked as not-yet-operational demo data.
 * - 'suitable': a deployment environment Sleepy1 could expand into — no location record exists yet,
 *   this is presented only as a future possibility, never as an active or confirmed site.
 */
export type LocationDeploymentStatus = 'current' | 'planned' | 'suitable'

export interface LocationEnvironment {
  id: string
  label: string
  hubType: HubType
  image: string
  restNeed: string
  status: LocationDeploymentStatus
}

export const locationEnvironments: LocationEnvironment[] = [
  { id: 'env-universities', label: 'Universities', hubType: 'university', image: '/environments/env_universities.jpg', restNeed: 'Recovery between demanding schedules.', status: 'planned' },
  { id: 'env-corporate', label: 'Corporate Offices & Tech Parks', hubType: 'corporate', image: '/environments/env_corporate.jpg', restNeed: 'A quiet escape for corporate professionals.', status: 'planned' },
  { id: 'env-hospitals', label: 'Hospitals & Medical Campuses', hubType: 'hospital', image: '/environments/env_hospitals.jpg', restNeed: 'Private rest for attendants and visitors during long hospital stays.', status: 'planned' },
  { id: 'env-railway', label: 'Railway Stations', hubType: 'railway', image: '/environments/env_railway.jpg', restNeed: 'Recharge between long train journeys.', status: 'planned' },
  { id: 'env-bus', label: 'Bus Terminals', hubType: 'bus-terminal', image: '/environments/env_bus.jpg', restNeed: 'A safe, private place to wait between long-distance buses.', status: 'planned' },
  { id: 'env-business', label: 'Business Districts', hubType: 'business-district', image: '/environments/env_business.jpg', restNeed: 'A pause during long days between commitments.', status: 'planned' },
  { id: 'env-malls', label: 'Shopping Malls', hubType: 'mall', image: '/environments/env_malls.jpg', restNeed: 'A quiet break during a long day out.', status: 'planned' },
  { id: 'env-convention', label: 'Convention Centres', hubType: 'convention-centre', image: '/environments/env_convention.jpg', restNeed: 'Rest between sessions at multi-day events.', status: 'planned' },
  { id: 'env-tourist', label: 'Tourist Destinations', hubType: 'tourist', image: '/environments/env_tourist.jpg', restNeed: 'A private moment to recharge between sightseeing.', status: 'planned' },
  { id: 'env-highway', label: 'Highway Rest Stops', hubType: 'highway-rest-stop', image: '/environments/env_highway.jpg', restNeed: 'Rest safely during long-distance road travel.', status: 'planned' },
]
