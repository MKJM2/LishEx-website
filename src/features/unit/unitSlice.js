import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux'

import axios from 'axios'
import {isAuth, authenticate, getCookie } from '../login/helpers'

import { getAuthenticatedUserID } from '../dashboard/dashboardSlice'

export const unitSlice = createSlice({
  name: 'unit',
  initialState: {
	  unit: '',
	  section: '',
	  category: '',
	  subcategory: '',
	  exercises: [],
	  correct: [],
	  incorrect: [],
	  score: 0,
	  isFetchingData: false,
	  dataFetched: false,
	  failed: false,
  },
  reducers: {
    setUnitData: (state, action) => {

	    if(action.payload){
	    	    let exercises = action.payload.exercises
		    
		    state.unit = exercises[0].unit
		    state.section = exercises[0].section
		    state.category = exercises[0].category
		    state.subcategory = exercises[0].subcategory
		    state.exercises = exercises
		    
		    state.userDataFetched = true
	    }
    },
    apiStart: (state) => {
	    state.isFetchingData =  true;
	    state.failed = false;
    },
    apiEnd: (state) => {
	    state.isFetchingData = false
    },
    onFailure: (state, action) => {
	    state.isFetchingData = false;
	    state.failed = true;
	    console.log(action.payload.data)
    }
  }
});

export const { setUnitData, apiStart, apiEnd, onFailure } = unitSlice.actions;

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

export const getExercisesByUnit = (unit) => dispatch => {

	dispatch(apiStart())
	axios.get((process.env.REACT_APP_BACKEND_URI + `/api/unit/${unit}/exercises`))
	      .then(({data}) => {
		  dispatch(setUnitData(data))
	      })	
	      .catch(_error => {
		dispatch(onFailure("Error while fetching unit data"))
	      })
	      .finally(() => {
		dispatch(apiEnd())
	      })
}


export const setEssayForUser = (essay, userID) => dispatch => {

    //Get the token
    const token = getCookie('ATKN')
    const config = {
	    headers: { 'Authorization': `Bearer ${token}` }
    }

    dispatch(apiStart())
    axios.put((process.env.REACT_APP_BACKEND_URI + `/api/users/${userID}/essay`), {essay}, config).then(({data}) => {
	console.log(data)
    }).catch(_error => {
	dispatch(onFailure("Error while uploading the essay"))
    }).finally(()=> {
	dispatch(apiEnd())
    })
}

/*
 *	  unit: '',
	  section: '',
	  category: '',
	  subcategory: '',
	  exercises: [],
	  isFetchingData: false,
	  dataFetched: false,
	  failed: false,
*/

export const selectUnit = state => state.unit.unit

export const selectSection = state => state.unit.section

export const selectCategory = state => state.unit.category

export const selectSubcategory = state => state.unit.subcategory

export const selectExercises = state => state.unit.exercises

export const selectIsFetchingData = state => state.dashboard.isFetchingData

export const selectUnitDataFetched = state => state.dashboard.dataFetched

export const selectFailed = state => state.dashboard.failed

export default unitSlice.reducer;
