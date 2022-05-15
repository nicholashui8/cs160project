import axios from 'axios'

/*  User API Calls */
const USER_API_URL = '/user-api/user'

// Register User
const register = async (userData) => {
    const response = await axios.post(USER_API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('token', JSON.stringify(response.data.token))
    }

    return response.data
}

// Login User
const login = async (userData) => {
    const response = await axios.post(USER_API_URL + '/login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('token', JSON.stringify(response.data.token))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('theme')
}

/* Course API Calls */
const COURSE_API_URL = '/course-api/'

// Create a new course
const createCourse = async (courseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(COURSE_API_URL + 'course', courseData, config)
    return response.data
}

// Get one course from user
const getCourse = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(COURSE_API_URL + `user/course/${id}`, config)
    return response.data
}

// Get all courses from user
const getCourses = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(COURSE_API_URL + 'user/courses', config)
    return response.data
}

const getCoursesNotEnrolled = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(COURSE_API_URL + 'user/courses-not-enrolled', config)
    return response.data
}

const addCoursesToUser = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(COURSE_API_URL + 'user/courses-enroll', data, config)
    return response.data
}

const dropCoursesFromUser = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(COURSE_API_URL + 'user/courses-drop', data, config)
    return response.data
}

const deleteCourse = async (courseId, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(COURSE_API_URL + `user/courses-delete/${courseId}`, config)
    return response.data
}

/* Assignment API Calls */
const ASSIGNMENT_API_URL = '/assignment-api/'

const createAssignment = async(assignmentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(ASSIGNMENT_API_URL + 'assignment', assignmentData, config)
    return response.data
}
// Get assignment from a course
const getAssignment = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.get(ASSIGNMENT_API_URL + `course/${data.courseId}/assignment/${data.assignmentId}`, config)
    return response.data
}

// Get all assignments from a course
const getAssignments = async (courseId, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.get(ASSIGNMENT_API_URL + `course/${courseId}/assignments`, config)
    return response.data
}

const deleteAssignment = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.delete(ASSIGNMENT_API_URL + `course/${data.courseId}/delete/assignment/${data.assignmentId}`, config)
    return response.data
}

/* Submission API Calls */
const SUBMISSION_API_URL = '/submission-api/'

// create a submission for an assignment
const createSubmission = async (submissionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(SUBMISSION_API_URL + 'submission', submissionData, config)
    return response.data
}

// update submission by adding the new file path to the array
const updateSubmission = async (submissionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(SUBMISSION_API_URL + 'submission/update', submissionData, config)
    return response.data
}

const getSubmissionsFromAssignment = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(SUBMISSION_API_URL + `course/${data.courseId}/assignments/${data.assignmentId}/submissions`, config)
    return response.data
}

const gradeSubmission = async (submissionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(SUBMISSION_API_URL + 'submission/grade', submissionData, config)
    return response.data
}

const apiServices = {
    register,
    login,
    logout,
    createCourse,
    getCourse,
    getCourses,
    getCoursesNotEnrolled,
    addCoursesToUser,
    dropCoursesFromUser,
    deleteCourse,
    createAssignment,
    getAssignment,
    getAssignments,
    deleteAssignment,
    createSubmission,
    updateSubmission,
    getSubmissionsFromAssignment,
    gradeSubmission
}

export default apiServices