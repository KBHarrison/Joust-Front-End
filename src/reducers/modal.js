const { TOGGLE_MODAL } = require("../actions/types")

const INITIAL_STATE = false
const modal =  (state=INITIAL_STATE, action) => { 
    switch (action.type) {
        case (TOGGLE_MODAL):
            return !state
        default:
            return state
    }
}

export default modal