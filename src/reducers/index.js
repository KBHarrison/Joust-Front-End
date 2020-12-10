import { combineReducers } from 'redux'
import positionReducer from './position'
import healthReducer from './health'
import modalReducer from './modal'

const reducers = combineReducers({
    position: positionReducer,
    health: healthReducer,
    modal: modalReducer,
})

export default reducers