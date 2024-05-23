import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Course from './Components/Course/course';
import Coursedetails from './Components/Coursedetails/coursedetails';
import CreateCourse from './Components/CreateCourse/CreateCourse';
import AddModule from './Components/CreateModule/AddModule';
import EnrollUser from './Components/EnrollUser/EnrollUser';
import Login from './Components/LoginIn/Login';


function App() {
  const [data, setData] = useState(null);
  
  return (
    <Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/course/all" element={<Course />} />
    <Route path="/course/:id" element={<Coursedetails />} />
    <Route path="/admin/create-course" element={<CreateCourse />} />
    <Route path="/admin/course/add-module/:courseID" element={<AddModule />} />
    <Route path="/admin/enroll-user" element={<EnrollUser />} />
  </Routes>
</Router>
  );
}
export default App;
