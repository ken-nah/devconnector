import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/set-Auth-Token";

import {
  SET_CURRENT_USER,
  LOGIN_USER_FAILED,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_PENDING,
  REGISTER_USER_SUCCESS
} from "../actions/types";

export const registerUser = (
  userData,
  history
) => dispatch => {
  dispatch({ type: REGISTER_USER_PENDING });
  axios
    .post(
      "http://localhost:5000/api/users/register",
      userData
    )
    .then(res => {
      dispatch({ type: REGISTER_USER_SUCCESS });
      return history.push("/login");
    })
    .catch(err =>
      dispatch({
        type: REGISTER_USER_FAILED,
        payload: err.response.data
      })
    );
};

//log in user - get token
export const loginUser = userData => dispatch => {
  dispatch({ type: LOGIN_USER_PENDING });

  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => {

      dispatch({ type: LOGIN_USER_SUCCESS });

      //get token and save to local storage
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);

      //set token to auth Header
      setAuthToken(token);

      //decode token;
      const decodedToken = jwt_decode(token);

      dispatch(setCurrentUser(decodedToken));
    })
    .catch(err => 
      dispatch({
        type: LOGIN_USER_FAILED,
        payload: err.response.data
      })
    )
};

//set in logged in user
export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

//log user out
export const logOutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");

  //remove auth Header for future requests
  setAuthToken(false);

  //set current user to an empty object
  dispatch(setCurrentUser({}));
};
