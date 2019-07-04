import React, { Component } from 'react'
import './style.css'

class Loading extends Component<any, any> {
  render() {
    return (
      <div className="loading">
        <div className="loading__img" />
        <span>正在加载...</span>
      </div>
    )
  }
}

export default Loading
