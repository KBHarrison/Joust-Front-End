import { HANDLE_KEYPRESS, RECEIVE_POSITION } from "./types";

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