import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from '../features/exercise/exerciseSlice'
import loginReducer from '../features/login/loginSlice'

export default configureStore({
  reducer: {
    exercise: exerciseReducer,
    login: loginReducer
  },
});
