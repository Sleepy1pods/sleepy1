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
  restNeed: string
  status: LocationDeploymentStatus
}

export const locationEnvironments: LocationEnvironment[] = [
  { id: 'env-airports', label: 'Airports', hubType: 'airport', restNeed: 'Rest during layovers and delays.', status: 'current' },
  { id: 'env-railway', label: 'Railway Stations', hubType: 'railway', restNeed: 'Recharge between long train journeys.', status: 'planned' },
  { id: 'env-bus', label: 'Bus Terminals', hubType: 'bus-terminal', restNeed: 'A safe, private place to wait between long-distance buses.', status: 'suitable' },
  { id: 'env-hospitals', label: 'Hospitals & Medical Campuses', hubType: 'hospital', restNeed: 'Private rest for attendants and visitors during long hospital stays.', status: 'suitable' },
  { id: 'env-business', label: 'Business Districts', hubType: 'business-district', restNeed: 'A pause during long days between commitments.', status: 'suitable' },
  { id: 'env-malls', label: 'Shopping Malls', hubType: 'mall', restNeed: 'A quiet break during a long day out.', status: 'suitable' },
  { id: 'env-campuses', label: 'Universities & Large Campuses', hubType: 'campus', restNeed: 'Recovery between demanding schedules.', status: 'suitable' },
  { id: 'env-convention', label: 'Convention Centres', hubType: 'convention-centre', restNeed: 'Rest between sessions at multi-day events.', status: 'suitable' },
  { id: 'env-tourist', label: 'Tourist Destinations', hubType: 'tourist', restNeed: 'A private moment to recharge between sightseeing.', status: 'suitable' },
  { id: 'env-highway', label: 'Highway Rest Stops', hubType: 'highway-rest-stop', restNeed: 'Rest safely during long-distance road travel.', status: 'suitable' },
]
