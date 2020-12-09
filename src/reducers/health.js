import { HANDLE_CRASH, HANDLE_KEYPRESS } from '../actions/types'


// This is just copied


const INITIAL_STATE = [3,3]


const health =  (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case(HANDLE_CRASH):
            if (state[action.payload] === 1) {
                return INITIAL_STATE
            }
            else {
                let newValue = state[action.payload] - 1
                let newHealth = state.slice()
                newHealth.splice(action.payload, 1, newValue)
                return newHealth
            }
        default:
            return state;
    }
}


export default health