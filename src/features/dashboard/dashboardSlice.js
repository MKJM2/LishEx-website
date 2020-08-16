import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {isAuth, authenticate, getCookie } from '../login/helpers'

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
	  userID: '',
	  firstName: '',
	  lastName: '',
	  role: '',
	  level: '',
	  experience: '',
	  exercises: [],
	  isLoggedIn: false,
	  isFetchingUserData: false,
	  userDataFetched: false,
	  failed: false,
  },
  reducers: {
    setUserData: (state, action) => {

	    if(action.payload.data){
	    	    let { userID, firstName, lastName, role, level, experience, exercises} = action.payload.data

		    //That's just stupid but it works
		    state.userID = userID
		    state.firstName = firstName
		    state.lastName = lastName
		    state.role = role
		    state.level = level
		    state.experience = experience
		    state.exercises = exercises
		    state.userDataFetched = true
	    }
    },
    apiStart: (state) => {
	    state.isFetchingUserData =  true;
	    state.failed = false;
    },
    apiEnd: (state) => {
	    state.isFetchingUserData = false
    },
    onFailure: (state, action) => {
	    state.isFetchingUserData = false;
	    state.failed = true;
	    console.log(action.payload.data)
    }
  }
});

export const { setUserData, apiStart, apiEnd, onFailure } = dashboardSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*
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
*/

export const getAuthenticatedUserID = () => dispatch => {
	//Get the token
	const token = getCookie('ATKN')
	const config = {
    		headers: { 'Authorization': `Bearer ${token}` }
	}
	dispatch(apiStart())
	axios.get((process.env.REACT_APP_BACKEND_URI + "/api/users"), config)
	     .then(({data}) => {
		     dispatch(setUserData(data))
	     })
	     .catch(_error => {
		     dispatch(onFailure("Error while fetching user data"))
	     })
	     .finally(() => {
		     dispatch(apiEnd())
	     })
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
/*
	  userID: '',
	  firstName: '',
	  lastName: '',
	  role: '',
	  level: '',
	  experience: '',
	  exercises: [],
	  isLoggedIn: false,
	  isFetchingUserData: false,
	  userDataFetched: false,
	  failed: false,
*/

export const selectFirstName = state => state.dashboard.firstName

export const selectLastName = state => state.dashboard.lastName

export const selectUserID = state => state.dashboard.userID

export const selectRole = state => state.dashboard.role

export const selectLevel = state => state.dashboard.level

export const selectExperience = state => state.dashboard.experience

export const selectUserExercises = state => state.dashboard.exercises

export const selectIsFetchingData = state => state.dashboard.isFetchingUserData

export const selectUserDataFetched = state => state.dashboard.userDataFetched

export const selectFailed = state => state.dashboard.failed

export default dashboardSlice.reducer;
