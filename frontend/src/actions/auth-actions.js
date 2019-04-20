import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/set-Auth-Token";

import {
  GET_ERRORS,
  SET_CURRENT_USER
} from "../actions/types";

export const registerUser = (
  userData,
  history
) => dispatch => {
  axios
    .post(
      "http://localhost:5000/api/users/register",
      userData
    )
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//log in user - get token
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => {
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
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
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
