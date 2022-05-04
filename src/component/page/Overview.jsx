import React, { useEffect, useState } from 'react'
import '../../assets/styles/main.css'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../custom-hooks/useFetch'

function Overview () {
  const { id } = useParams()
  const path = id.replace(/\&/g, '/')
  const url = `https://www.sydney.edu.au${path}.overview.json`
  const { subState } = useFetch(url)
  return (
    <div className="search-form">
        <div className="breadcrum">
       <Link to="/"> Back To Course</Link>
        </div>
      <h2>  Overview  </h2>
            <div key={id} className="overview">
              <h3 >{subState.title}</h3>
              <p>{subState.description}</p>
            </div>
    </div>
  )
}

export default Overview
