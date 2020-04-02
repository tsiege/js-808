import React from 'react'
import './styles.css'

export default class StepButton extends React.Component {
  toggleOn = () => {
    const { toggleStepState, step } = this.props
    toggleStepState(step)
  }

  render() {
    const on = this.props.isOn ? 'on' : ''
    return <button className={`step-button ${this.props.playing} ${on}`} onClick={this.toggleOn}></button>
  }
}
