import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { any } from 'prop-types'

class BuyButton extends Component<any, any> {
  render() {
    const { productId } = this.props
    return (
      <Link className="buyButton" to={`/purchase/${productId}`}>
        立即购买
      </Link>
    )
  }
}

export default BuyButton
