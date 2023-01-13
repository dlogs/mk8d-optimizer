import { Stat, TerrainStat } from './stats.js'

export type Weights = Record<Stat, number>
export type TerrainWeights = Record<TerrainStat, number>

export const defaultWeights: Weights = {
  Speed: 5,
  Acceleration: 5,
  Weight: 3,
  Handling: 5,
  Traction: 1,
  MiniTurbo: 5,
  Invincibility: 1,
}

export const defaultSpeedTerrainWeights: TerrainWeights = {
  Ground: 5,
  Water: 5,
  Air: 2,
  AntiGravity: 5,
}

export const defaultHandlingTerrainWeights: TerrainWeights = {
  Ground: 5,
  Water: 3,
  Air: 2,
  AntiGravity: 5,
}

export interface ScoringOptions {
  weights: Weights
  speedWeights: TerrainWeights
  handlingWeights: TerrainWeights
  diminishingReturns: number
}

export const defaultScoringOptions: ScoringOptions = {
  weights: defaultWeights,
  speedWeights: defaultSpeedTerrainWeights,
  handlingWeights: defaultHandlingTerrainWeights,
  diminishingReturns: 0.2
}
