import React, { useState } from 'react'
import { FinalColumn, finalColumns, FinalRow, Names } from '../optimizer/csvOptimizer.js'
import styles from './Output.module.css'

export interface OutputProps {
  rows: FinalRow[]
  hideColummns: FinalColumn[]
}

const nameDisplay = (columnValue: string) => {
  const names = JSON.parse(columnValue) as Names

  return [names.character, names.body, names.tire, names.glider].join(' + ')
}

const rowsPerPage = 20

export default function Output({ rows, hideColummns }: OutputProps) {
  const maxRows = rows.length
  const displayColumns = finalColumns.filter((c) => !hideColummns.includes(c))
  const [displayRows, setDisplayRows] = useState(rowsPerPage)

  return (
    <div>
      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            {displayColumns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, displayRows).map((row) => (
            <tr key={row.Name}>
              {displayColumns.map((col) => (
                <td key={row.Name + col}>{col == 'Name' ? nameDisplay(row[col]) : Math.round(row[col] * 100) / 100}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.rowsButtonContainer}>
        {displayRows > rowsPerPage && (
          <button type='button' onClick={() => setDisplayRows(displayRows - rowsPerPage)}>
            Show Less
          </button>
        )}
        {displayRows < maxRows && (
          <button className={styles.pushRight} type='button' onClick={() => setDisplayRows(displayRows + rowsPerPage)}>
            Show More
          </button>
        )}
      </div>
    </div>
  )
}
