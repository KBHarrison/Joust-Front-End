import { HANDLE_CRASH, RESET_GAME } from '../actions/types'


// This is just copied


const INITIAL_STATE = [3,3]


const health = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case(HANDLE_CRASH):
            if (state[action.payload] === 1) {
                return INITIAL_STATE //Figure out how to test for this condition outside of the reducer and then don't call it here. CAll it at the source
            }
            else {
                let newValue = state[action.payload] - 1
                let newHealth = state.slice()
                newHealth.splice(action.payload, 1, newValue)
                return newHealth
            }
        case (RESET_GAME):
            return INITIAL_STATE
        default:
            return state;
    }
}


export default health