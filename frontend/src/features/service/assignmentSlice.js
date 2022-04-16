import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiServices from '../api/apis'

// maybe for course page or the assignment page? might be buggy 
const initialState = {
    assignments: [],
    isError: false,
    isSuccessMulti: false,  // for getting all assignments for home page
    isSuccessSingle: false, // for getting one assignment for assignment page
    isLoading: false,
    message: ''
}

export const getAssignments = createAsyncThunk('assignments/getAssignmentsFromCourse', async (courseData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        console.log('this is the token ', token)
        return await apiServices.getAssignments(courseData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const assignmentSlice = createSlice({
    name: 'assignments',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAssignments.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(getAssignments.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessMulti = true
                state.assignments = action.payload
            })
            .addCase(getAssignments.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = assignmentSlice.actions
export default assignmentSlice.reducer