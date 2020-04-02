import React from 'react'
import './styles.css'

export default class Track extends React.Component {
  constructor(props) {
    super(props)
    this.state = { on: '' }
  }

  toggleOn = () => {
    const { on } = this.state
    this.setState({ on: on ? '' : 'on' })
  }

  render() {
    return <button className={`step-button ${this.props.playing} ${this.state.on}`} onClick={this.toggleOn}></button>
  }
}
