import React from 'react'
import './styles.css'

export default class Track extends React.Component {

  render() {
    return (
      <div className="track">
        <h3>{this.props.name}</h3>
      </div>
    )
  }
}
