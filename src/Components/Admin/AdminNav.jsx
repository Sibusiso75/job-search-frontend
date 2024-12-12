import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaHome, FaSave, FaSuitcase, FaSuitcaseRolling, FaUserAlt, FaUserCheck, FaUserCircle, FaUserFriends, FaUsers} from "react-icons/fa"
import {MdWork, MdArticle, MdReport, MdWorkOutline, MdWorkspacesFilled, MdDashboardCustomize, MdLogout, MdFeedback} from "react-icons/md"
import { BsPersonWorkspace } from "react-icons/bs";
import axios from "axios"


function AdminNav() {
  let navigate = useNavigate()
  axios.defaults.withCredentials=true;
  async function handleLogOut(e){
    e.preventDefault()
    const response = await axios.get("https://job-search-api-wyvc.onrender.com/logout")
      if(response.data.status){
          navigate("/admin")
    
      }
  }
  
  return (
   <div className="sidebar">
            <Link to="/admin/dashboard"><FaUsers/> Users</Link>
        <Link to="/employers"><BsPersonWorkspace/>Employers</Link>
          <Link to="/admin/jobs"> <MdWork/> Jobs</Link>
          <Link to="/admin/articles"><MdArticle/>Articles</Link>
          <Link to="/admin/reports"> <MdReport/> Reports</Link>
          <Link to="/admin/feedbacks"> <MdFeedback/> Feedbacks</Link>
          <Link onClick={handleLogOut}> <MdLogout/> Log out</Link>
    </div>
  );
}

export default AdminNav 