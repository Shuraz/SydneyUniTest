import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Error from "./Error";
import axios from "axios";
import "../../assets/styles/main.css";

function Course() {
  const [subject, setSubject] = useState("");
  const [mydata, setData] = useState(null);
  const start_count = useState(0);
  const end_count = useState(50);
  const url = `https://www.sydney.edu.au/s/search.html?collection=aem_courses_courses-PROD&query=${subject}&num_ranks=${end_count}&start_rank=${start_count}&form=custom-json`;
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(5);
  const [mainData, setMainData] = useState(null);

  function listData(data, offset) {
    const endOffset = offset + itemsPerPage;
    console.log(`Loading items from ${offset} to ${endOffset}`);
    setData(data.slice(offset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }
  // Handle pagination click
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % mainData.length;
    setItemOffset(newOffset);
    listData(mainData, newOffset);
  };
  // fetch list data
  const fetchSubject = async () => {
    try {
      const resp = await axios.get(url);
      if (resp) {
        const results = resp.data.results;
        setData(results);
        setMainData(results);
        listData(results, 0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function mySubmitFunction(e) {
    e.preventDefault();
    fetchSubject();
    return false;
  }
  // Generate list items
  function DataTable({ mydata }) {
    return mydata.map((item) => {
      const { title, path, rank } = item;
      const newpath = path.replace(/\//g, "&");
      return (
        <div key={rank}>
          <div className="subject-title">
            <Link to={`/overview/${newpath}`}>
              <h3>{title}</h3>
            </Link>
          </div>
        </div>
      );
    });
  }
  // Build list table and pagination
  function buildTemplate() {
    if (mydata && mydata.length > 0) {
      return (
        <>
          <DataTable mydata={mydata} />
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </>
      );
    } else if (!mydata) {
      return (
        <h3>Please enter the search key word to view the list of items.</h3>
      );
    } else {
      return <Error />;
    }
  }

  return (
    <form className="search-form" onSubmit={(event) => mySubmitFunction(event)}>
      <h2> Sydney Uni Course Search</h2>
      <div className="search-container">
        <div className="search-input">
          <input
            type="text"
            value={subject}
            placeholder="Search Courses"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            className="form-input"
          />
        </div>
        <div className="btn-container">
          <button type="button" onClick={fetchSubject}>
            Search
          </button>
        </div>
      </div>
      <div className="courses">{buildTemplate()}</div>
    </form>
  );
}

export default Course;
