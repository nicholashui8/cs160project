import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiServices from '../api/apis'

const initialState = {
    courses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get user courses
export const getCourses = createAsyncThunk('courses/getCoursesFromUser', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await apiServices.getCourses(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses = action.payload
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = courseSlice.actions
export default courseSlice.reducer