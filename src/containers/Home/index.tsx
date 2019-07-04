import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Category from './components/Category'
import Headline from './components/Headline'
import Discount from './components/Discount'
import LikeList from './components/LikeList'
import HomeHeader from './components/HomeHeader'
import Footer from '../../components/Footer'
import Banner from './components/Banner'
import Activity from './components/Activity'
import { actions as homeActions } from '../../redux/home/actions'

class Home extends Component<any, any> {
  componentDidMount() {
    this.props.homeActions.loadDiscounts()
  }
  fetchMoreLikes = () => {
    this.props.homeActions.loadLikes()
  }
  render() {
    const { likes, discounts, pageCount } = this.props
    console.log(this.props)
    return (
      <div>
        <HomeHeader />
        <Banner />
        <Category />
        <Headline />
        <Activity />
        <Discount data={discounts} />
        <LikeList data={likes} pageCount={pageCount} fetchData={this.fetchMoreLikes} />
        <Footer />
      </div>
    )
  }
}
//获取猜你喜欢state
const getLikes = state => {
  return state.home.likes.ids.map(id => {
    return state.home.likes.data.products[id]
  })
}

//获取特惠商品state
const getDiscounts = state => {
  return state.home.discounts.ids.map(id => {
    return state.home.discounts.data.products[id]
  })
}

//猜你喜欢当前分页码
const getPageCountOfLikes = state => {
  return state.home.likes.pageCount
}

const mapStateToProps = (state, props) => {
  return {
    likes: getLikes(state),
    discounts: getDiscounts(state),
    pageCount: getPageCountOfLikes(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
