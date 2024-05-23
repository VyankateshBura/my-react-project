import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './course.css';

const Course = ({ course }) => {
  const [data, setData] = useState([]);
  const hasFetchedData = useRef(false);
  const allCourse = useRef([]);

  useEffect(() => {
    if (!hasFetchedData.current) {
      console.log('Fetching data...');
      axios.get('http://localhost:8080/api/course/all')
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          allCourse.current = response.data; // Update current value of allCourse
          console.log(allCourse.current);
        })
        .catch(e => console.log(e));
      hasFetchedData.current = true;
    }
  }, []);

  return (
    <div className="course">
      {allCourse.current.map(course => (
        <div key={course.id}>
          <h3>{course.name}</h3>
          <p>Instructor: {course.type}</p>
          <p>Duration: {course.fees}</p>
          <button>Select</button>
        </div>
      ))}
    </div>
  );
};

export default Course;
