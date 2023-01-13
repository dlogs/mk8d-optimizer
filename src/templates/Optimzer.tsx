import React, { useEffect, useState } from 'react'
import { FinalRow, findTopScoring } from '../optimizer/csvOptimizer.js'
import { defaultScoringOptions } from '../optimizer/weights.js'
import Output from '../organisms/Output.js'
import Weights from '../organisms/Weights.js'
import comboCsvUrl from '../data_files/in_game/combo.csv?url'
import { parseCsv } from '../data_files/csvParser.js'

export default function Optimizer() {
  console.log('csv url', comboCsvUrl)
  const [scoringOptions, setScoringOptions] = useState(defaultScoringOptions)
  const [resultRows, setResultRows] = useState([] as FinalRow[])
  useEffect(() => {
    ;(async () => {
      const response = await fetch(comboCsvUrl)
      const csv = await response.text()
      const rows = await parseCsv(csv)
      setResultRows(findTopScoring(rows, scoringOptions, 20))
    })()
  }, [scoringOptions])

  return (
    <>
      <Weights scoringOptions={scoringOptions} scoringOptionsChanged={setScoringOptions} />
      {resultRows.length > 0 ? <Output rows={resultRows} /> : <h3>Loading...</h3>}
    </>
  )
}
