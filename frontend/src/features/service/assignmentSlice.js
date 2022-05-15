import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiServices from '../api/apis'

// maybe for course page or the assignment page? might be buggy 
const initialState = {
    assignments: [],
    assignment: null,
    isError: false,
    isSuccess: false, // for getting one assignment for assignment page
    isSuccessAssignmentCreated: false,
    isSuccessAllAssignments: false,
    isSuccessDeleteAssignment: false,
    isLoading: false,
    message: ''
}

export const createAssignment = createAsyncThunk('assignments/create', async (assignmentData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await apiServices.createAssignment(assignmentData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

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

export const getAssignments = createAsyncThunk('assignments/getAllAssignmentsFromCourse', async (courseId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        console.log('this is the token ', token)
        return await apiServices.getAssignments(courseId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteAssignment = createAsyncThunk('assignments/deleteAssignment', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await apiServices.deleteAssignment(data, token)
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
            state.isSuccessAllAssignments = false  
            state.isSuccessDeleteAssignment = false  
            state.isSuccessAssignmentCreated = false          
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
            .addCase(getAssignments.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(getAssignments.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessAllAssignments = true
                state.assignments = action.payload
            })
            .addCase(getAssignments.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteAssignment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteAssignment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessDeleteAssignment = true
            })
            .addCase(deleteAssignment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createAssignment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAssignment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessAssignmentCreated = true
            })
            .addCase(createAssignment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = assignmentSlice.actions
export default assignmentSlice.reducer