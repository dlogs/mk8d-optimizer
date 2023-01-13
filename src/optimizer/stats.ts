export const Stats = {
  Speed: 'Speed',
  Acceleration: 'Acceleration',
  Weight: 'Weight',
  Handling: 'Handling',
  Traction: 'Traction',
  MiniTurbo: 'MiniTurbo',
  Invincibility: 'Invincibility',
} as const
export type Stat = (typeof Stats)[keyof typeof Stats]
export const AllStats: Stat[] = Object.values(Stats)

export const RawSpeedStats = {
  GroundSpeed: 'GroundSpeed',
  WaterSpeed: 'WaterSpeed',
  AirSpeed: 'AirSpeed',
  AntiGravitySpeed: 'AntiGravitySpeed',
} as const
export type RawSpeedStat = (typeof RawSpeedStats)[keyof typeof RawSpeedStats]
export const AllRawSpeedStats: RawSpeedStat[] = Object.values(RawSpeedStats)

export const RawHandlingStats = {
  GroundHandling: 'GroundHandling',
  WaterHandling: 'WaterHandling',
  AirHandling: 'AirHandling',
  AntiGravityHandling: 'AntiGravityHandling',
} as const
export type RawHandlingStat = (typeof RawHandlingStats)[keyof typeof RawHandlingStats]
export const AllRawHandlingStats: RawHandlingStat[] = Object.values(RawHandlingStats)

export type RawStat = Exclude<Stat, 'Speed' | 'Handling'> | RawSpeedStat | RawHandlingStat
export const AllRawStats = (AllStats as string[])
  .concat(AllRawSpeedStats)
  .concat(AllRawHandlingStats)
  .filter((x) => !['Speed', 'Handling'].includes(x)) as RawStat[]

export const TerrainStats = {
  Ground: 'Ground',
  Water: 'Water',
  Air: 'Air',
  AntiGravity: 'AntiGravity',
} as const
export type TerrainStat = (typeof TerrainStats)[keyof typeof TerrainStats]
export const AllTerrainStats: TerrainStat[] = Object.values(TerrainStats)
