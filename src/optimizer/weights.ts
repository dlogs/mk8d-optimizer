import { Stat, TerrainStat } from "./stats.js"

export type Weights = Record<Stat, number>
export type TerrainWeights = Record<TerrainStat, number>

export const defaultWeights: Weights = {
  Speed: 10,
  Acceleration: 1,
  Weight: 0,
  Handling: 2,
  Traction: 0,
  MiniTurbo: 4,
  Invincibility: 0
}

export const defaultSpeedTerrainWeights: TerrainWeights = {
  Ground: 10,
  Water: 10,
  Air: 5,
  AntiGravity: 10
}

export const defaultHandlingTerrainWeights: TerrainWeights = {
  Ground: 10,
  Water: 5,
  Air: 5,
  AntiGravity: 10
}
