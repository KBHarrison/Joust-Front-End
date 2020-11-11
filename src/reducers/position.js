import { HANDLE_KEYPRESS } from '../actions/types'

const INITIAL_STATE = {
    direction: 'ArrowRight',
    x: 0,
    y: 0
}

 const ARROW_DIRECTIONS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',]

const direction =  (state=INITIAL_STATE, action) => {
    console.log('here', action)
    switch (action.type) {
        case HANDLE_KEYPRESS:
            // Check if the arrow key direction is the same direction the little guy is already facing.
            // If yes, go that direction. If not, change the direction.
            if (action.payload === state.direction) {
                switch (action.payload) {
                    case "ArrowUp":
                        return {...state, y: state.y - 1}
                    case "ArrowDown":
                        return {...state, y: state.y + 1}
                    case "ArrowLeft":
                        return {...state, x: state.x - 1}
                    case "ArrowRight":
                        return {...state, x: state.x + 1}
                    default:
                        break
                }
            } else {
                if (ARROW_DIRECTIONS.includes(action.payload)) {
                    return {...state, direction: action.payload}
                }
                
            }
        default:
            return state;
    }
}


export default direction