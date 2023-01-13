import React from 'react'
import Slider from '../atoms/Slider.js'
import WeightsSliders from '../molecules/WeightsSliders.js'
import { ScoringOptions } from '../optimizer/weights.js'
import './Weights.css'

export interface WeightsProps {
  scoringOptions: ScoringOptions
  scoringOptionsChanged: (value: ScoringOptions) => void
}

export default function Weights({ scoringOptions, scoringOptionsChanged }: WeightsProps) {
  const updateScoringOptions = <TKey extends keyof ScoringOptions>(key: TKey, value: ScoringOptions[TKey]) =>
    scoringOptionsChanged({ ...scoringOptions, [key]: value })

  return (
    <div>
      <h3>Stat Weights</h3>
      <WeightsSliders
        weights={scoringOptions.weights}
        weightsUpdated={(weights) => updateScoringOptions('weights', weights)}
        maxValue={10}
      />
      <details>
        <summary>Speed and Handling Terrain Weights</summary>
        <h4>Speed Weights</h4>
        <WeightsSliders
          weights={scoringOptions.speedWeights}
          weightsUpdated={(weights) => updateScoringOptions('speedWeights', weights)}
          maxValue={10}
        />
        <h4>Handling Weights</h4>
        <WeightsSliders
          weights={scoringOptions.handlingWeights}
          weightsUpdated={(weights) => updateScoringOptions('handlingWeights', weights)}
          maxValue={10}
        />
      </details>
      <div>
        <label htmlFor='drSlider'>Diminishing Returns: {scoringOptions.diminishingReturns}%</label>
        <Slider
          name='drSlider'
          currentValue={scoringOptions.diminishingReturns * 10}
          valueChanged={(value) => updateScoringOptions('diminishingReturns', value / 10)}
          maxValue={20}
        />
      </div>
    </div>
  )
}
