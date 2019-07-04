import { combineReducers } from 'redux'
import home from './home/reducers'
//合并成根reducer
const rootReducer = combineReducers({
  home,
})

export default rootReducer
