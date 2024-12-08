import React from "react";
import { Link } from "react-router-dom";
import {FaUserAlt, FaUserCheck, FaUserCircle, FaWindowClose} from "react-icons/fa"
import {MdWork, MdArticle, MdOutlineLogout} from "react-icons/md"


function EmployerNav() {
  
  return (
    <div className="d-flex">
      <header className="sidebar">
      <Link to="/employerHome"><FaWindowClose style={{fontSize:"20px"}}/></Link>
      <Link to="/employerProfile/1"><FaUserCircle/> Profile</Link>
      <Link to="/employerJobs/1"><MdWork/>Jobs</Link>
        <Link to="/employerArticles"><MdArticle/> Articles</Link>


          {/* <Link to="/savedJobs"> <MdWork/> Saved Jobs</Link> */}
          <Link to="/employerLogin"> <MdOutlineLogout/> Log out</Link>
      </header>
    </div>
  );
}

export default EmployerNav 