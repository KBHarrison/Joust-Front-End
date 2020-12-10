import { HANDLE_KEYPRESS, RECEIVE_POSITION, TOGGLE_MODAL, RESET_GAME } from "./types";

export function handleKeypress(direction) {
    return {
        type: HANDLE_KEYPRESS,
        payload: direction
    }
}

export function receivePosition(payload) {
    return {
        type: RECEIVE_POSITION,
        payload
    }
}

export function toggleModal() {
    return ({type: TOGGLE_MODAL})
}

export function resetGame() {
    return ({type: RESET_GAME})
}