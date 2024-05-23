import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddModule = () => {
    const { courseID } = useParams();
  const [moduleName, setModuleName] = useState('');
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/course/${courseID}/modules`);
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
        // setError(error.message); // Handle errors appropriately
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, [courseID]); 

  const handleModuleNameChange = (event) => {
    setModuleName(event.target.value);
  };

  const handleAddModule = async () => {
    if (moduleName.trim() === '') {
      return; // Prevent adding empty modules
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/course/${courseID}/modules`, { name: moduleName });
      setModules([...modules, response.data]); // Add newly created module to state
      setModuleName(''); 
    } catch (error) {
      console.error('Error creating module:', error);
      setError(error.message); // Handle errors appropriately
    }
  };

  return (
    <div className="container my-5 mx-3 border rounded p-3">
      <h2>Add Modules to Course (ID: {courseID})</h2>

      {isLoading && <div className="text-center mb-3">Loading modules...</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <div className="form-group mb-3">
        <label htmlFor="moduleName">Module Name:</label>
        <input
          type="text"
          className="form-control"
          id="moduleName"
          value={moduleName}
          onChange={handleModuleNameChange}
          placeholder="Enter module name"
          required
        />
      </div>

      <button type="button" className="btn btn-primary" onClick={handleAddModule}>
        Add Module
      </button>

      {modules.length > 0 && (
        <div className="mt-4">
          <h4>Existing Modules</h4>
          <ul className="list-group">
            {modules.map((module) => (
              <li key={module.id} className="list-group-item">
                {module.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddModule;
