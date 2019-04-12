import { TEST_REGISTRATION } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};
export default function(state = initialState, {payload, type}) {
  switch (type) {
    case TEST_REGISTRATION:
      return {
        ...state,
        user: payload
      }
    default:
      return state;
  }
}
