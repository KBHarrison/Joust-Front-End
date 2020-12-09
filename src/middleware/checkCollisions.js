import { HANDLE_CRASH, HANDLE_DEATH, HANDLE_KEYPRESS, REVERT_POSITION } from "../actions/types"
import { ARROW_DIRECTIONS } from "../reducers/position"

export default ({ dispatch, getState }) => next => action => {
    // Check to see if the action has a promise on the payload property
    const state = getState()
    if(Math.abs(state.position[0].x - state.position[1].x) < 1.001 && Math.abs(state.position[0].y - state.position[1].y) < 1.001 && action.type === HANDLE_KEYPRESS) {
        const payload = ARROW_DIRECTIONS.includes(action.payload) ? 1 : 0
        dispatch({type: HANDLE_DEATH, payload})
        dispatch({ type: HANDLE_CRASH, payload })
        setTimeout(() => {
            dispatch({type: HANDLE_DEATH, payload})
            // dispatch({type: REVERT_POSITION, payload})
        }, 3000)
    }
    return next(action)
}