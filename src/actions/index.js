import { CHECK_COLLISION, HANDLE_KEYPRESS } from "./types";

export function handleKeypress(direction) {
    return {
        type: HANDLE_KEYPRESS,
        payload: direction
    }
}