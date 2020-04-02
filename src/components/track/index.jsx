import React from 'react'
import StepButton from '../stepButton'
import './styles.css'

export default class Track extends React.Component {
  constructor(props) {
    super(props)
    this.state = { stepStates: new Array(16).fill(false) }
  }

  toggleStepState = (i) => {
    const { stepStates } = this.state
    const updatedStepStates = [...stepStates]
    updatedStepStates[i] = !updatedStepStates[i]
    this.setState({ stepStates: updatedStepStates })
  }

  renderStepButtons() {
    const { step } = this.props
    const steps = []
    for (let i = 0; i < 16; i++) {
      const playingClassname = step === i ? 'playing' : ''
      steps.push(
        <StepButton
          key={i}
          step={i}
          playing={playingClassname}
          toggleStepState={this.toggleStepState}
        />
      )
    }
    return steps
  }

  render() {
    return (
      <div className="track">
          <h3>{this.props.name}</h3>
        <span className="step-buttons">
          {this.renderStepButtons()}
        </span>
      </div>
    )
  }
}
