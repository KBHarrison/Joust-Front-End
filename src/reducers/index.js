import { combineReducers } from 'redux'
import positionReducer from './position'

const reducers = combineReducers({
    position: positionReducer
})

export default reducers