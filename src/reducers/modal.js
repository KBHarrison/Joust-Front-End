const { TOGGLE_MODAL, RESET_GAME } = require("../actions/types")

const INITIAL_STATE = false
const modal =  (state=INITIAL_STATE, action) => { 
    switch (action.type) {
        case (TOGGLE_MODAL):
            return !state
        case (RESET_GAME):
            return INITIAL_STATE
        default:
            return state
    }
}

export default modal