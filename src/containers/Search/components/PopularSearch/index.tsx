import React, { Component } from 'react'
import './style.css'

class PopularSearch extends Component<any, any> {
  render() {
    const { data } = this.props
    return (
      <div className="popularSearch">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <span key={index} onClick={this.handleClick.bind(this, item)} className="popularSearch__item">
                {item.keyword}
              </span>
            )
          })}
      </div>
    )
  }

  handleClick = item => {
    this.props.onClickItem(item)
  }
}

export default PopularSearch
