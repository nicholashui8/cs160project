import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiServices from '../api/apis'

// maybe for course page or the assignment page? might be buggy 
const initialState = {
    assignment: null,
    isError: false,
    isSuccess: false, // for getting one assignment for assignment page
    isLoading: false,
    message: ''
}

export const getAssignment = createAsyncThunk('assignments/getAssignmentFromCourse', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        console.log('this is the token ', token)
        return await apiServices.getAssignment(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const assignmentSlice = createSlice({
    name: 'assignments',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false              
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAssignment.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(getAssignment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.assignment = action.payload
            })
            .addCase(getAssignment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = assignmentSlice.actions
export default assignmentSlice.reducer