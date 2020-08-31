import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from '../features/exercise/exerciseSlice'
import loginReducer from '../features/login/loginSlice'
import dashboardReducer from '../features/dashboard/dashboardSlice'
import unitReducer from '../features/unit/unitSlice'

export default configureStore({
  reducer: {
    exercise: exerciseReducer,
    login: loginReducer,
    dashboard: dashboardReducer,
    unit: unitReducer
  },
});
