import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiServices from '../api/apis'

const initialState = {
    courses: [],                    // for getting all courses and additional data from user; Home page
    singleCourse: null,             // for getting a course from user; Course page
    notEnrolledIn: [],              // for getting courses not enrolled in
    isError: false,
    isSuccess: false,               // for getting all courses from user; Home page
    isSuccessSingle: false,         // for getting a course from user;    Course page
    isSuccessCourseCreated: false,  // for creaing a course;              Create Course page
    isSuccessAddingCourses: false,  // for adding course(s) to a user;    Enroll Course page
    isSuccessRemovingCourses: false,// for removing course(s) from a user;Drop Course page
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

// Get courses in which the user is not enrolled in
export const getCoursesNotEnrolled = createAsyncThunk('courses/getCoursesNotEnrolledIn', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await apiServices.getCoursesNotEnrolled(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const addCoursesToUser = createAsyncThunk('courses/addCoursesToUser', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await apiServices.addCoursesToUser(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const removeCoursesFromUser = createAsyncThunk('courses/removeCoursesFromUser', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await apiServices.dropCoursesFromUser(data, token)
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
            state.isSuccessAddingCourses = false
            state.isSuccessRemovingCourses = false
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
            .addCase(getCoursesNotEnrolled.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCoursesNotEnrolled.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notEnrolledIn = action.payload
            })
            .addCase(getCoursesNotEnrolled.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(addCoursesToUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addCoursesToUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessAddingCourses = true
            })
            .addCase(addCoursesToUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeCoursesFromUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeCoursesFromUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessRemovingCourses = true
            })
            .addCase(removeCoursesFromUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = courseSlice.actions
export default courseSlice.reducer