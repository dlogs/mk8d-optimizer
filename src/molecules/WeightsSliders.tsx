import React from 'react'
import Slider from '../atoms/Slider.js'
import './WeightsSliders.css'

interface WeightsProps<TKey extends string, TWeights extends Record<TKey, number>> {
  weights: TWeights
  weightsUpdated: (weights: TWeights) => void
  maxValue: number
}

export default function WeightsSliders<TKey extends string, TWeights extends Record<TKey, number>>({
  weights,
  weightsUpdated,
  maxValue,
}: WeightsProps<TKey, TWeights>) {
  const allStats = Object.keys(weights) as TKey[]
  const updateWeight = (name: TKey, value: number) => {
    weightsUpdated({ ...weights, [name]: value })
  }

  const weightSlider = (name: TKey) => (
    <div className='weight-container' key={name}>
      <label htmlFor={`${name}Slider`}>
        {name}: {weights[name]}
      </label>
      <Slider
        className='weight-slider'
        name={`${name}Slider`}
        currentValue={weights[name]}
        valueChanged={(value) => updateWeight(name, value)}
        maxValue={maxValue}
      />
    </div>
  )

  return <section>{allStats.map(weightSlider)}</section>
}
