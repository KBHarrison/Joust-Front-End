import { combineReducers } from 'redux'
import positionReducer from './position'
import healthReducer from './health'

const reducers = combineReducers({
    position: positionReducer,
    health: healthReducer,
})

export default reducers