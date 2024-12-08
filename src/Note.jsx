import React from 'react'
import { FaAlignJustify, FaHome, FaImages, FaInfoCircle, FaRegWindowClose } from 'react-icons/fa'
import { MdArticle, MdWork } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

function Note() {
          let navigate = useNavigate()
  return (
    <div >
           <header className="cartNav">
        <Link to="/"  ><FaHome/> Home </Link>
        <Link to="/posts"><MdArticle/> Posts</Link>
          <Link to="/savedJobs"> <MdWork/> Saved Jobs</Link>
          <Link to="/info" style={{position:"fixed",right:"15px",borderBottom:"2px double white"}}
> <FaInfoCircle/> Info</Link>

       
          
      </header>
   <button  style={{margin:"3px"}}onClick={()=>navigate("/")}>Back home <FaHome/></button>
          <div style={{background:"black",padding:"20px",color:"whitesmoke",margin:"20px", fontWeight:"bold"}}>
          <span><FaInfoCircle/> This is a job search mock up application developed by Sibusiso Matebese. App is still in progress.</span>

          </div>
          
    </div>
  )
}

export default Note