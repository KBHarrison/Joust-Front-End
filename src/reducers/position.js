import { HANDLE_KEYPRESS, REVERT_POSITION } from '../actions/types'

const INITIAL_STATE = [{
        direction: 'ArrowLeft',
        x: 10,
        y: 10
    },
    {
        direction: 'd',
        x: 0,
        y: 0
    }
]

 const ARROW_DIRECTIONS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
 const KEYBOARD_DIRECTIONS = ['w', 'a', 's', 'd']

const direction =  (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_KEYPRESS:
            // Check if the arrow key direction is the same direction the little guy is already facing.
            // If yes, go that direction. If not, change the direction.
            if (action.payload === state[0].direction) {
                switch (action.payload) {
                    case "ArrowUp":
                        return [{...state[0], y: state[0].y - 1}, state[1]]
                    case "ArrowDown":
                        return [{...state[0], y: state[0].y + 1}, state[1]]
                    case "ArrowLeft":
                        return [{...state[0], x: state[0].x - 1}, state[1]]
                    case "ArrowRight":
                        return [{...state[0], x: state[0].x + 1}, state[1]]
                    default:
                        break
                }
            } else if (action.payload === state[1].direction) {
                switch (action.payload) {
                    case "w":
                        return [state[0],{...state[1], y: state[1].y - 1}]
                    case "s":
                        return [state[0],{...state[1], y: state[1].y + 1}]
                    case "a":
                        return [state[0],{...state[1], x: state[1].x - 1}]
                    case "d":
                        return [state[0],{...state[1], x: state[1].x + 1}]
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
        default:
            return state;
    }
}


export { KEYBOARD_DIRECTIONS, ARROW_DIRECTIONS }
export default direction