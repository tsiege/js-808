import React from 'react'
import './styles.css'

export default class Controller extends React.Component {

  render() {
    return (
      <div className="Controller">
        <div className="header">
          <h1 className="title">JS-808</h1>
          <span className="toolbar">
            <button>stop</button>
            <button>play</button>
            <span>128</span>
            {/* <input value="128"/> */}
            <span>BPM</span>
            <span>Sequence 1</span>
          </span>
        </div>
      </div>
    )
  }
}
