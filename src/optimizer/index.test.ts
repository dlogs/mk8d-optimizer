import fs from 'fs'
import { findTopScoring } from './csvOptimizer.js'
import { parseCsv } from '../data_files/csvParser.js'
import {
  defaultScoringOptions,
} from './weights.js'

const csvContent = fs.readFileSync('src/data_files/raw/combo.csv').toString()

;(async function () {
  const rows = await parseCsv(csvContent)
  const top = findTopScoring(rows, defaultScoringOptions, 20)
  console.log(top)
})()
