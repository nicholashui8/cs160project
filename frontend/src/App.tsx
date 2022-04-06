import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import ProtectedRoute from './auth/ProtectedRoute'
import { useEffect } from 'react';
import useAuth from './auth/useAuth'

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>

      </Routes>
    </Router>
  );
}

export default App;
