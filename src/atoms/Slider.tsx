import React from 'react'

export interface SliderProps extends React.ComponentPropsWithoutRef<'input'> {
  currentValue: number
  valueChanged: (value: number) => void
  maxValue: number
}

export default function Slider({ currentValue, valueChanged, maxValue, ...rest }: SliderProps) {
  return (
    <input
      type='range'
      min={0}
      max={maxValue}
      value={currentValue}
      onChange={(e) => valueChanged(parseInt(e.target.value, 10))}
      {...rest}
    />
  )
}
