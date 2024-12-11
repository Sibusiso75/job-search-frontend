import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {FaSearchLocation,FaRegWindowClose, FaUserCircle, FaHome, FaArrowAltCircleLeft, FaComment, FaWindowClose, FaAlignJustify, FaChevronRight, FaInfoCircle, FaUserGraduate } from 'react-icons/fa';
import {MdReport,MdLogout,MdWorkHistory,MdInterests,MdFeedback, MdArticle, MdOutlineLogout, MdOutlinePostAdd, MdPostAdd, MdWork } from 'react-icons/md';
import {Button, FormSelect, Offcanvas, Form,Row, Col} from "react-bootstrap"
import { Link } from 'react-router-dom'
import { userLoggedIn, updateUser } from '../../../../redux/slices/userslice'
import axios from "axios"
// import ReactQuill from "react-quill"
import { toast } from 'react-toastify'

/*
<ReactQuill theme="snow" value={bio} onChange={setBio}/>
*/
function ProfileEditUser() {
    let {id}=  useParams() 
    const loggedIn = useSelector(state=>state.users.loggedIn)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [email, setEmail]= useState("")
    const [username, setUsername]= useState("")
    const [town, setTown] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [bio, setBio] = useState("")
    const [province, setProvince] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [gender, setGender] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(0)

    const [validated, setValidated] = useState(false)
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


    async function update(e){
      e.preventDefault()
      try {
        
        const response = await axios.put(`http://localhost:5000/editUser/${id}`,
          {username,email,town,postalCode,province, dateOfBirth,gender,bio,phoneNumber})
         
        if(response.data.status){
          dispatch(updateUser(response.data))
          toast.success("Updated successfully")
            }
            else{
              toast.error("error")
            }
          } catch (error) {
            toast.error(error)
          }
  }
  useEffect(()=>{
    const fetchDetails = async ()=>{
     const res= await axios.get(`http://localhost:5000/profile/${id}`)
           setUsername(res.data.username)
            setEmail(res.data.email)
            setTown(res.data.town)
            setPostalCode(res.data.postalCode)
            setProvince(res.data.province)
             setDateOfBirth(res.data.dateOfBirth)
             setGender(res.data.gender)
             setPhoneNumber(res.data.phoneNumber)
        // setCountry(res.data.country)
        setBio(res.data.bio)
        }
        fetchDetails()
    
        
    
    
   },[])
  
  
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

      <Link to={`/profileEditUser/${id}`} style={{color:"lightgray",background:"rgba(66, 66, 176, 0.327)"}}><FaUserCircle /> Personal Information<FaChevronRight style={{float:"right"}}/></Link>
      <Link to={`/education/${id}`} style={{color:"lightgray"}}><FaUserGraduate /> Educational Background<FaChevronRight style={{float:"right"}}/></Link>
      <Link to={`/workHistory/${id}`} style={{color:"lightgray"}}><MdWorkHistory /> Work History<FaChevronRight style={{float:"right"}}/></Link>
      <Link to={`/skills/${id}`} style={{color:"lightgray"}}><MdInterests /> Skills <FaChevronRight style={{float:"right"}}/></Link>
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

  
    <Form  style={{margin:"30px"}}noValidate validated={validated} onSubmit={update}>
      <h3 style={{textDecoration:"underline"}}>Basic Information</h3>
      <Row className="mb-2">
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            value={username}
            disabled
            type="text"
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Full Name"
          />
          <Form.Control.Feedback type="invalid">Please provide a valid  name</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            value={email}
            disabled
            type="email"
            onChange={(e)=>setEmail(e.target.value)}

            placeholder="Email"
          />
          <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-2">
       
        <Form.Group as={Col} md="3" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text"
          value={town}
                onChange={(e)=>setTown(e.target.value)}
           placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip code</Form.Label>
          <Form.Control type="text"
          value={postalCode}
           onChange={(e)=>setPostalCode(e.target.value)}
           placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group> 
      </Row>
      <Row className="mb-2">
      <Form.Group as={Col} md="3" controlId="validationCustom03">
         <Form.Label>Phone number</Form.Label>
         <Form.Control type="number"
         value={phoneNumber}
               onChange={(e)=>setPhoneNumber(e.target.value)}
          placeholder=" e.g 07123456789" required />
         <Form.Control.Feedback type="invalid">
           Please provide a valid phone number.
         </Form.Control.Feedback>
       </Form.Group>
       <Form.Group as={Col} md="3" controlId="validationCustom03">
         <Form.Label>Province</Form.Label>
         <Form.Control type="text"
         value={province}
               onChange={(e)=>setProvince(e.target.value)}
          placeholder="Province" required />
         <Form.Control.Feedback type="invalid">
           Please provide a valid province.
         </Form.Control.Feedback>
       </Form.Group>
       </Row>
       <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom07">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control type="date"
          value={dateOfBirth}
                      onChange={(e)=>setDateOfBirth(e.target.value)}
           placeholder="Province" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid DOB.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom08">
          <Form.Label>Gender</Form.Label>
          <FormSelect value={gender} onChange={(e)=>setGender(e.target.value)}>
          <option value=""></option>
           <option value="Male">Male</option>
           <option value="Female">Female</option>
          </FormSelect>
          <Form.Control.Feedback type="invalid">
           Gender value is required
          </Form.Control.Feedback>
        </Form.Group>
        </Row> 
        
          
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Bio</Form.Label>
            <Form.Control as="textarea" rows={5}
              type="text"
              value={bio}
              onChange={(e)=>setBio(e.target.value)}
              placeholder="Write a summary about yourself, your skills, experience, etc ..."
              required
            />
           
        </Form.Group>
      <Button type="submit">Update Info</Button>
    </Form>
                    
           
    </div>
  )
}

export default ProfileEditUser