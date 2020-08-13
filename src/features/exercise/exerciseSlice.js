import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
	  list: [],
	  isLoadingData: false,
	  failed: false,
  },
  reducers: {
    setExerciseData: (state, action) => {
      for(let exercise of action.payload){
	      //If exercise has already been fetched
	      //Credit: https://stackoverflow.com/a/8217584
	      if(state.list.filter(e => e._id === exercise._id).length > 0){
		continue
	      } else {
		state.list.push(exercise)
	      }
      }
    },
    apiStart: (state) => {
	    state.isLoadingData =  true;
	    state.failed = false;
    },
    apiEnd: (state) => {
	    state.isLoadingData = false
    },
    onFailure: (state, action) => {
	    state.isLoadingData = false;
	    state.failed = true;
	    console.log(action.payload)
    }
     
  },
});

export const { setExerciseData, apiStart, apiEnd, onFailure } = exerciseSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const fetchExerciseData = () => dispatch => {
  dispatch(apiStart())
  axios.get(process.env.REACT_APP_BACKEND_URI + "/api/exercises")
       .then(({data}) => {
	       dispatch(setExerciseData(data.exercises))
       })
       .catch(error => {
	       console.log(error)
	       dispatch(onFailure("Error while fetching exercise data"))
       })
       .finally(() => {
		dispatch(apiEnd())
       })
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectExercise = state => state.exercise.list

export const selectIsLoadingData = state => state.exercise.isLoadingData

export const selectFailed = state => state.exercise.failed

export default exerciseSlice.reducer;
