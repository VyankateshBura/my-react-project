import axios from 'axios';
import { useEffect, useRef, useState } from 'react';


const Coursedetails = ({ course }) => {
  const [data, setData] = useState([]);
  const hasFetchedData = useRef(false);
  const allModules = useRef([]);

  useEffect(() => {
      console.log('Fetching data...');
      axios.get('http://192.168.1.8:8080/api/course/modules/all')
        .then((response) => {
          setData(response.data);
          console.log("Course data "+response.data);
          allModules.current = response.data; 
          console.log(allModules.current);
        })
        .catch(e => console.log(e));
      hasFetchedData.current = true;
  }, []);

  return (
    <div className="container">
  <div className="row row-cols-1 row-cols-md-3 g-4">  {/* Adjust columns as needed */}
    {allModules.current.map(module => (
      <div className="course">
      <h3>title : {module.title}</h3>
      <p>Instructor: {module.instructor}</p>
      <p>Duration: {module.duration}</p>
      <p>Price : {module.price}</p>
      <button>Buy Now </button>
      <button>Download Syllabus</button>
    </div>
    ))}
  </div>
</div>
  );
};

export default Coursedetails;
