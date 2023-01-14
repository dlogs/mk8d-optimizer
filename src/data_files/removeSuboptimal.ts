import fs from 'fs'
import { stringify } from 'csv-stringify/sync'
import { AllRawStats } from '../optimizer/stats.js'
import { parseCsv, RawRow } from './csvParser.js'
import { sportBikes } from './vehicleClasses.js'

const bodyTypeIsSame = (left: string, right: string) => sportBikes.includes(left) == sportBikes.includes(right)

const rowBodyTypeIsSame = (left: RawRow, right: RawRow) => bodyTypeIsSame(left.Name, right.Name)

const comboBodyTypeIsSame = (left: RawRow, right: RawRow) =>
  bodyTypeIsSame(JSON.parse(left.Name).body, JSON.parse(right.Name).body)

async function removeSuboptimal(fileName: string, bodyTypeIsSameCb: (left: RawRow, right: RawRow) => boolean) {
  const csvFile = await parseCsv(fs.readFileSync(fileName).toString())
  const optimal: RawRow[] = []
  const replacements: Record<string, string[]> = {}

  const addReplacement = (replacement: string, replaced: string) => {
    if (!replacements[replacement]) {
      replacements[replacement] = [replaced]
    } else {
      replacements[replacement].push(replaced)
    }
  }

  csvFile.forEach((input) => {
    const worseRowsIndicies: number[] = []
    let isSuboptimal = false
    optimal.forEach((opt, index) => {
      if (AllRawStats.every((s) => input[s] >= opt[s])) {
        if (bodyTypeIsSameCb(input, opt)) {
          worseRowsIndicies.push(index)
        }
      } else if (AllRawStats.every((s) => input[s] <= opt[s])) {
        if (bodyTypeIsSameCb(input, opt)) {
          addReplacement(opt.Name, input.Name)
          isSuboptimal = true
        }
      }
    })
    if (worseRowsIndicies.length > 0) {
      let index: number | undefined = undefined
      while ((index = worseRowsIndicies.pop())) {
        const suboptimal = optimal.splice(index, 1)[0]
        addReplacement(input.Name, suboptimal.Name)
      }
    }
    if (!isSuboptimal) {
      optimal.push(input)
    }
  })

  const outputCsvContent = stringify(optimal, { header: true })
  fs.writeFileSync(fileName.replace('.csv', '_optimal.csv'), outputCsvContent)
  fs.writeFileSync(fileName.replace('.csv', '_replacements.csv'), JSON.stringify(replacements))
}

async function removePartSuboptimal(dir: string) {
  const fileNames = ['character', 'body', 'tire', 'glider'] as const
  await Promise.all(fileNames.map((name) => removeSuboptimal(`${dir}/${name}.csv`, rowBodyTypeIsSame)))
}

async function removeComboSuboptimal(dir: string) {
  await removeSuboptimal(`${dir}/combo.csv`, comboBodyTypeIsSame)
}

const processDir = 'src/data_files/raw'
removePartSuboptimal(processDir)
removeComboSuboptimal(processDir)
