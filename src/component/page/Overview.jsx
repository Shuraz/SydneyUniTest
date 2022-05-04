import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

function Overview() {
 const {id}= useParams();
//  const path= "/content/courses/courses/uc/bachelor-of-commerce-and-bachelor-of-laws";
//  const newpath=path.replace(/\//g, "%")
//  console.log(newpath);
 //converting to lowercase and replacing space with '-'
//  const path = id.toLocaleLowerCase().replace(/\s+/g, '-');
const path = id.replace(/\&/g, "/")
//  const url= `https://www.sydney.edu.au${path}.overview.json`;
const url = `https://www.sydney.edu.au${path}.overview.json`
const [subjectOverview,setSubjectOverview]=useState([]);

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
    setSubjectOverview(data.results)
  }).catch(error=>{
    console.log(error);
})
};
useEffect(()=>{
  fetchSubject();
})

  return (
    <div>
      <h2>  Overview  </h2>
      <p>{path}</p>
      <p>{url}</p>
    </div>
    
  )
}

export default Overview