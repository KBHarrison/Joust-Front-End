import { HANDLE_KEYPRESS, UPDATE_PLAYER, TOGGLE_MODAL, ADD_PLAYER } from "./types";

export function handleKeypress(direction) {
    return {
        type: HANDLE_KEYPRESS,
        payload: direction
    }
}

export function receivePosition(payload) {
    return {
        type: UPDATE_PLAYER,
        payload
    }
}

export function addPlayer(payload) {
    return {
        type: ADD_PLAYER,
        payload
    }
}

export function toggleModal() {
    return ({type: TOGGLE_MODAL})
}