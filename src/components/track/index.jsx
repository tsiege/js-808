import React from 'react'
import StepButton from '../stepButton'
import './styles.css'

export default class Track extends React.Component {

  renderStepButtons() {
    const { step } = this.props
    const steps = []
    for (let i = 0; i < 16; i++) {
      const playingClassname = step === i ? 'playing' : ''
      steps.push(<StepButton key={i} playing={playingClassname} />)
    }
    return steps
  }

  render() {
    return (
      <div className="track">
        <h3>{this.props.name}</h3>
        <span>
          {this.renderStepButtons()}
        </span>
      </div>
    )
  }
}
