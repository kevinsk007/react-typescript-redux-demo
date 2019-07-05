import { combineReducers } from 'redux'
import { types } from './actions'

const initialState = {
  inputText: '',
  popularKeywords: {
    isFetching: false,
    ids: [],
  },
  /**
   * relatedKeywords对象结构：
   * {
   *   '火锅': {
   *       isFetching: false,
   *       ids: []
   *    }
   * }
   */
  relatedKeywords: {},
  historyKeywords: [], //保存关键词id
  /**
   * searchedShopsByKeywords结构
   * {
   *   'keywordId': {
   *       isFetching: false,
   *       ids: []
   *    }
   * }
   */
  searchedShopsByKeyword: {},
}
const popularKeywords = (state = initialState.popularKeywords, action) => {
  switch (action.type) {
    case types.FETCH_POPULAR_KEYWORDS_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids),
        data: action.response.keywords,
      }
    case types.FETCH_POPULAR_KEYWORDS_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}

const relatedKeywords = (state = initialState.relatedKeywords, action) => {
  switch (action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return {
        ...state,
        [action.text]: relatedKeywordsByText(state[action.text], action),
        data: action.response.keywords,
      }
    default:
      return state
  }
}

const relatedKeywordsByText = (state = { isFetching: false, ids: [] }, action) => {
  switch (action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids),
        data: action.response.keywords,
      }
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

const searchedShopsByKeyword = (state = initialState.searchedShopsByKeyword, action) => {
  switch (action.type) {
    case types.FETCH_SHOPS_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_SHOPS_SUCCESS:
      return {
        ...state,
        [action.text]: searchedShops(state[action.text], action),
        data: action.response,
      }
    case types.FETCH_SHOPS_FAILURE:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

const searchedShops = (state = { isFetching: false, ids: [] }, action) => {
  switch (action.type) {
    case types.FETCH_SHOPS_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_SHOPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: action.response.ids,
        data: action.response.shops,
      }
    case types.FETCH_SHOPS_FAILURE:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

const inputText = (state = initialState.inputText, action) => {
  switch (action.type) {
    case types.SET_INPUT_TEXT:
      return action.text
    case types.CLEAR_INPUT_TEXT:
      return ''
    default:
      return state
  }
}

const historyKeywords = (state = initialState.historyKeywords, action) => {
  switch (action.type) {
    case types.ADD_HISTORY_KEYWORD:
      const data = state.filter(item => {
        if (item !== action.text) {
          return true
        }
        return false
      })
      let list = data.concat(action.text)
      return list
    // return [action.text, ...data]
    case types.CLEAR_HISTORY_KEYWORDS:
      return []
    default:
      return state
  }
}

const reducer = combineReducers({
  popularKeywords,
  relatedKeywords,
  inputText,
  historyKeywords,
  searchedShopsByKeyword,
  searchedShops,
})

export default reducer
