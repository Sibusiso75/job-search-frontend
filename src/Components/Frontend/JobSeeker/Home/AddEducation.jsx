import React, { useEffect, useState } from 'react'
import axios from "axios"
import {FaSearchLocation,FaRegWindowClose, FaUserCircle, FaHome, FaArrowAltCircleLeft, FaComment, FaWindowClose, FaAlignJustify, FaChevronRight, FaInfoCircle, FaUserGraduate, FaRegSave, FaFacebookSquare, FaTwitter, FaSignInAlt } from 'react-icons/fa';
import {MdReport,MdLogout,MdWorkHistory,MdInterests,MdFeedback, MdArticle, MdOutlineLogout, MdOutlinePostAdd, MdPostAdd, MdWork, MdSavings, MdSaveAlt } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import { getUser, updateUser, userLoggedIn } from '../../../../redux/slices/userslice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

function AddEducation() {
  
    const {id} = useParams()
    const loggedIn = useSelector(state=>state.users.loggedIn)
  let navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [highestGradePassed, setHighestGradePassed] = useState("")
    const [schoolName, setSchoolName] = useState("")
    const [show, setShow] = useState(false)
    
        const [yearObtainedOne, setYearObtainedOne] = useState("")
        const [yearObtainedTwo, setYearObtainedTwo] = useState("")
        const [institutionName, setInstitutionName] = useState("")
        const [courseName, setCourseName] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [jobTitle, setJobTitle] = useState()
    // const [companyName, setCompanyName] = useState()
    // const [yearsOfExperience, setYearsOfExperience] = useState()
    const [showTertiary, setShowTertiary] = useState(false)

      
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
      const fetchEducation = async ()=>{
        const response = await axios.get(`http://localhost:5000/education/${id}`)
        setHighestGradePassed(response.data.highestGradePassed)
        setSchoolName(response.data.schoolName)
        setYearObtainedOne(response.data.yearObtainedOne)
        setInstitutionName(response.data.institutionName)
        setCourseName(response.data.courseName)
        setYearObtainedTwo(response.data.yearObtainedTwo)
        dispatch(getUser(response.data))
      }
      fetchEducation()
    },[])
    async function handleSubmit(e){
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:5000/addEducation/${id}`,{
                highestGradePassed,schoolName,yearObtainedOne,institutionName,courseName,
                yearObtainedTwo})
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
      <Link to={`/education/${id}`} style={{color:"lightgray",background:"rgba(66, 66, 176, 0.327)"}}><FaUserGraduate /> Educational Background<FaChevronRight style={{float:"right"}}/></Link>
      <Link to={`/workHistory/${id}`} style={{color:"lightgray"}}><MdWorkHistory /> Work History<FaChevronRight style={{float:"right"}}/></Link>
      <Link to={`/profile/${id}`} style={{color:"lightgray"}}><MdInterests /> Skills <FaChevronRight style={{float:"right"}}/></Link>
        <Link to={`/savedJobs/${id}`} style={{color:"lightgray"}}><MdWork/> Saved Jobs<FaChevronRight style={{float:"right"}}/></Link>
        <Link to={`/myReports/${id}`} style={{color:"lightgray"}}><MdReport/> My Reports<FaChevronRight style={{float:"right"}}/></Link>
        <Link to={`/feedback/${id}`} style={{color:"lightgray"}}><MdFeedback/> Feedback<FaChevronRight style={{float:"right"}}/></Link>

        <Link style={{color:"lightgray"}}onClick={handleLogOut}> <MdLogout/> <FaChevronRight style={{float:"right"}}/>log out</Link>
        </div>
        : 
        <div style={{display:"flex", flexDirection:"column"}}>
            <Link style={{color:"lightgray"}} to="/register"><FaUserCircle /> Register<FaChevronRight style={{float:"right"}}/></Link>
            <Link style={{color:"lightgray"}} to="/login" ><FaUserCircle/> Login<FaChevronRight style={{float:"right"}}/></Link>

          </div>
}
              
      </div>
      :null
     }
        </Offcanvas.Body>
      </Offcanvas>
      <br />
      
         <Form  style={{margin:"30px"}}noValidate validated={validated} onSubmit={handleSubmit}>
      <h3 style={{textDecoration:"underline"}}>Basic Education</h3>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Highest Grade Passed</Form.Label>
          <Form.Control
            required
            value={highestGradePassed}
            type="text"
            onChange={(e)=>setHighestGradePassed(e.target.value)}
            placeholder="Highest Grade Passed"
          />
          <Form.Control.Feedback type="invalid">Please provide a valid value</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label>High School Name</Form.Label>
          <Form.Control
          value={schoolName}
            required
            onChange={(e)=>setSchoolName(e.target.value)}

            type="text"
            placeholder="High School name"
          />
          <Form.Control.Feedback type="invalid">Please provide a valid value</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom03">
          <Form.Label>Year Obtained</Form.Label>
            <Form.Control
            value={yearObtainedOne}
             onChange={(e)=>setYearObtainedOne(e.target.value)}
              type="text"
              placeholder="Year Obtained"
              required
            />
            <Form.Control.Feedback type="invalid">
            Please provide a valid value.
            </Form.Control.Feedback>
        </Form.Group>
        <br />
        <div style={{display:"flex", gap:"0.3rem"}}>
            <p><b>Do you want to include tertiary education?</b></p>
             <Button style={{background:"gray"}} onClick={()=>setShowTertiary(true)}>Yes</Button>
             <Button onClick={()=>setShowTertiary(false)}>No</Button>
             </div>
             {
                showTertiary?
                <div>
                    <h3 style={{textDecoration:"underline"}}>Tertiary Education</h3>
                    <Form.Group as={Col} md="3" controlId="validationCustom03">
          <Form.Label>Name of the institution</Form.Label>
          <Form.Control type="text" 
          value={institutionName}
             onChange={(e)=>setInstitutionName(e.target.value)}
          placeholder="Name of the insitution"
           required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid value.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Qualification name</Form.Label>
          <Form.Control type="text" value={courseName} onChange={(e)=>setCourseName(e.target.value)} placeholder="Qualification name" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid value.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom06">
          <Form.Label>Year Obtained</Form.Label>
          <Form.Control type="text" value={yearObtainedTwo} onChange={(e)=>setYearObtainedTwo(e.target.value)} placeholder="Year Obtained" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid value
          </Form.Control.Feedback>
        </Form.Group>
                </div>
                : null
             }
       <br />
      <button className='btn btn-sm btn-success me-2' type="submit">Update Info</button >
    </Form>
    </div>
  )
}

export default AddEducation