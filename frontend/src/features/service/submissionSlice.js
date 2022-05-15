import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiServices from '../api/apis'

const initialState = {
    submission: null,   // single submission, for when student submits for an assignment
    submissions: null,
    isError: false,
    isSuccess: false,
    isSuccessSubmissionUpdate: false,
    isSuccessSubmissions: false,
    isSuccessSubmissionGraded: false,
    isSubmissionLoading: false,
    isLoading: false,
    message: ''
}

// create a submission for an assignment
export const createSubmission = createAsyncThunk('submissions/create', async (submissionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await apiServices.createSubmission(submissionData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateSubmission = createAsyncThunk('submissions/update', async (submissionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await apiServices.updateSubmission(submissionData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getSubmissionsForAssignment = createAsyncThunk('submissions/getSubmissionsForAssignment', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await apiServices.getSubmissionsFromAssignment(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const gradeSubmissionForAssignment = createAsyncThunk('submissions/gradeSubmissionForAssignment', async (submissionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await apiServices.gradeSubmission(submissionData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const submissionSlice = createSlice({
    name: 'submissions',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false 
            state.isSuccessSubmissionUpdate = false
            state.isSuccessSubmissions = false
            state.isSuccessSubmissionGraded = false
            state.isSubmissionLoading = false
            state.isLoading = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSubmission.pending, (state) => {
                state.isSubmissionLoading = true
            })
            .addCase(createSubmission.fulfilled, (state, action) => {
                state.isSubmissionLoading = false
                state.isSuccess = true
                state.submission = action.payload
            })
            .addCase(createSubmission.rejected, (state, action) => {
                state.isSubmissionLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateSubmission.pending, (state) => {
                state.isSubmissionLoading = true
            })
            .addCase(updateSubmission.fulfilled, (state, action) => {
                state.isSubmissionLoading = false
                state.isSuccessSubmissionUpdate = true
                state.submission = action.payload
            })
            .addCase(updateSubmission.rejected, (state, action) => {
                state.isSubmissionLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getSubmissionsForAssignment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSubmissionsForAssignment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessSubmissions = true
                state.submissions = action.payload
            })
            .addCase(getSubmissionsForAssignment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(gradeSubmissionForAssignment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(gradeSubmissionForAssignment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessSubmissionGraded = true
            })
            .addCase(gradeSubmissionForAssignment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = submissionSlice.actions
export default submissionSlice.reducer