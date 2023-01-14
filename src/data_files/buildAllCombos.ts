import fs from 'fs'
import { stringify } from 'csv-stringify/sync'
import { fromEntries } from '../util/fromEntries.js'
import { AllRawStats } from '../optimizer/stats.js'
import { parseCsv, RawRow } from './csvParser.js'

interface CsvFile {
  name: string
  rows: RawRow[]
}

async function buildAllCombos(dir: string) {
  const fileNames = ['character', 'body', 'tire', 'glider'] as const
  const csvFiles = await Promise.all(
    fileNames.map(
      async (fileName) =>
        ({
          name: fileName,
          rows: await parseCsv(fs.readFileSync(`${dir}/${fileName}.csv`).toString()),
        } as CsvFile),
    ),
  )
  const emptyRow: RawRow = {
    Name: JSON.stringify({}),
    ...fromEntries(AllRawStats.map((statName) => [statName, 0])),
  }
  const allRows = csvFiles.reduce(
    (rowsSoFar, file) => rowsSoFar.flatMap((row) => combineRowWithFile(row, file)),
    [emptyRow],
  )

  const outputCsvContent = stringify(allRows, { header: true })
  fs.writeFileSync(`${dir}/combo.csv`, outputCsvContent)
}

function combineRowWithFile(leftRow: RawRow, rightFile: CsvFile): RawRow[] {
  return rightFile.rows.map((row) => combineRows(leftRow, rightFile.name, row))
}

function combineRows(leftRow: RawRow, rightName: string, rightRow: RawRow): RawRow {
  return {
    Name: JSON.stringify({ ...JSON.parse(leftRow.Name), [rightName]: rightRow.Name }),
    ...fromEntries(AllRawStats.map((statName) => [statName, leftRow[statName] + rightRow[statName]])),
  }
}

buildAllCombos('src/data_files/raw')
