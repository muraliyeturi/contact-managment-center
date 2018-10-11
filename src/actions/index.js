export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_FAILURE';

export function loginService(userObj) {
  return dispatch => {
       dispatch(loginBegin());
       // Perform the API request
       return fetch("http://localhost:8080/login", {
               method: 'post',
               body: JSON.stringify(userObj)
             })
           .then(response => response.json())
           .then((responseJSON) => {
             dispatch(loginSuccess(responseJSON))
           })
           // Then dispatch the resulting json/data to the reducer
           .catch(json => dispatch(loginError(json)))
   }

}

export const loginBegin = () => ({
  type: LOGIN_BEGIN
});

export const loginSuccess = userObject => ({
  type: LOGIN_SUCCESS,
  payload: userObject
});

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: error
});
