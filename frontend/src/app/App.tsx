import '../App.css'
import '../index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from '../pages/Home'
import Login from '../pages/Login' 
import Register from '../pages/Register'
import CreateCourse from '../pages/CreateCourse'

function App() {
  return (
    <>
      <Router>
           <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/home' element={<Home/>} />

            <Route path='/create-course' element={<CreateCourse/>} />
          </Routes>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App;
