import { HANDLE_KEYPRESS, UPDATE_PLAYER, TOGGLE_MODAL, ADD_PLAYER, INITIALIZE_OFFLINE_STATE, RESET_GAME, REMOVE_PLAYER, ONLINE, RESET_LOCAL, SET_CURRENT_MAP } from "./types";

export function handleKeypress(direction) {
    return {
        type: HANDLE_KEYPRESS,
        payload: direction
    }
}

export function initializeOfflineMode() {
    return {
        type: INITIALIZE_OFFLINE_STATE
    }
}

export function receivePosition(payload) {
    return {
        type: UPDATE_PLAYER,
        payload
    }
}

export function removePlayer(payload) {
    return {
        type: REMOVE_PLAYER,
        payload
    }
}

export function addPlayer(payload) {
    return {
        type: ADD_PLAYER,
        payload
    }
}

export function setCurrentMap(payload) {
    return {
        type: SET_CURRENT_MAP,
        payload
    }
}

export function toggleModal() {
    return ({type: TOGGLE_MODAL})
}

export function resetGame() {
    return ({type: RESET_GAME})
}

export function setOnline(payload) {
    return ({
        type: ONLINE,
        payload
    })
}

export function resetLocal() {
    return ({type: RESET_LOCAL})
}