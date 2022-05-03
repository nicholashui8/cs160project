import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiServices from '../api/apis'

const initialState = {
    submission: null,   // single submission, for when student submits for an assignment
    isError: false,
    isSuccess: false,
    isSubmissionLoading: false,
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

export const submissionSlice = createSlice({
    name: 'submissions',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false 
            state.isSubmissionLoading = false
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
    }
})

export const { reset } = submissionSlice.actions
export default submissionSlice.reducer