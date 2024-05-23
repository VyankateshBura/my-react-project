import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EnrollUser = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/course/all');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error.message); // Handle errors appropriately
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/user/all');
        console.log("Users ",response)
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message); // Handle errors appropriately
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
    fetchUsers();
  }, []);

  const handleCourseChange = (event) => {
    setSelectedCourse(parseInt(event.target.value)); // Ensure course ID is a number
  };

  const handleUserChange = (event) => {
    setSelectedUser(parseInt(event.target.value)); // Ensure user ID is a number
  };

  const handleEnrollUser = async () => {
    if (!selectedCourse || !selectedUser) {
      return; // Prevent enrollment without selections
    }

    setIsLoading(true);
    try {
      const response = await axios.post( `http://localhost:8080/api/user/${selectedUser}/course/${selectedCourse}/enroll`, {
        courseId: selectedCourse,
        userId: selectedUser,
      });
      console.log('Enrollment successful:', response.data);
    //   navigate('/admin/enrollments'); // Redirect to enrollment list after success
    } catch (error) {
      console.error('Error enrolling user:', error);
      setError(error.message); // Handle errors appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2>Enroll User in Course</h2>

      {isLoading && <div className="text-center mb-3">Loading data...</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <div className="form-group mb-3">
        <label htmlFor="course">Select Course:</label>
        <select className="form-control" id="course" value={selectedCourse} onChange={handleCourseChange}>
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="user">Select User:</label>
        <select className="form-control" id="user" value={selectedUser} onChange={handleUserChange}>
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} 
            </option>
          ))}
        </select>
      </div>

      <button type="button" className="btn btn-primary" onClick={handleEnrollUser}>
        Enroll User
      </button>
    </div>
  );
};

export default EnrollUser;
