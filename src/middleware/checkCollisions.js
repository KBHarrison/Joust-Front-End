import { HANDLE_CRASH, HANDLE_KEYPRESS, REVERT_POSITION } from "../actions/types"
import { ARROW_DIRECTIONS } from "../reducers/position"

export default ({ dispatch, getState }) => next => action => {
    // Check to see if the action has a promise on the payload property
    const state = getState()
    if(Math.abs(state.position[0].x - state.position[1].x) < 1.001 && Math.abs(state.position[0].y - state.position[1].y) < 1.001 && action.type === HANDLE_KEYPRESS) {
        const loser = ARROW_DIRECTIONS.includes(action.payload) ? 1 : 0
        const crashAction = {
            type: HANDLE_CRASH,
            payload: loser
        }
        dispatch({type: REVERT_POSITION})
        dispatch(crashAction)
    }
    return next(action)


}