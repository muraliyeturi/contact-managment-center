
import {loginBegin, loginSuccess, loginError } from '../actions/index.js';

export function loginService(userObj) {
  console.log("in");

  return (dispatch, getState) => {
       // contains the current state object
       const state = getState();

      // get token
      const token = state.some.token;

       dispatch(loginBegin());

       // Perform the API request
       return fetch("http://localhost:8080/login", {
               method: 'post',
               body: JSON.stringify(userObj)
             })
           .then(response => response.json())

           // Then dispatch the resulting json/data to the reducer
           .then(json => dispatch(loginError(json)))
   }

}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
