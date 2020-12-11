import { SET_CURRENT_MAP } from '../actions/types'

const INITIAL_MAP_STATE = {
    currentMap: {
        width: -1,
        height: -1,
        constraints: []
    }
}

const mapReducer = (state=INITIAL_MAP_STATE, action) => {
    switch(action.type) {
        case SET_CURRENT_MAP:
            return {
                ...state,
                currentMap: action.payload
            }
        default:
            return state;
    }
}

export default mapReducer
