import { FETCH_DATA } from '../middleware/api'
import Api from '../../api'

export const keywordSchema = {
  name: 'keywords',
  id: 'id',
}

export const shopSchema = {
  name: 'shops',
  id: 'id',
}
export const types = {
  //获取热门关键词
  FETCH_POPULAR_KEYWORDS_REQUEST: 'SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST',
  FETCH_POPULAR_KEYWORDS_SUCCESS: 'SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS',
  FETCH_POPULAR_KEYWORDS_FAILURE: 'SEARCH/FETCH_POPULAR_KEYWORDS_FAILURE',
  //根据输入的文本获取相关关键词
  FETCH_RELATED_KEYWORDS_REQUEST: 'SEARCH/FETCH_RELATED_KEYWORDS_REQUEST',
  FETCH_RELATED_KEYWORDS_SUCCESS: 'SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS',
  FETCH_RELATED_KEYWORDS_FAILURE: 'SEARCH/FETCH_RELATED_KEYWORDS_FAILURE',
  // 设置当前输入
  SET_INPUT_TEXT: 'SEARCH/SET_INPUT_TEXT',
  CLEAR_INPUT_TEXT: 'SEARCH/CLEAR_INPUT_TEXT',
  // 历史查询记录
  ADD_HISTORY_KEYWORD: 'SEARCH/ADD_HISTORY_KEYWORD',
  CLEAR_HISTORY_KEYWORDS: 'SEARCH/CLEAR_HISTORY_KEYWORDS',
  // 根据关键词查询结果
  FETCH_SHOPS_REQUEST: 'SEARCH/FETCH_SHOPS_REQUEST',
  FETCH_SHOPS_SUCCESS: 'SEARCH/FETCH_SHOPS_SUCCESS',
  FETCH_SHOPS_FAILURE: 'SEARCH/FETCH_SHOPS_FAILURE',
}

export const actions = {
  //获取热门关键词
  loadPopularKeywords: () => {
    return (dispatch, getState) => {
      const { ids } = getState().search.popularKeywords
      if (ids.length > 0) {
        return null
      }
      const endpoint = Api.getPopularKeywords()
      return dispatch(fetchPopularKeywords(endpoint))
    }
  },
  // 根据输入获取相关关键词
  loadRelatedKeywords: text => {
    return (dispatch, getState) => {
      const { relatedKeywords } = getState().search
      if (relatedKeywords[text]) {
        return null
      }
      const endpoint = Api.getRelatedKeywords(text)
      return dispatch(fetchRelatedKeywords(text, endpoint))
    }
  },
  // 获取查询到的店铺列表
  loadRelatedShops: keyword => {
    return (dispatch, getState) => {
      const { searchedShopsByKeyword } = getState().search
      if (searchedShopsByKeyword[keyword]) {
        return null
      }
      const endpoint = Api.getRelatedShops(keyword)
      return dispatch(fetchRelatedShops(keyword, endpoint))
    }
  },
  //搜索框输入文本相关action
  setInputText: text => ({
    type: types.SET_INPUT_TEXT,
    text,
  }),
  clearInputText: () => ({
    type: types.CLEAR_INPUT_TEXT,
  }),
  //历史查询记录相关action
  addHistoryKeyword: keywordId => ({
    type: types.ADD_HISTORY_KEYWORD,
    text: keywordId,
  }),
  clearHistoryKeywords: () => ({
    type: types.CLEAR_HISTORY_KEYWORDS,
  }),
}

const fetchPopularKeywords = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_POPULAR_KEYWORDS_REQUEST,
      types.FETCH_POPULAR_KEYWORDS_SUCCESS,
      types.FETCH_POPULAR_KEYWORDS_FAILURE,
    ],
    endpoint,
    schema: keywordSchema,
  },
})

const fetchRelatedKeywords = (text, endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_RELATED_KEYWORDS_REQUEST,
      types.FETCH_RELATED_KEYWORDS_SUCCESS,
      types.FETCH_RELATED_KEYWORDS_FAILURE,
    ],
    endpoint,
    schema: keywordSchema,
  },
  text,
})

const fetchRelatedShops = (text, endpoint) => ({
  [FETCH_DATA]: {
    types: [types.FETCH_SHOPS_REQUEST, types.FETCH_SHOPS_SUCCESS, types.FETCH_SHOPS_FAILURE],
    endpoint,
    schema: shopSchema,
  },
  text,
})
