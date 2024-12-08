import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {FaSearchLocation,FaRegWindowClose, FaUserCircle, FaHome, FaArrowAltCircleLeft, FaComment, FaWindowClose, FaAlignJustify, FaChevronRight, FaInfoCircle, FaUserGraduate } from 'react-icons/fa';
import {MdReport,MdLogout,MdWorkHistory,MdInterests,MdFeedback, MdArticle, MdOutlineLogout, MdOutlinePostAdd, MdPostAdd, MdWork } from 'react-icons/md';
import {Button,  Offcanvas, Form, Col} from "react-bootstrap"

import { Link } from 'react-router-dom'
import { userLoggedIn, updateUser } from '../../../../redux/slices/userslice'
import axios from "axios"
import { toast } from 'react-toastify'


function ProfileEditUser() {
    let {id}=  useParams() 
    const loggedIn = useSelector(state=>state.users.loggedIn)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [email, setEmail]= useState("")
    const [username, setUsername]= useState("")
    const [validated, setValidated] = useState(false)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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
    async function update(e){
      e.preventDefault()
      try {
        
        const response = await axios.put(`http://localhost:5000/updateUser/${id}`,{username,email})
        if(response.data.status){
          dispatch(updateUser(response.data))
          toast.success("Updated successfully")
              navigate("/")
            }
            else{
              toast.error("error")
            }
          } catch (error) {
            toast.error(error)
          }
  }
  
  useEffect(()=>{
    axios.get("http://localhost:5000/verify")
    .then(res=>{
     if(res.data.status){
       setUsername(res.data.username)
        setEmail(res.data.email)
       
     }
     else {
       toast.error("User not verified")
     }
    })
   },[])
  
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

      <Link to={`/profile/${id}`} style={{color:"lightgray",background:"rgba(66, 66, 176, 0.327)"}}><FaUserCircle /> Personal Information<FaChevronRight style={{float:"right"}}/></Link>
      <Link to={`/education/${id}`} style={{color:"lightgray"}}><FaUserGraduate /> Educational Background<FaChevronRight style={{float:"right"}}/></Link>
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
            <Link style={{color:"lightgray"}} to="/login" ><FaUserCircle /> Login<FaChevronRight style={{float:"right"}}/></Link>

          </div>
}
              
      </div>
      :null
     }
  </Offcanvas.Body>
</Offcanvas>
      
    <button className='btn btn-sm btn-secondary' onClick={()=>navigate(`/profile/${id}`)}>View Profile</button>

  
<Form  style={{margin:"40px"}}noValidate validated={validated} onSubmit={update}>
  <h3 style={{textDecoration:"underline"}}>Personal Information</h3>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"

              onChange={(e)=>setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              required
            />
            <Form.Control.Feedback type="invalid">
            Please provide valid username.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Email</Form.Label>
          <Form.Control 
                        onChange={(e)=>setEmail(e.target.value)}
          type="email" placeholder="Email" value={email} required />
          <Form.Control.Feedback type="invalid">
           Please provide a valid email
          </Form.Control.Feedback>
        </Form.Group>
      <button className='btn btn-sm btn-success' type="submit">Update</button>
        </Form> 
                    
           
    </div>
  )
}

export default ProfileEditUser