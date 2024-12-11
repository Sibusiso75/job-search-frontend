import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {Button, Container,Modal, Form, Nav,Col, Navbar,FormSelect, NavDropdown, Offcanvas} from "react-bootstrap"
import { getSkill, addSkill } from '../../../../redux/slices/skillSlice'
import { toast } from 'react-toastify'
import { FaArrowAltCircleLeft, FaEdit, FaRegWindowClose } from 'react-icons/fa'
import { BsPlus } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight, FaUserCircle, FaUserGraduate } from 'react-icons/fa'
import { userLoggedIn } from '../../../../redux/slices/userslice'
import { MdWorkHistory, MdInterests, MdWork, MdLogout, MdReport, MdFeedback } from 'react-icons/md'

function AddSkills() {
    const {id} = useParams()
    const loggedIn = useSelector(state=>state.users.loggedIn)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const skills = useSelector(state=>state.skills.skills)
 const [skillName, setSkillName] = useState("")
 const [username, setUsername] = useState("")
 const [skillLevel, setSkillLevel] = useState("")
 const [userId, setUserId] = useState("")
 const [validated, setValidated] = useState(false)
 const [show, setShow] = useState(false)
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true); 

 const [showModal, setShowModal] = useState(false)
 const handleCloseModal = () => setShowModal(false);
 const handleShowModal = () => setShowModal(true); 


 

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
  try {
    const fetchSkills = async ()=>{
        const response = await axios.get(`http://localhost:5000/mySkills/${id}`)
        setUsername(response.data.username)
        setUserId(response.data.userId)
        dispatch(getSkill(response.data))

    }
    fetchSkills()
  } catch (error) {
    console.log(error)
  }
},[])


 async function handleSubmit(e){
    e.preventDefault()
    try {
        const response = await axios.post(`http://localhost:5000/addSkill/${id}`,{username,skillName,skillLevel,userId})
           if(response.data.status){
               dispatch(addSkill({username,skillName,skillLevel,userId}))
               toast.success(response.data.message)
               handleCloseModal()
           }
           else{
            toast.error("error")
            console.log(response.data)
           }
    } catch (error) {
        console.log(error)
    }
 }
  return (
    <div>
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
      <Link to={`/skills/${id}`} style={{color:"lightgray",background:"rgba(66, 66, 176, 0.327)"}}><MdInterests /> Skills <FaChevronRight style={{float:"right"}}/></Link>
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
<Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Skill</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
        <Form.Group  className="mb-3" controlId="validationCustom01">
          <Form.Label>Skill Name</Form.Label>
            <Form.Control
              type="text"
              autoFocus

              onChange={(e)=>setSkillName(e.target.value)}
              placeholder="skill name"
              required
            />
            <Form.Control.Feedback type="invalid">
            Please provide valid value
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustom04">
          <Form.Label>Skill Level</Form.Label>
          <FormSelect onChange={(e)=>setSkillLevel(e.target.value)}>
            <option value="Choose an option">Choose an option</option>
           <option value="Beginner">Beginner</option>
           <option value="Intermediate">Intermediate</option>
           <option value="Advanced">Advanced</option>
           <option value="Expert">Expert</option>
          </FormSelect>
          <Form.Control.Feedback type="invalid">
           Please provide a valid email
          </Form.Control.Feedback>
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
        </Form> 
      </Modal>
  

        <br />
        <ol>
        <h3 style={{textDecoration:"underline"}}>Skills</h3>

          {
            skills.map((skill)=>{
                return <li style={{margin:"30px"}}key={skill.id}>
                     <span>
                        {skill.skillName} - {skill.skillLevel} 
                        </span>
                    
                </li>
            })
          }
           <Button variant="success" onClick={handleShowModal}>
            Add skill <BsPlus/>
          </Button>
      </ol>
    </div>
  )
}

export default AddSkills