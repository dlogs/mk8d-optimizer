import React, { useEffect, useState } from 'react'
import { FinalRow, findTopScoring } from '../optimizer/csvOptimizer.js'
import { defaultScoringOptions } from '../optimizer/weights.js'
import Output from '../organisms/Output.js'
import Weights from '../organisms/Weights.js'
import comboCsvUrl from '../data_files/in_game/combo.csv?url'
import { parseCsv, RawRow } from '../data_files/csvParser.js'
import useDebounce from '../util/useDebounce.js'

export default function Optimizer() {
  const [scoringOptions, setScoringOptions] = useState(defaultScoringOptions)
  const [csvRows, setCsvRows] = useState([] as RawRow[])
  const [resultRows, setResultRows] = useState([] as FinalRow[])
  const debouncedScoringOptions = useDebounce(scoringOptions, 2000)

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
        setResultRows(findTopScoring(csvRows, debouncedScoringOptions, 20))
      }
    })()
  }, [csvRows, debouncedScoringOptions])

  return (
    <>
      <Weights scoringOptions={scoringOptions} scoringOptionsChanged={setScoringOptions} />
      {resultRows.length > 0 ? <Output rows={resultRows} /> : <h3>Loading...</h3>}
    </>
  )
}
