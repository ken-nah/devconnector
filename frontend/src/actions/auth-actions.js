import { TEST_REGISTRATION } from "./types";

export function registerUser(userData) {
    return {
        type: TEST_REGISTRATION,
        payload: userData
    }
}
