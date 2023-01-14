import { sort } from 'fast-sort'
import { fromEntries } from '../util/fromEntries.js'
import { sum } from '../util/sum.js'
import { RawRow } from '../data_files/csvParser.js'
import { AllStatScores, StatScore, TotalScore } from './scores.js'
import { AllStats, AllTerrainStats, RawStat, Stat } from './stats.js'
import { ScoringOptions, TerrainWeights, Weights } from './weights.js'

//const { sort } = fast_sort

export type StatRow = Record<Stat, number>
export type ScoreRow = Record<StatScore, number>
export type TotalScoreRow = Record<TotalScore, number>
export type FinalRow = RawRow & StatRow & ScoreRow & TotalScoreRow

export function findTopScoring(rows: RawRow[], options: ScoringOptions, count: number): FinalRow[] {
  const topScoreFinder = new TopScoreFinder(rows, options)
  const sortedRows = topScoreFinder.findTopScoring()
  return sortedRows.slice(0, count)
}

class TopScoreFinder {
  private weights: Weights
  private speedWeights: TerrainWeights
  private handlingWeights: TerrainWeights
  private applyDiminishingReturns: (value: number) => number

  constructor(private rows: RawRow[], options: ScoringOptions) {
    this.weights = options.weights
    this.speedWeights = options.speedWeights
    this.handlingWeights = options.handlingWeights

    this.applyDiminishingReturns = this.buildDrCalculator(options.diminishingReturns)
  }

  findTopScoring(): FinalRow[] {
    const addScoresToRow = (row: RawRow) => this.addTotalScore(this.addStatScores(this.addTerrainAverages(row)))
    const rowsWithScores = this.rows.map(addScoresToRow)

    return sort(rowsWithScores).desc((x) => x.TotalScore)
  }

  private addTerrainAverages<R extends RawRow>(row: R): R & StatRow {
    return {
      ...row,
      Speed: this.averageTerrains(row, 'Speed', this.speedWeights),
      Handling: this.averageTerrains(row, 'Handling', this.handlingWeights),
    }
  }

  private addStatScores<R extends StatRow>(row: R): R & ScoreRow {
    return {
      ...row,
      ...fromEntries(
        AllStats.map((stat) => [
          `${stat}Score` as StatScore,
          this.applyDiminishingReturns(row[stat] * this.weights[stat]),
        ]),
      ),
    }
  }

  private addTotalScore<R extends ScoreRow>(row: R): R & TotalScoreRow {
    return {
      ...row,
      TotalScore: sum(AllStatScores.map((scoreName) => row[scoreName])),
    }
  }

  private averageTerrains(row: RawRow, suffix: string, terrainWeights: TerrainWeights): number {
    const total = sum(
      AllTerrainStats.map((terrainStat) => terrainWeights[terrainStat] * row[(terrainStat + suffix) as RawStat]),
    )
    const weightTotal = sum(Object.values(terrainWeights))
    return total / weightTotal
  }

  private buildDrCalculator(diminishingReturns: number): (value: number) => number {
    if (diminishingReturns == 0) {
      return (value) => value
    } else {
      const drRemaining = (100 - diminishingReturns) / 100
      const drDenominator = Math.log(drRemaining)
      return (value) => (Math.pow(drRemaining, value) - 1) / drDenominator
    }
  }
}
