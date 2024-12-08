import React, {useState, useEffect} from 'react'
import {FaSearchLocation,FaRegWindowClose, FaUserCircle, FaHome, FaArrowAltCircleLeft, FaComment, FaWindowClose, FaAlignJustify, FaChevronRight, FaInfoCircle, FaUserGraduate } from 'react-icons/fa';
import {MdReport,MdLogout,MdWorkHistory,MdInterests,MdFeedback, MdArticle, MdOutlineLogout, MdOutlinePostAdd, MdPostAdd, MdWork } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Button,  Offcanvas} from "react-bootstrap"
import { userLoggedIn } from '../../../../redux/slices/userslice';
import axios from "axios"
import { Link } from 'react-router-dom'
import { getReport } from '../../../../redux/slices/reportSlice'

function MyReports() {
  let {id} = useParams()
  const loggedIn = useSelector(state=>state.users.loggedIn)
 const reports = useSelector(state=>state.reports.reports)
 const [show, setShow] = useState(false)
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
  


 const dispatch = useDispatch()
//  https://job-search-api-n5ob.onrender.com - Production
// http://localhost:5000 -
  let navigate = useNavigate()
  useEffect(()=>{
    if(loggedIn==false){
        navigate("/login")
    }
  },[])
  
  axios.defaults.withCredentials=true;
  async function handleLogOut(e){
      e.preventDefault()
      const response = await axios.get("http://localhost:5000/logout")
        if(response.data.status){
            navigate("/login")
            dispatch(userLoggedIn(false))
      
        }
    }
 
  // https://job-search-api-n5ob.onrender.com/jobs

  useEffect(() => {
    const fetchJob = async ()=>{
      const response = await axios.get(`http://localhost:5000/myReports/${id}`)
      dispatch(getReport(response.data))
    }
    fetchJob()
  }, [])
  
  return (
    <div style={{margin:"30px"}}>
       <Button className="me-2" onClick={handleShow}><FaArrowAltCircleLeft/></Button>

      
<Offcanvas show={show} className="cartNav">
  <Offcanvas.Header closeButton>
    <Button bg="secondary" onClick={handleClose}><FaRegWindowClose/></Button>
  </Offcanvas.Header>
  <Offcanvas.Body>
  {show?  <div >
      {loggedIn?<div style={{display:"flex",gap:"1.5rem", flexDirection:"column"}}>
      <Link to={`/`} style={{color:"lightgray"}}><FaHome/> Home <FaChevronRight style={{float:"right"}}/></Link>

      <Link to={`/profileEditUser/${id}`} style={{color:"lightgray"}}><FaUserCircle /> Personal Information<FaChevronRight style={{float:"right"}}/></Link>
      <Link to={`/education/${id}`} style={{color:"lightgray"}}><FaUserGraduate /> Educational Background<FaChevronRight style={{float:"right"}}/></Link>
      <Link to={`/workHistory/${id}`} style={{color:"lightgray"}}><MdWorkHistory /> Work History<FaChevronRight style={{float:"right"}}/></Link>
      <Link to={`/profile/${id}`} style={{color:"lightgray"}}><MdInterests /> Skills <FaChevronRight style={{float:"right"}}/></Link>
        <Link to={`/savedJobs/${id}`} style={{color:"lightgray"}}><MdWork/> Saved Jobs<FaChevronRight style={{float:"right"}}/></Link>
        <Link to={`/myReports/${id}`} style={{color:"lightgray",background:"rgba(66, 66, 176, 0.327)"}}><MdReport/> My Reports<FaChevronRight style={{float:"right"}}/></Link>
        <Link to={`/feedback/${id}`} style={{color:"lightgray"}}><MdFeedback/> Feedback<FaChevronRight style={{float:"right"}}/></Link>

        <Link style={{color:"lightgray"}}onClick={handleLogOut}> <MdLogout/> <FaChevronRight style={{float:"right"}}/>log out</Link>
        </div>
        : 
        <div style={{display:"flex", flexDirection:"column"}}>
            <Link style={{color:"lightgray"}} to="/register"><FaUserCircle /> Register<FaChevronRight style={{float:"right"}}/></Link>
            <Link style={{color:"lightgray"}} to="/login" ><FaUserCircle /> Login<FaChevronRight style={{float:"right"}}/></Link>

          </div>
}
              
      </div>
      :null
     }
  </Offcanvas.Body>
</Offcanvas>
     <br /><br />

     {
      reports.map((j)=>{
        return <div key={j.id}>
    <p> <b>Job Title - </b><MdWork/> {j.title}</p>
 <p><b>Job Type - </b>{j.jobType}</p>
 <p> <b>Job Location - </b><FaSearchLocation/> {j.province}, {j.area}</p>
 <p><b>{j.jobLocation}</b></p>
 <p><b> Report message</b> - {j.reportMessage}</p>
 <p><b>Report status</b> - {j.status}</p>
 <button type="submit" className='btn btn-sm btn-danger'><MdReport/> Reported</button> 

 <hr /> 
        </div>
      })
     }
                                                                    
   </div>
  )
}

export default MyReports