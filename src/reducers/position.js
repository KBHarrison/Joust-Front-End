import { HANDLE_KEYPRESS, RECEIVE_POSITION, REVERT_POSITION } from '../actions/types'

const INITIAL_STATE = [{
        direction: 'ArrowLeft',
        x: 19,
        y: 15
    },
    {
        direction: 'd',
        x: 0,
        y: 0
    }
]

 const ARROW_DIRECTIONS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
 const KEYBOARD_DIRECTIONS = ['w', 'a', 's', 'd']

const direction = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_KEYPRESS:
            // Check if the arrow key direction is the same direction the little guy is already facing.
            // If yes, go that direction. If not, change the direction.
            if (action.payload === state[0].direction) {
                switch (action.payload) {
                    case "ArrowUp":
                        if (state[0].y > 0) {
                            return [{...state[0], y: state[0].y - 1}, state[1]]
                        } else return state
                    case "ArrowDown":
                        if (state[0].y < 16) {
                            return [{...state[0], y: state[0].y + 1}, state[1]]
                        } else return state
                    case "ArrowLeft":
                        if (state[0].x > 0) {
                            return [{...state[0], x: state[0].x - 1}, state[1]]
                        } else return state
                    case "ArrowRight":
                        if (state[0].x < 19) {
                            return [{...state[0], x: state[0].x + 1}, state[1]]
                        } else return state
                    default:
                        break
                }
            } else if (action.payload === state[1].direction) {
                switch (action.payload) {
                    case "w":
                        if (state[1].y > 0) {
                            return [state[0],{...state[1], y: state[1].y - 1}]
                        } else return state
                    case "s":
                        if (state[1].y < 16) {
                            return [state[0],{...state[1], y: state[1].y + 1}]
                        } else return state
                    case "a":
                        if (state[1].x > 0) {
                            return [state[0],{...state[1], x: state[1].x - 1}]
                        } else return state
                    case "d":
                        if (state[1].x < 19) {
                            return [state[0],{...state[1], x: state[1].x + 1}]
                        } else return state
                    default:
                        break
                }
            }
            else {
                if (ARROW_DIRECTIONS.includes(action.payload)) {
                    return [{...state[0], direction: action.payload}, state[1]]
                } else if (KEYBOARD_DIRECTIONS.includes(action.payload)) {
                    return [state[0], {...state[1], direction: action.payload}]
                }
            }
        case (REVERT_POSITION):
            return INITIAL_STATE
        case (RECEIVE_POSITION):
            if (action.payload.player === 0) {
                return [action.payload.position, state[1]]
            } else {
                return [state[0], action.payload.position]
            }
        default:
            return state;
    }
}


export { KEYBOARD_DIRECTIONS, ARROW_DIRECTIONS }
export default direction