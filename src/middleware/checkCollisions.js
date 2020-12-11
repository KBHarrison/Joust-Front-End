import { HANDLE_CRASH, HANDLE_DEATH, HANDLE_KEYPRESS, REVERT_POSITION, TOGGLE_MODAL } from "../actions/types"
import { ARROW_DIRECTIONS } from "../reducers/position"

export default ({ dispatch, getState }) => next => action => {
    // Check to see if the action has a promise on the payload property
    const state = getState()
    if(state && state.position[0]) {
        console.log("Here's position[0]", JSON.stringify(state.position[0]))
        if (
        action.type === HANDLE_KEYPRESS
        && Math.abs(state.position[0].position.x - state.position[1].position.x) < 1.001 && Math.abs(state.position[0].position.y - state.position[1].position.y) < 1.001
        && !(state.position[0].dead || state.position[1].dead)
        && !state.modal
        ) {
            const payload = ARROW_DIRECTIONS.includes(action.payload) ? 1 : 0
            if (state.health[payload] === 1) {
                dispatch({type: HANDLE_DEATH, payload})
                dispatch({type: TOGGLE_MODAL, payload})
            } else {
                dispatch({type: HANDLE_DEATH, payload})
                dispatch({ type: HANDLE_CRASH, payload })
                setTimeout(() => {
                    dispatch({type: HANDLE_DEATH, payload})
                    dispatch({type: REVERT_POSITION, payload})
                }, 1000)
            }
        }
    }
    if (action.type !== HANDLE_KEYPRESS || !state.modal) {
        return next(action)
    }
}