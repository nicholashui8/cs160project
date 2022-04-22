import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiServices from '../api/apis'

const initialState = {
    courses: [],
    singleCourse: null,
    isError: false,
    isSuccess: false,               // for getting all courses from user; Home page
    isSuccessSingle: false,         // for getting a course from user;    Course page
    isSuccessCourseCreated: false,  // for creaing a course;              Create Course page
    isLoading: false,
    message: ''
}

// Create new course
export const createCourse = createAsyncThunk('courses/create', async (courseData, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await apiServices.createCourse(courseData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

// Get single course information: for course page
// courseData should be courseData = { course._id } when calling it from the coursePage url
export const getCourse = createAsyncThunk('courses/getCourseFromUser', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await apiServices.getCourse(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

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
        reset: (state) => {
            state.isError = false
            state.isSuccess = false               // for getting all courses from user; Home page
            state.isSuccessSingle = false         // for getting a course from user;    Course page
            state.isSuccessCourseCreated = false  // for creaing a course;              Create Course page
            state.isLoading = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessCourseCreated = true
                state.courses.push(action.payload)
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCourse.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessSingle = true
                state.singleCourse = action.payload
            })
            .addCase(getCourse.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
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