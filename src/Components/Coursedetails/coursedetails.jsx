import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';

const Coursedetails = ({ course }) => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const isLoading = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading.current) return; // Prevent redundant fetches

      isLoading.current = true;
      console.log('Fetching course details...');

      try {
        const response = await axios.get(`http://localhost:8080/api/course/${id}`);
        setCourseData(response.data);
        console.log("Course details:", response);
      } catch (error) {
        console.error('Error fetching course details:', error);
        // Handle errors appropriately (e.g., display an error message)
      } finally {
        isLoading.current = false;
      }
    };

    fetchData();
  }, [id]);

  if (isLoading.current) {
    return <div className="container">Loading course details...</div>;
  }

  if (!courseData) {
    return <div className="container">Course details not found.</div>;
  }

  const { name, type, fees, modules } = courseData;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          <h2>{name}</h2>
          <p>Course Type: {type}</p>
          {type === 'PAID' && <p>Price: ${fees.toFixed(2)}</p>}
          <p>Description: </p>
        </div>
        <div className="col-md-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyKuviUasBfZxEj5zvI7rsAMiMMS8VGpoddxq-1pj6Fw&s"
            alt={name}
            className="img-fluid rounded"
          />
        </div>
      </div>

      <hr className="my-4" />

      <h3>Modules</h3>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {modules.map((module) => (
          <div className="col" key={module.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{module.name}</h5>
                <p className="card-text">{/* Add a brief description of the module */}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modules Button */}
      <div className="d-flex justify-content-end mt-4">
        <Link to={"/course/add-module/"+id }className="btn btn-primary">
          Add Modules
        </Link>
      </div>
    </div>
  );
};

export default Coursedetails;
