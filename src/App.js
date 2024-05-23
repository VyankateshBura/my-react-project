import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Course from './Components/Course/course';
import Coursedetails from './Components/Coursedetails/coursedetails';
import Login from './Components/LoginIn/Login';


function App() {
  const [data, setData] = useState(null);
  
  return (
    <Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/course/all" element={<Course />} />
    <Route path="/course/modules/all" element={<Coursedetails />} />
  </Routes>
</Router>
  );
}
export default App;
