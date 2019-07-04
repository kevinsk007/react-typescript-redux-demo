import { combineReducers } from 'redux'
import home from './home/reducers'
import search from './search/reducers'
//合并成根reducer
const rootReducer = combineReducers({
  home,
  search,
})

export default rootReducer
