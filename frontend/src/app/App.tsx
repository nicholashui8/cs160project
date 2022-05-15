import '../App.css'
import '../index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Assignment from '../pages/Assignment'
import CreateAssignment from '../pages/CreateAssignment'
import CreateCourse from '../pages/CreateCourse'
import Course from '../pages/Course'
import DeleteAssignment from '../pages/DeleteAssignment'
import DeleteCourse from '../pages/DeleteCourse'
import DropCourse from '../pages/DropCourse'
import EnrollCourse from '../pages/EnrollCourse'
import GradeSubmissions from '../pages/GradeSubmissions'
import Home from '../pages/Home'
import Login from '../pages/Login' 
import Register from '../pages/Register'


function App() {
  return (
    <>
      <Router>
           <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/course/:id' element={<Course/>}/>
            <Route path='/course/:courseId/assignments/:assignmentId' element={<Assignment/>}/>
            <Route path='/course/:courseId/assignments/:assignmentId/grade-submissions' element={<GradeSubmissions/>}/>

            <Route path='/create-course' element={<CreateCourse/>} />
            <Route path='/delete-course' element={<DeleteCourse/>} />
            <Route path='/courses/enroll-course' element={<EnrollCourse/>} />
            <Route path='/courses/my-page' element={<DropCourse/>} />
            <Route path='/course/:courseId/assignments/create' element={<CreateAssignment/>}/>
            <Route path='/course/:courseId/assignments/delete' element={<DeleteAssignment/>}/>
          </Routes>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App;
