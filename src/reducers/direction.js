import { UPDATE_DIRECTION } from '../actions/types'

const INITIAL_STATE =  'up'

const direction =  (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_DIRECTION:
            return action.payload
        default:
            return state;
    }
}

export default direction