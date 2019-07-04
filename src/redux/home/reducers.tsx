import { combineReducers } from 'redux'
import { types } from './actions'

const initialState = {
  likes: {
    isFetching: false,
    pageCount: 0,
    ids: [],
  },
  discounts: {
    isFetching: false,
    ids: [],
  },
}
//猜你喜欢reducer
const likes = (state = initialState.likes, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_LIKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pageCount: state.pageCount + 1,
        ids: state.ids.concat(action.response.ids),
        data: action.response,
      }
    case types.FETCH_LIKES_FAILURE:
      return { ...state, isFetching: false }
    default:
      return state
  }
}
//特惠商品reducer
const discounts = (state = initialState.discounts, action) => {
  switch (action.type) {
    case types.FETCH_DISCOUNTS_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_DISCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids),
        data: action.response,
      }
    case types.FETCH_DISCOUNTS_FAILURE:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

const reducer = combineReducers({
  discounts,
  likes,
})

export default reducer
