import { parse } from 'csv-parse/browser/esm'
import { AllRawStats, RawStat } from '../optimizer/stats.js'

export type RawRow = { Name: string } & Record<RawStat, number>

export async function parseCsv(csv: string): Promise<RawRow[]> {
  return new Promise<RawRow[]>((resolve) => {
    parse(
      csv,
      {
        columns: true,
        cast: (value, context) => (context.header || context.column == 'Name' ? value : Number.parseFloat(value)),
      },
      (err, records: any[]) => {
        if (err) {
          throw err
        }
        if (records.length == 0) {
          throw `No rows found in csv: ${csv}`
        }
        const recordKeys = Object.keys(records[0])
        const expectedKeys = ['Name'].concat(AllRawStats)
        const extra = recordKeys.filter((x) => !expectedKeys.includes(x))
        const missing = expectedKeys.filter((x) => !recordKeys.includes(x))
        if (extra.length > 0 || missing.length > 0) {
          throw `Record does not match expected raw stats. extra: ${extra}. missing: ${missing}`
        }

        resolve(records)
      },
    )
  })
}
