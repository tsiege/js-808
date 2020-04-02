import React from 'react'
import Track from '../track'
import Sequence from '../sequences'
import './styles.css'

const TRACKS = ['Kick', 'Snare', 'Open Hat', 'Closed Hat']

const SEQUENCE_NAMES = ['Sequence 1', 'Sequence 2', 'Sequence 3', 'None']
const SEQUENCES = {
  'Sequence 1': {
    Kick:         [false, true, false, false, true, true, false, true, false, false, false, true, true, false, true, false],
    Snare:        [true, true, false, true, false, true, false, true, false, true, false, true, false, true, true, false],
    'Open Hat':   [false, false, true, false, true, false, false, true, false, true, false, true, true, false, true, false],
    'Closed Hat': [true, false, false, true, true, false, true, true, false, false, false, true, false, false, false, true],
  },
  'Sequence 2': {
    Kick:         [false, true, false, false, true, true, false, true, false, false, false, true, true, false, true, false],
    Snare:        [true, true, false, true, false, true, false, true, false, true, false, true, false, true, true, false],
    'Open Hat':   [false, false, true, false, true, false, false, true, false, true, false, true, true, false, true, false],
    'Closed Hat': [true, false, false, true, true, false, true, true, false, false, false, true, false, false, false, true],
  },
  'Sequence 3': {
    Kick:         [false, true, false, false, true, true, false, true, false, false, false, true, true, false, true, false],
    Snare:        [true, true, false, true, false, true, false, true, false, true, false, true, false, true, true, false],
    'Open Hat':   [false, false, true, false, true, false, false, true, false, true, false, true, true, false, true, false],
    'Closed Hat': [true, false, false, true, true, false, true, true, false, false, false, true, false, false, false, true],
  },
  None: {
    Kick:         new Array(16).fill(false),
    Snare:        new Array(16).fill(false),
    'Open Hat':   new Array(16).fill(false),
    'Closed Hat': new Array(16).fill(false),
  }
}

// At a 4/4 time signature of 60 BPM (beats per minute), we get 1 beat per second.
// We can assume that 8 steps = 1 bar, representing 4 beats.
// In other words, a 8 step pattern would take (60/BPM)*4 seconds to play and each step would take ((60/BPM)*4)/8 seconds.
// but this has 16 steps, so I think it is ((60/BPM)*4)/16 ?? 8 feels slow
function stepPerMs(bpm = 128) {
  return (((60 / bpm) * 4) / 16) * 1000
}

function deepClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default class Controller extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bpm: 128,
      step: null,
      interval: null,
      isPlaying: false,
      ...deepClone(SEQUENCES['Sequence 1'])
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

  selectSequence = (name) => {
    this.setState({ ...deepClone(SEQUENCES[name]) })
  }

  toggleSequence = (name, i) => {
    const currentSequence = this.state[name]
    const updatedSequence = deepClone(currentSequence)
    const step = updatedSequence[i]
    updatedSequence[i] = !step
    console.log({ name, i, step, notStep: !step })
    this.setState({ [name]: updatedSequence })
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
    const { step, isPlaying } = this.state
    return TRACKS.map((name, i) => {
      const sequence = this.state[name]
      return <Track
        key={i}
        name={name}
        step={step}
        isPlaying={isPlaying}
        sequence={sequence}
        toggleSequence={this.toggleSequence}
      />
    })
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
            <Sequence sequences={SEQUENCE_NAMES} onSelect={this.selectSequence}/>
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
