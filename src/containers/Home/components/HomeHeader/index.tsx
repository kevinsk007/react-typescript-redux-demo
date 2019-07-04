import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

class HomeHeader extends Component<any, any> {
  render() {
    return (
      <div className="homeHeader">
        <header className="homeHeader__wrapper">
          <a className="homeHeader__city" href="javscript:;">
            北京
          </a>
          <Link to="/search" className="homeHeader__search">
            输入商户名、地点
          </Link>
          <Link to="/user" className="homeHeader__self">
            <div className="homeHeader__portrait" />
          </Link>
        </header>
      </div>
    )
  }
}

export default HomeHeader
