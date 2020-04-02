import React from 'react'
import './styles.css'

export default class Track extends React.Component {

  render() {
    return <button className={`step-button ${this.props.playing}`}></button>
  }
}
