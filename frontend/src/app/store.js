import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/service/authSlice'
import coursesReducer from '../features/service/courseSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: coursesReducer
    }
})