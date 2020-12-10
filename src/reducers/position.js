import { HANDLE_DEATH, HANDLE_KEYPRESS, UPDATE_PLAYER, ADD_PLAYER, INITIALIZE_OFFLINE_STATE, REVERT_POSITION } from '../actions/types'
import { replaceAt } from '../helpers'
const INITIAL_STATE = [{
        direction: 'ArrowLeft',
        position: {
            x: 19,
            y: 15,
        },
        up: true,
        dead: false
    },
    {
        direction: 'd',
        position: {
            x: 0,
            y: 0,
        },
        up: true,
        dead: false
    }
]

 const ARROW_DIRECTIONS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
 const KEYBOARD_DIRECTIONS = ['w', 'a', 's', 'd']

const direction = (state=[], action) => {
    switch (action.type) {
        case INITIALIZE_OFFLINE_STATE:
            return INITIAL_STATE
        case HANDLE_KEYPRESS:
            // Check if the arrow key direction is the same direction the little guy is already facing.
            // If yes, go that direction. If not, change the direction.
            if (!(state[0].dead || state[1].dead)) {
                if (action.payload === state[0].direction) {
                    switch (action.payload) {
                        case "ArrowUp":
                            if (state[0].position.y > 0) {
                                return [{...state[0], position: {...state[0].position, y: state[0].position.y - 1}, up: !state[0].up}, state[1]]
                            } else return state
                        case "ArrowDown":
                            if (state[0].position.y < 17) {
                                return [{...state[0], position: {...state[0].position, y: state[0].position.y + 1}, up: !state[0].up}, state[1]]
                            } else return state
                        case "ArrowLeft":
                            if (state[0].position.x > 0) {
                                return [{...state[0], position: {...state[0].position, x: state[0].position.x - 1}, up: !state[0].up}, state[1]]
                            } else return state
                        case "ArrowRight":
                            if (state[0].position.x < 19) {
                                return [{...state[0], position: {...state[0].position, x: state[0].position.x + 1}, up: !state[0].up}, state[1]]
                            } else return state
                        default:
                            break
                    }
                } else if (action.payload === state[1].direction) {
                    switch (action.payload) {
                        case "w":
                            if (state[1].position.y > 0) {
                                return [state[0],{...state[1], position: {...state[1].position, y: state[1].position.y - 1}, up: !state[1].up}]
                            } else return state
                        case "s":
                            if (state[1].position.y < 17) {
                                return [state[0],{...state[1], position: {...state[1].position, y: state[1].position.y + 1}, up: !state[1].up}]
                            } else return state
                        case "a":
                            if (state[1].position.x > 0) {
                                return [state[0],{...state[1], position: {...state[1].position, x: state[1].position.x - 1}, up: !state[1].up}]
                            } else return state
                        case "d":
                            if (state[1].position.x < 19) {
                                return [state[0],{...state[1], position: {...state[1].position, x: state[1].position.x + 1}, up: !state[1].up}]
                            } else return state
                        default:
                            break
                    }
                }
                else {
                    if (ARROW_DIRECTIONS.includes(action.payload)) {
                        return [{...state[0], direction: action.payload, up: !state[0].up}, state[1]]
                    } else if (KEYBOARD_DIRECTIONS.includes(action.payload)) {
                        return [state[0], {...state[1], direction: action.payload, up: !state[1].up}]
                    } else {
                        return state
                    }
                }
            } else {
                return state
            }
            break
        case (REVERT_POSITION):
            if (action.payload === 0){
                return [INITIAL_STATE[0], state[1]]
            } else {
                return [state[0], INITIAL_STATE[1]]
            }
        case (ADD_PLAYER):
            return [...state, {...action.payload, up: true, dead: false}]
        case (UPDATE_PLAYER):
            console.log("Receiving position: ", JSON.stringify(action.payload))
            return state.map((player) => player.id === action.payload.id ? {...action.payload, up: !player.up, dead: action.payload.health < 1} : player)
        case (HANDLE_DEATH):
            console.log("HANDLE_DEATH: ", action.payload)
            let newState = {...state[action.payload], dead: !state[action.payload].dead}
            console.log("New State: ",replaceAt(state, action.payload, newState))
            return replaceAt(state, action.payload, newState)
        default:
            return state;
    }
}


export { KEYBOARD_DIRECTIONS, ARROW_DIRECTIONS }
export default direction