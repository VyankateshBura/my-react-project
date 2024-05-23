import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './course.css';

const Course = ({ course }) => {
  const [data, setData] = useState([]);
  const hasFetchedData = useRef(false);
  const allCourse = useRef([]);

  useEffect(() => {
      console.log('Fetching data...');
      axios.get('http://localhost:8080/api/course/all')
        .then((response) => {
          setData(response.data);
          console.log("Course data "+response.data);
          allCourse.current = response.data; 
          console.log(allCourse.current);
        })
        .catch(e => console.log(e));
      hasFetchedData.current = true;
  }, []);

  return (
    <div className="container mx-4 my-5">
  <div className="row row-cols-1 row-cols-md-3 g-4">  
    {allCourse.current.map(course => (
      <div key={course.id} className="col">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{course.name}</h5>
            <p className="card-text">Instructor: {course.type}</p>
            <p className="card-text">Duration: {course.fees}</p>
            <button  className="btn btn-light" ><Link to={"/course/"+course.id} style={{textDecoration:'none'}}>Select</Link></button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default Course;
