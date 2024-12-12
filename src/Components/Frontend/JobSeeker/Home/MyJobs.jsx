import React, {useState, useEffect} from 'react'
import {FaSearchLocation,FaRegWindowClose, FaUserCircle, FaHome, FaArrowAltCircleLeft, FaComment, FaWindowClose, FaAlignJustify, FaChevronRight, FaInfoCircle, FaUserGraduate, FaRegSave, FaFacebookSquare, FaTwitter, FaSignInAlt, FaSave } from 'react-icons/fa';
import {MdReport,MdLogout,MdWorkHistory,MdInterests,MdFeedback, MdArticle, MdOutlineLogout, MdOutlinePostAdd, MdPostAdd, MdWork, MdSavings, MdSaveAlt, MdLocationOn } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap"
import { getsavedJob } from '../../../../redux/slices/savedJobsSlice'
import axios from "axios"
import { userLoggedIn } from '../../../../redux/slices/userslice';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { BsFillSaveFill, BsSave, BsSave2Fill } from 'react-icons/bs';

function MyJobs() {
  let {id} = useParams()
  const loggedIn = useSelector(state=>state.users.loggedIn)

 const save = useSelector(state=>state.savedJobs.savedJobs)
 const [show, setShow] = useState(false)
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

  


 const dispatch = useDispatch()
//  https://job-search-api-n5ob.onrender.com - Production
// http://localhost:5000 -
  let navigate = useNavigate()

 
  // https://job-search-api-n5ob.onrender.com/jobs
  
  
  axios.defaults.withCredentials=true;
  async function handleLogOut(e){
      e.preventDefault()
      const response = await axios.get("http://localhost:5000/logout")
        if(response.data.status){
            navigate("/login")
            dispatch(userLoggedIn(false))
            window.location.reload()

      
        }
    }

  useEffect(() => {
    const fetchJob = async ()=>{
      const response = await axios.get(`http://localhost:5000/mysavedJobs/${id}`)
      dispatch(getsavedJob(response.data))
    }
    fetchJob()
  }, [])
  
  return (
    <div style={{margin:"30px"}}>
     
      
          
         
          <Button className="me-2" onClick={handleShow}><FaArrowAltCircleLeft/></Button>
      <Offcanvas show={show} onHide={handleClose} className="cartNav">
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
      <Link to={`/skills/${id}`} style={{color:"lightgray"}}><MdInterests /> Skills <FaChevronRight style={{float:"right"}}/></Link>
        <Link to={`/savedJobs/${id}`} style={{color:"lightgray",background:"rgba(66, 66, 176, 0.327)"}}><MdWork/> Saved Jobs<FaChevronRight style={{float:"right"}}/></Link>
        <Link to={`/myReports/${id}`} style={{color:"lightgray"}}><MdReport/> My Reports<FaChevronRight style={{float:"right"}}/></Link>
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
  <div>{save.length==0&& <h3>No jobs have been saved</h3>}</div>
     {
      save.filter((s)=>{
        return s
      }).reverse().map((j)=>{
        return <div key={j.id}>
    <p> <b>Job Title - </b><MdWork/> {j.title}</p>
 <p><b>Job Type - </b>{j.jobType}</p>
 <div><MdLocationOn/> {j.province==""?"":`${j.province},`} {j.area}</div>
 <p>{j.jobLocation}</p>
 <div style={{dispaly:"flex"}}>

 <button disabled style={{background:"black",color:"lightgray"}}>

                        Saved <FaSave/>
                          </button>
                          <button style={{marginLeft:"20px"}}onClick={()=>navigate(`/job/${j.jobId}`)}>
                            View job 
                          </button>

 </div>


 <hr /> 
        </div>
      })
     }
                                                                    
   </div>
  )
}

export default MyJobs