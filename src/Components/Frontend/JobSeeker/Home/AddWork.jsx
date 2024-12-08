import React, { useEffect, useState } from 'react'
import axios from "axios"
import {FaSearchLocation,FaRegWindowClose, FaUserCircle, FaHome, FaArrowAltCircleLeft, FaComment, FaWindowClose, FaAlignJustify, FaChevronRight, FaInfoCircle, FaUserGraduate, FaRegSave, FaFacebookSquare, FaTwitter, FaSignInAlt } from 'react-icons/fa';
import {MdReport,MdLogout,MdWorkHistory,MdInterests,MdFeedback, MdArticle, MdOutlineLogout, MdOutlinePostAdd, MdPostAdd, MdWork, MdSavings, MdSaveAlt } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import { updateUser, userLoggedIn } from '../../../../redux/slices/userslice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

function AddWork() {
  
    const {id} = useParams()
    const loggedIn = useSelector(state=>state.users.loggedIn)
    
    const [validated, setValidated] = useState(false);
    const [jobTitle, setJobTitle] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [yearsOfExperience, setYearsOfExperience] = useState(null)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

      
    const dispatch = useDispatch()

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

    useEffect(()=>{
         const fetchExperience = async ()=>{
          const response = await axios.get(`http://localhost:5000/work-experience/${id}`)
             setJobTitle(response.data.jobTitle)
             setCompanyName(response.data.companyName)
             setYearsOfExperience(response.data.yearsOfExperience)
             setStartDate(response.data.startDate)
             setEndDate(response.data.endDate)
         }
         fetchExperience()
    },[])
    async function handleSubmit(e){
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:5000/addWork/${id}`,{
                jobTitle,
                companyName,
                yearsOfExperience,
                startDate,
                endDate})
            if(response.data.status){
                dispatch(updateUser(response.data))
                toast.success(response.data.message)
            }
            else {
               setValidated(true)
            }
        } catch (error) { 
           toast.error(error)
           console.log(error)
        }
    }
  return (
    <div>
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
      <Link to={`/workHistory/${id}`} style={{color:"lightgray",background:"rgba(66, 66, 176, 0.327)"}}><MdWorkHistory /> Work History<FaChevronRight style={{float:"right"}}/></Link>
      <Link to={`/profile/${id}`} style={{color:"lightgray"}}><MdInterests /> Skills <FaChevronRight style={{float:"right"}}/></Link>
        <Link to={`/savedJobs/${id}`} style={{color:"lightgray"}}><MdWork/> Saved Jobs<FaChevronRight style={{float:"right"}}/></Link>
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
      
         <Form  style={{margin:"40px"}}noValidate validated={validated} onSubmit={handleSubmit}>
      <h3 style={{textDecoration:"underline"}}>Work Experience</h3>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            required
            value={jobTitle}
            type="text"
            onChange={(e)=>setJobTitle(e.target.value)}
            placeholder="Job title"
          />
          <Form.Control.Feedback type="invalid">Please provide a valid value</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label>Company name</Form.Label>
          <Form.Control
          value={companyName}
            required
            onChange={(e)=>setCompanyName(e.target.value)}

            type="text"
            placeholder="company name"
          />
          <Form.Control.Feedback type="invalid">Please provide a valid value</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom03">
          <Form.Label>Years of Experience</Form.Label>
            <Form.Control
            value={yearsOfExperience}
             onChange={(e)=>setYearsOfExperience(e.target.value)}
              type="number"
              placeholder="How many years do you have?"
              required
            />
            <Form.Control.Feedback type="invalid">
            Please provide a number.
            </Form.Control.Feedback>
        </Form.Group>
      
            <Form.Group as={Col} md="3" controlId="validationCustom03">
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="text" 
          value={startDate}
             onChange={(e)=>setStartDate(e.target.value)}
          placeholder="When did you start working for this company?"
           required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid value.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>End Date</Form.Label>
          <Form.Control type="text" value={endDate} onChange={(e)=>setEndDate(e.target.value)} placeholder="Qualification name" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid value.
          </Form.Control.Feedback>
        </Form.Group>
      
       <br />
      <button className='btn btn-sm btn-success me-2' type="submit">Update Info</button >
    </Form>
    </div>
  )
}

export default AddWork