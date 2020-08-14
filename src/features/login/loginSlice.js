import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {isAuth, authenticate } from './helpers'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
	  isLoggedIn: false,
	  isLoggingIn: false,
	  failed: false,
  },
  reducers: {
    setLoginStatus: (state, action) => {
	    console.log(action.payload)
	    //Set isLoggedIn status to true and save the cookies
	    if(action.payload.data.accessToken){
		    state.isLoggedIn = true
		    authenticate(action.payload.data, action.payload.rememberMe, () => {
			    //console.log("Authentication Cookie set!")
		    })
	    }
    },
    apiStart: (state) => {
	    state.isLoggingIn =  true;
	    state.failed = false;
    },
    apiEnd: (state) => {
	    state.isLoggingIn = false
    },
    onFailure: (state, action) => {
	    state.isLoggingIn = false;
	    state.failed = true;
	    console.log(action.payload)
    }
  }
});

export const { setLoginStatus, apiStart, apiEnd, onFailure } = loginSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const postLoginData = (email, password, rememberMe) => dispatch => {
  dispatch(apiStart())
  axios.post((process.env.REACT_APP_BACKEND_URI + "/api/auth/login"), {email, password})
       .then(({data}) => {
	       dispatch(setLoginStatus({data, rememberMe}))
       })
       .catch(error => {
	       console.log(error)
	       dispatch(onFailure("Error while logging in"))
       })
       .finally(() => {
		dispatch(apiEnd())
       })
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLoginStatus = state => state.login.isLoggedIn

export const selectIsLoggingIn = state => state.login.isLoggingIn

export const selectFailed = state => state.login.failed

export default loginSlice.reducer;
