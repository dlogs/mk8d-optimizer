import fast_sort from 'fast-sort'
import { fromEntries } from '../util/fromEntries.js'
import { sum } from '../util/sum.js'
import { RawRow } from '../data_files/csvParser.js'
import { AllStatScores, StatScore, TotalScore } from './scores.js'
import { AllStats, AllTerrainStats, RawStat, Stat } from './stats.js'
import { TerrainWeights, Weights } from "./weights.js"

const { sort } = fast_sort

export type StatRow = Record<Stat, number>
export type ScoreRow = Record<StatScore, number>
export type TotalScoreRow = Record<TotalScore, number>
export type FinalRow = RawRow & StatRow & ScoreRow & TotalScoreRow

export interface ScoringConfig {
  weights: Weights,
  speedWeights: TerrainWeights,
  handlingWeights: TerrainWeights,
  diminishingReturns: number
}

export function findTopScoring(rows: RawRow[], config: ScoringConfig, count: number): FinalRow[] {
  const topScoreFinder = new TopScoreFinder(rows, config)
  const sortedRows = topScoreFinder.findTopScoring()
  return sortedRows.slice(0, count)
}

class TopScoreFinder {
  private drRemaining: number
  private drDenominator: number
  private weights: Weights
  private speedWeights: TerrainWeights
  private handlingWeights: TerrainWeights

  constructor(
    private rows: RawRow[],
    config: ScoringConfig
  ) {
    this.weights = config.weights
    this.speedWeights = config.speedWeights
    this.handlingWeights = config.handlingWeights

    this.drRemaining = config.diminishingReturns
    this.drDenominator = Math.log(this.drRemaining)
  }

  findTopScoring(): FinalRow[] {
    const addScoresToRow = (row: RawRow) => this.addTotalScore(this.addStatScores(this.addTerrainAverages(row)))
    const rowsWithScores = this.rows.map(addScoresToRow)
  
    return sort(rowsWithScores).desc(x => x.TotalScore)
  }

  private addTerrainAverages<R extends RawRow>(row: R): R & StatRow {
    return {
      ...row,
      Speed: this.averageTerrains(row, "Speed", this.speedWeights),
      Handling: this.averageTerrains(row, "Handling", this.handlingWeights),
    }
  }
  
  private addStatScores<R extends StatRow>(row: R): R & ScoreRow {
    return {
      ...row,
      ...fromEntries(AllStats.map(stat => 
        [`${stat}Score` as StatScore, this.applyDiminishingReturns(row[stat] * this.weights[stat])]
      ))
    }
  }
  
  private addTotalScore<R extends ScoreRow>(row: R): R & TotalScoreRow {
    return {
      ...row,
      TotalScore: sum(AllStatScores.map(scoreName => row[scoreName]))
    }
  }
  
  private averageTerrains(row: RawRow, suffix: string, terrainWeights: TerrainWeights): number {
    const total = sum(AllTerrainStats.map(terrainStat => 
      terrainWeights[terrainStat] * row[(terrainStat + suffix) as RawStat]
    ))
    const weightTotal = sum(Object.values(terrainWeights))
    return total / weightTotal
  }

  private applyDiminishingReturns(value: number): number {
    return (Math.pow(this.drRemaining, value) - 1) / this.drDenominator
  }
}
