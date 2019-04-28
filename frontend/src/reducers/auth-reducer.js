import {
  SET_CURRENT_USER,
  LOGIN_USER_FAILED,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_PENDING,
  REGISTER_USER_SUCCESS
} from "../actions/types";

import isEmpty from "../validation/is-Empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  errors: null
};

export default function(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case LOGIN_USER_PENDING:
    case REGISTER_USER_PENDING:
      return {
        ...state,
        errors: null,
        loading: true
      }

    case LOGIN_USER_FAILED:
    case REGISTER_USER_FAILED:
      return {
        ...state,
        loading: false,
        errors: payload
      }

    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
        loading: false
      };
    default:
      return state;
  }
}
