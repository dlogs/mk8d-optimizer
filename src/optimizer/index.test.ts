import fs from "fs";
import { findTopScoring, ScoringConfig } from "./csvOptimizer.js";
import { parseCsv } from "../data_files/csvParser.js";
import { defaultHandlingTerrainWeights, defaultSpeedTerrainWeights, defaultWeights } from "./weights.js";

const csvContent = fs.readFileSync("src/data_files/raw/combo.csv").toString();

(async function() {
  const rows = await parseCsv(csvContent)
  const config: ScoringConfig = {
    weights: defaultWeights,
    speedWeights: defaultSpeedTerrainWeights,
    handlingWeights: defaultHandlingTerrainWeights,
    diminishingReturns: 0.01
  }
  const top = findTopScoring(rows, config, 20)
  console.log(top)
})()