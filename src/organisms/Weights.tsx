import React from 'react'
import Slider from '../atoms/Slider.js'
import WeightsSliders from '../molecules/WeightsSliders.js'
import { ScoringOptions } from '../optimizer/weights.js'

export interface WeightsProps {
  scoringOptions: ScoringOptions
  scoringOptionsChanged: (value: ScoringOptions) => void
}

export default function Weights({ scoringOptions, scoringOptionsChanged }: WeightsProps) {
  const updateScoringOptions = <TKey extends keyof ScoringOptions>(key: TKey, value: ScoringOptions[TKey]) =>
    scoringOptionsChanged({ ...scoringOptions, [key]: value })

  return (
    <div>
      <h2>Stat Weights</h2>
      <WeightsSliders
        weights={scoringOptions.weights}
        weightsUpdated={(weights) => updateScoringOptions('weights', weights)}
        maxValue={10}
      />
      <details>
        <summary>Speed and Handling Terrain Weights</summary>
        <h3>Speed Weights</h3>
        <WeightsSliders
          weights={scoringOptions.speedWeights}
          weightsUpdated={(weights) => updateScoringOptions('speedWeights', weights)}
          maxValue={10}
        />
        <h3>Handling Weights</h3>
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
          currentValue={scoringOptions.diminishingReturns * 5}
          valueChanged={(value) => updateScoringOptions('diminishingReturns', value / 5)}
          maxValue={10}
        />
      </div>
    </div>
  )
}
