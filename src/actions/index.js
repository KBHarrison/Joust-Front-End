import { UPDATE_DIRECTION } from "./types";

export function updateDirection(direction) {
    return {
        type: UPDATE_DIRECTION,
        payload: direction
    }
}