import { configureStore } from '@reduxjs/toolkit'
import assignmentsReducer from '../features/service/assignmentSlice'
import authReducer from '../features/service/authSlice'
import coursesReducer from '../features/service/courseSlice'
import submissionsReducer from '../features/service/submissionSlice'

export const store = configureStore({
    reducer: {
        assignments: assignmentsReducer,
        auth: authReducer,
        courses: coursesReducer,
        submissions: submissionsReducer 
    }
})