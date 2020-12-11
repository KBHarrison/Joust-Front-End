import { combineReducers } from 'redux'
import positionReducer from './position'
import healthReducer from './health'
import modalReducer from './modal'
import mapReducer from './map'

const reducers = combineReducers({
    position: positionReducer,
    health: healthReducer,
    modal: modalReducer,
    map: mapReducer
})

export default reducers