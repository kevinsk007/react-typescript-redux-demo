import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShopList from './components/ShopList'
import SearchHeader from './components/SearchHeader'
import KeywordBox from './components/KeywordBox'
import Banner from '../../components/Banner'

class SearchResult extends Component<any, any> {
  render() {
    const { shops, currentKeyword } = this.props
    return (
      <div>
        <SearchHeader onBack={this.handleBack} onSearch={this.handleSearch} />
        <KeywordBox text={currentKeyword} />
        <Banner dark />
        <ShopList data={shops} />
      </div>
    )
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  handleSearch = () => {
    this.props.history.push('/search')
  }
}

const getSearchedShops = state => {
  const keywordId = state.search.historyKeywords[0]
  if (!keywordId) {
    return []
  }
  const shops = state.search.searchedShopsByKeyword[keywordId]
  if (shops) {
    return shops.ids.map(id => {
      return state.search.searchedShops.data[id]
    })
  } else {
    return []
  }
}

const getCurrentKeyword = state => {
  const keywordId = state.search.historyKeywords[0]
  if (!keywordId) {
    return ''
  }
  return []
}

const mapStateToProps = (state, props) => {
  return {
    shops: getSearchedShops(state),
    currentKeyword: getCurrentKeyword(state),
  }
}

export default connect(
  mapStateToProps,
  null,
)(SearchResult)
