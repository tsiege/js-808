import React from 'react'

export default class Controller extends React.Component {

  render() {
    return (
      <div className="Controller">
        <h1 className="title">JS-808</h1>
        <button>stop</button>
        <button>play</button>
        <span>128</span>
        {/* <input value="128"/> */}
        <span>BPM</span>
        <span>Sequence 1</span>
      </div>
    )
  }
}
