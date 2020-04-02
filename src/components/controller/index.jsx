import React from 'react'
import Track from '../track'
import './styles.css'

const TRACKS = ['Kick', 'Snare', 'Open Hat', 'Closed Hat']

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

  interval = () => {
    const { step } = this.state
    if (step === null || step === 15) {
      this.setState({ step: 0 })
    } else {
      this.setState({ step: step + 1 })
    }
  }

  stop = () => {
    const { interval } = this.state
    clearInterval(interval)
    this.setState({ interval: null, isPlaying: false, step: null })
  }

  togglePlay = () => {
    const { isPlaying, interval, bpm } = this.state
    if (isPlaying) {
      clearInterval(interval)
      this.setState({ isPlaying: false, interval: null })
    } else {
      const interval = setInterval(this.interval, stepPerMs(bpm))
      this.setState({ isPlaying: true, interval })
    }
  }

  updateBpm = ({ target: { value }}) => {
    const { interval: oldInterval, isPlaying } = this.state
    if (isNaN(Number(value))) {
      return
    }
    if (isPlaying) {
      clearInterval(oldInterval)
      const interval = setInterval(this.interval, stepPerMs(value))
      this.setState({ interval, bpm: value })
    } else {
      this.setState({ bpm: value })
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

  renderTracks() {
    return TRACKS.map((name, i) => <Track key={i} name={name} />)
  }

  render() {
    return (
      <div className="controller">
        <div className="header">
          <h1 className="title">JS-808</h1>
          <span className="toolbar">
            <button onClick={this.stop}>stop</button>
            {this.renderPlayButton()}
            <input value={this.state.bpm} onChange={this.updateBpm}/>
            <span>BPM</span>
            <span>Sequence 1</span>
          </span>
        </div>
        <div className="steps">
          {this.renderSteps()}
        </div>
        <section className="tracks">
          {this.renderTracks()}
        </section>
      </div>
    )
  }
}
