import React from 'react'
import './styles.css'

// At a 4/4 time signature of 60 BPM (beats per minute), we get 1 beat per second.
// We can assume that 8 steps = 1 bar, representing 4 beats.
// In other words, a 8 step pattern would take (60/BPM)*4 seconds to play and each step would take ((60/BPM)*4)/8 seconds.
// but this has 16 steps, so I think it is ((60/BPM)*4)/16 ?? 8 feels slow
function stepPerMs(bpm = 128) {
  return (((60 / bpm) * 4) / 16) * 1000
}

export default class Controller extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bpm: 128,
      step: null,
      interval: null,
      isPlaying: false,
    }
  }

  togglePlay = () => {
    const { isPlaying, interval, bpm } = this.state
    if (isPlaying) {
      clearInterval(interval)
      this.setState({ isPlaying: false, interval: null })
    } else {
      const interval = setInterval(() => {
        const { step } = this.state
        if (step === null || step === 15) {
          this.setState({ step: 0 })
        } else {
          this.setState({ step: step + 1 })
        }
      }, stepPerMs(bpm))
      this.setState({ isPlaying: true, interval })
    }
  }

  renderPlayButton() {
    const { isPlaying } = this.state
    const innerHTML = isPlaying ? 'pause' : 'play'
    return <button onClick={this.togglePlay}>{innerHTML}</button>
  }

  renderSteps() {
    const { step } = this.state
    const steps = []
    for (let i = 0; i < 16; i++) {
      const playingClassname = step === i ? 'playing' : ''
      steps.push(<span key={i} className={`step ${playingClassname}`}>{i + 1}</span>)
    }
    return steps
  }

  render() {
    return (
      <div className="Controller">
        <div className="header">
          <h1 className="title">JS-808</h1>
          <span className="toolbar">
            <button>stop</button>
            {this.renderPlayButton()}
            <span>128</span>
            {/* <input value="128"/> */}
            <span>BPM</span>
            <span>Sequence 1</span>
          </span>
        </div>
        <div className="steps">
          {this.renderSteps()}
        </div>
      </div>
    )
  }
}
