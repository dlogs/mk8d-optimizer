import React, { useEffect, useState } from 'react'
import { FinalColumn, FinalRow, findTopScoring } from '../optimizer/csvOptimizer.js'
import { defaultScoringOptions, Weights } from '../optimizer/weights.js'
import Output from '../organisms/Output.js'
import ScoringOptionsSliders from '../organisms/ScoringOptionsSliders.js'
import comboCsvUrl from '../data_files/in_game/combo_optimal.csv?url'
import { parseCsv, RawRow } from '../data_files/csvParser.js'
import useDebounce from '../util/useDebounce.js'
import { AllStats } from '../optimizer/stats.js'

function getHiddenColumns(weights: Weights): FinalColumn[] {
  return AllStats.filter((s) => weights[s] == 0)
}

export default function Optimizer() {
  const [scoringOptions, setScoringOptions] = useState(defaultScoringOptions)
  const [csvRows, setCsvRows] = useState([] as RawRow[])
  const [resultRows, setResultRows] = useState([] as FinalRow[])
  const debouncedScoringOptions = useDebounce(scoringOptions, 500)

  const hideColummns = getHiddenColumns(debouncedScoringOptions.weights)

  useEffect(() => {
    ;(async () => {
      const response = await fetch(comboCsvUrl)
      const csv = await response.text()
      setCsvRows(await parseCsv(csv))
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (csvRows.length != 0) {
        setResultRows(findTopScoring(csvRows, debouncedScoringOptions, 200))
      }
    })()
  }, [csvRows, debouncedScoringOptions])

  return (
    <>
      <ScoringOptionsSliders scoringOptions={scoringOptions} scoringOptionsChanged={setScoringOptions} />
      {resultRows.length > 0 ? <Output rows={resultRows} hideColummns={hideColummns} /> : <h3>Loading...</h3>}
    </>
  )
}
