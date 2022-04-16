import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/service/authSlice'
import coursesReducer from '../features/service/courseSlice'
import assignmentsReducer from '../features/service/assignmentSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: coursesReducer,
        assignments: assignmentsReducer 
    }
})