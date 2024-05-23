import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = () => {
    
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('FREE');
  const [courseFees, setCourseFees] = useState(0.0);
  const [modules, setModules] = useState([]);
  const [newModuleName, setNewModuleName] = useState('');
  const [courseCreated, setCourseCreated] = useState(false);

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleCourseTypeChange = (event) => {
    setCourseType(event.target.value);
  };

  const handleCourseFeesChange = (event) => {
    setCourseFees(parseFloat(event.target.value));
  };

  const handleNewModuleNameChange = (event) => {
    setNewModuleName(event.target.value);
  };

  const handleAddModule = () => {
    if (newModuleName.trim() === '') {
      return; // Prevent adding empty modules
    }
    setModules([...modules, { name: newModuleName }]);
    setNewModuleName(''); // Clear input field after adding
  };

  const handleCreateCourse = async () => {
    try {
      const courseData = {
        name: courseName,
        type: courseType,
        fees: courseFees,
        modules,
      };

      const response = await axios.post('http://localhost:8080/api/admin/course', courseData);
      console.log('Course created:', response.data);
      setCourseCreated(true); // Set state to display success message
    } catch (error) {
      console.error('Error creating course:', error);
      // Handle errors appropriately (e.g., display an error message)
    }
  };

  return (
    <div className="container my-5 mx-3 border rounded">
      <h2>Create Course</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            className="form-control"
            id="courseName"
            value={courseName}
            onChange={handleCourseNameChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseType">Course Type:</label>
          <select className="form-control" id="courseType" value={courseType} onChange={handleCourseTypeChange}>
            <option value="FREE">Free</option>
            <option value="PAID">Paid</option>
          </select>
        </div>

        {courseType === 'PAID' && (
          <div className="form-group">
            <label htmlFor="courseFees">Course Fees:</label>
            <input
              type="number"
              className="form-control"
              id="courseFees"
              value={courseFees}
              onChange={handleCourseFeesChange}
              min="0.01"
              step="0.01"
              required
            />
          </div>
        )}

        <h3>Modules</h3>
        <div className="form-group mb-3">
          <label htmlFor="newModuleName">New Module:</label>
          <input
            type="text"
            className="form-control"
            id="newModuleName"
            value={newModuleName}
            onChange={handleNewModuleNameChange}
          />
          <button type="button" className="btn btn-primary mt-2" onClick={handleAddModule}>
            Add Module
          </button>
        </div>

        {modules.length > 0 && (
          <ul>
            {modules.map((module) => (
              <li key={module.name}>{module.name}</li>
            ))}
          </ul>
        )}

        <button type="submit" className="btn btn-primary mt-3" onClick={handleCreateCourse}>
          Create Course
        </button>

        {courseCreated && (
          <div className="alert alert-success mt-3" role="alert">
            Course created successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCourse;
