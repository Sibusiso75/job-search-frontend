import React from "react";
import { Link } from "react-router-dom";
import {FaUserAlt, FaUserCheck, FaUserCircle, FaWindowClose} from "react-icons/fa"
import {MdWork, MdArticle, MdOutlineLogout} from "react-icons/md"


function HomeNav() {
  
  return (
    <div className="d-flex">
      <header className="sidebar">
      <Link to="/home"><FaWindowClose style={{fontSize:"20px"}}/></Link>
     

              
      </header>
    </div>
  );
}

export default HomeNav 