import { podTypes, podFeatureComparison, getPodTypeById as findById } from '@/data/pods'
import type { PodTypeDefinition, PodFeatureComparisonRow } from '@/types/pod'
import { delay } from '@/utils/delay'

export const podService = {
  async getAll(): Promise<PodTypeDefinition[]> {
    return delay(podTypes)
  },

  async getById(id: string): Promise<PodTypeDefinition | undefined> {
    return delay(findById(id))
  },

  async getFeatureComparison(): Promise<PodFeatureComparisonRow[]> {
    return delay(podFeatureComparison)
  },
}
