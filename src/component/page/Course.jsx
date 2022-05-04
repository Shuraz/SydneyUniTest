import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

function Course() {
 

  const [subject,setSubject]=useState("");
  const [mydata,setData]=useState([]);
  const url= `https://www.sydney.edu.au/s/search.html?collection=aem_courses_courses-PROD&query=${subject}&num_ranks=12&start_rank=1&form=custom-json`

const fetchSubject=()=>{
  fetch(url)
  .then(response=>{
    console.log(response);
    if(!response.ok){
      throw Error("ERROR");
  }
    return response.json();

  }).then(data=>{
    console.log(data.results);
    setData(data.results)
  }).catch(error=>{
    console.log(error);
})
};

  function mySubmitFunction(e) {
    e.preventDefault();
    fetchSubject();
    return false;
  }

  return (
    <form onSubmit={(event) => mySubmitFunction(event)}>
    <h2>Course Search</h2>
    <input type="text" value={subject} placeholder="Search Courses" onChange={(e)=>{setSubject(e.target.value)}}/>
    <button type='button' onClick={fetchSubject}>Search</button>

    <div>
    { mydata.map((item)=>{
      //destructuring object 
        const {title,path,rank}=item;
        //  const path= "/content/courses/courses/uc/bachelor-of-commerce-and-bachelor-of-laws";
 const newpath=path.replace(/\//g, "&")
//  console.log(newpath);

        return(
          <div key={rank}>
            <Link to={`/overview/${newpath}`}>
            <p>{title}</p>
            </Link>
          </div>
        )

      })
    }

    </div>
    </form>
  )
}

export default Course