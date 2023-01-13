import React from 'react'
import { FinalRow } from '../optimizer/csvOptimizer.js'

export interface OutputProps {
  rows: FinalRow[]
}

type FinalColumn = keyof FinalRow

const columns: FinalColumn[] = [
  'Name',
  'Speed',
  'Acceleration',
  'Weight',
  'Handling',
  'Traction',
  'MiniTurbo',
  'Invincibility',
  'TotalScore',
]

interface Names {
  character: string
  body: string
  tire: string
  glider: string
}

const nameDisplay = (columnValue: string) => {
  const names = JSON.parse(columnValue) as Names

  return [names.character, names.body, names.tire, names.glider].join(' + ')
}

export default function Output({ rows }: OutputProps) {
  return (
    <div>
      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.Name}>
              {columns.map((col) => (
                <td key={row.Name + col}>{col == 'Name' ? nameDisplay(row[col]) : Math.round(row[col] * 100) / 100}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
