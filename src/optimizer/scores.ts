import { AllStats, Stat } from './stats.js'

export type StatScore = `${Stat}Score`
export const AllStatScores = AllStats.map((x) => `${x}Score`) as StatScore[]
export type TotalScore = 'TotalScore'
