import React, { useEffect, useState } from 'react'
import axios from "axios"
import {FaSearchLocation,FaRegWindowClose, FaUserCircle, FaHome, FaArrowAltCircleLeft, FaComment, FaWindowClose, FaAlignJustify, FaChevronRight, FaInfoCircle, FaUserGraduate, FaRegSave, FaFacebookSquare, FaTwitter, FaSignInAlt } from 'react-icons/fa';
import {MdReport,MdLogout,MdWorkHistory,MdInterests,MdFeedback, MdArticle, MdOutlineLogout, MdOutlinePostAdd, MdPostAdd, MdWork, MdSavings, MdSaveAlt } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom'
import {Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap"
import Col from 'react-bootstrap/Col';

import { useDispatch, useSelector } from 'react-redux'
import {addfeedBack } from '../../../../redux/slices/feedbackSlice'
import { toast } from 'react-toastify'
import { userLoggedIn } from '../../../../redux/slices/userslice';
import { Link } from 'react-router-dom';

function AddFeedback() {
    const {id} = useParams()
    const loggedIn = useSelector(state=>state.users.loggedIn)

    const [feedbackMessage, setFeedbackMessage] = useState("")
    const [username, setUsername] = useState("")    
    const [userId, setUserId] = useState("")
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   
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

    useEffect(()=>{
        axios.get("http://localhost:5000/verify")
        .then(res=>{
         if(res.data.status){
           setUsername(res.data.username)
           setUserId(res.data.id)
         }
        
        })
       },[])
      
    const dispatch = useDispatch()

    async function handleFeedback(e){
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5000/addFeedback/${id}`,{userId,username,feedbackMessage})
            if(response.data.status){
                dispatch(addfeedBack(response.data))
                toast.info(response.data.message)
            }
            else{
               toast.error(response.data.message)
            }
        } catch (error) { 
           toast.error(error)
           console.log(error)
        }
    }
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
        <Link to={`/savedJobs/${id}`} style={{color:"lightgray"}}><MdWork/> Saved Jobs<FaChevronRight style={{float:"right"}}/></Link>
        <Link to={`/myReports/${id}`} style={{color:"lightgray"}}><MdReport/> My Reports<FaChevronRight style={{float:"right"}}/></Link>
        <Link to={`/feedback/${id}`} style={{color:"lightgray",background:"rgba(66, 66, 176, 0.327)"}}><MdFeedback/> Feedback<FaChevronRight style={{float:"right"}}/></Link>

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
         <form onSubmit={handleFeedback}>

            <textarea onChange={(e)=>setFeedbackMessage(e.target.value)}
            placeholder ="add feedback ..." />
            <Button className='btn btn-sm btn-success me-2' type="submit">Add feedback</Button>
         </form>
    </div>
  )
}

export default AddFeedback