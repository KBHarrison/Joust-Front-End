const { ONLINE } = require("../actions/types")

const INITIAL_STATE = false
const online =  (state=INITIAL_STATE, action) => { 
    switch (action.type) {
        case (ONLINE):
            return action.payload
        default:
            return state
    }
}

export default online