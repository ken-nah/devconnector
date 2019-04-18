import { SET_CURRENT_USER } from "../actions/types";

import isEmpty from "../validation/is-Empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};
export default function(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload
      };
    default:
      return state;
  }
}
