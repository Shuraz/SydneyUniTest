import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../custom-hooks/useFetch';

function Overview() {
 const {id}= useParams();

const path = id.replace(/\&/g, "/")
 const url= `https://www.sydney.edu.au${path}.overview.json`;
// const url = `https://www.sydney.edu.au/content/courses/courses/uc/bachelor-of-commerce-and-bachelor-of-laws.overview.json`
// const [subjectOverview,setSubjectOverview]=useState({});
const {subState} = useFetch(url)
// const fetchSubject=()=>{
// axios
// .get(url)
// .then((resp) => {
//   // console.log(resp);
//    console.log(resp.data);
//   setSubjectOverview(resp.data);
// })
// .catch((err) => console.log(err))

// };
// useEffect(()=>{
//   fetchSubject();

// },[])

  return (
    <div>
       <Link to="/">Go to Find Course</Link>
      <h2>  Overview  </h2>
  
            <div key={id}>
              <p>{subState.title}</p>
              <p>{subState.description}</p>
            </div>

    </div>
    
  )
}

export default Overview