import { combineReducers } from 'redux'
import directionReducer from './direction'

const reducers = combineReducers({
    direction: directionReducer
})

export default reducers