import React, {useState, useEffect} from 'react'
import { FaChevronRight, FaUserCircle, FaUserGraduate,FaArrowAltCircleDown, FaArrowAltCircleLeft, FaArrowLeft, FaClock, FaHome, FaInfoCircle, FaLevelUpAlt, FaRegQuestionCircle, FaSearchLocation} from "react-icons/fa"
import {BsThreeDots, BsPlus, BsThreeDotsVertical} from "react-icons/bs"
import {Button, Container,Modal, Form, Nav,Col, Navbar,FormSelect, NavDropdown, Offcanvas} from "react-bootstrap"

import {MdWorkHistory, MdInterests, MdWork, MdLogout, MdReport, MdFeedback ,MdDataArray, MdLocationCity, MdLocationOn, MdOutlineLocationCity, MdReadMore, MdRecentActors, MdRecommend, MdSave} from "react-icons/md"
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getJob } from '../../../redux/slices/jobSlice'
import { saveJob } from '../../../redux/slices/savedJobsSlice'
import axios from "axios"
import { userLoggedIn } from '../../../redux/slices/userslice'
import { toast } from 'react-toastify'
import { addReport } from '../../../redux/slices/reportSlice'

function Job() {
  const loggedIn = useSelector(state=>state.users.loggedIn)

  let {id} = useParams()
 const jobs = useSelector(state=>state.jobs.jobs)


 const user = jobs.find((j)=>j.id==id)
 const [showForm, setShowForm]= useState(false)
 const [username, setUsername] = useState(user.username)
  const [showSave, setShowSave]= useState(false)
  const [userId, setUserId] = useState(user.userId)
  const [jobId, setJobId] = useState(id)

  const [title, setTitle] = useState(user.title)
const [numberOfPeopleToHire, setNumberOfPeopleToHire] = useState(user.numberOfPeopleToHire)
const [description, setDescription] = useState(user.description)
const [jobLocation, setJobLocation] = useState(user.jobLocation)
const [reside, setReside] = useState(user.reside)
const [jobUrl, setJobUrl] = useState(user.jobUrl)
const [province, setProvince]= useState(user.province)
const [area, setArea]= useState(user.area)
const [jobType, setJobType] = useState(user.jobType)
const [createdAt, setCreatedAt] = useState(user.createdAt)
const [reportMessage, setReportMessage] = useState("") 
const [showModal, setShowModal] = useState(false)
 const handleCloseModal = () => setShowModal(false);
 const handleShowModal = () => setShowModal(true);



 const dispatch = useDispatch()
//  https://job-search-api-n5ob.onrender.com - Production
// http://localhost:5000 -
  let navigate = useNavigate()

 
  // https://job-search-api-n5ob.onrender.com/jobs

  // useEffect(() => {
  //   const fetchJob = async ()=>{
  //     const response = await fetch("http://localhost:5000/allJobs")
  //     const data = await response.json()
  //     dispatch(getJob(data))
  //   }
  //   fetchJob()
  // }, [])
  async function save(e){
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:5000/saveJob/${id}`,{ userId,jobId,
        title,numberOfPeopleToHire,description,jobLocation,reside,jobUrl,province,area,jobType,
        username})
      if(response.data.status){
          
        dispatch(saveJob(response.data))
        toast.success(response.data.message)
        console.log(response.data)

      }
      else {
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function reportJob(e){
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:5000/addReport/${id}`,{ userId,jobId,
        reportMessage,title,numberOfPeopleToHire,description,jobLocation,reside,jobUrl,province,area,jobType,
        username})
      if(response.data.status){
          
        dispatch(addReport(response.data))
        toast.success(response.data.message)
        console.log(response.data)
        handleCloseModal()
      }
      else {
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }

  
  
  return (
    <div style={{margin:"30px"}}>
      <button onClick={()=>navigate("/")} 
      className='btn btn-sm btn-secondary me-2'>
        <FaArrowAltCircleLeft/> 
      </button>
     <br /><br />
      
     <p><MdWork/> Job title - <b>{title}</b></p>
                                    <p><MdLocationCity/> <b> {jobType}</b></p>
                                    <div>{province==""?null:area==""?null:<span><MdLocationOn/> {province}, {area}</span>}</div>
                                    <p><MdWork/> {jobLocation}</p>

                                    <p><FaClock/> Posted in {createdAt}</p>

 <br />
 <p> <b><FaInfoCircle/> About the job </b></p>
 <div  dangerouslySetInnerHTML={{__html:description}}/>
 
 
                        {/* <p><b>Posted in </b>{createdAt}</p> */}

                       
                          <a className='btn2' href={jobUrl}>
                          Apply
                        </a>
      
                        <div style={{display:"flex", gap:"0.5rem"}}>
                          <button onClick={save} style={{background:"black",color:"lightgray"}}>

                        Save job <MdSave />
                          </button>

                          <button className='btn btn-sm btn-secondary me-2' onClick={handleShowModal} >

                                Report Job <BsThreeDotsVertical/>
                          </button>
                        </div> 
                        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Report</Modal.Title>
        </Modal.Header>
        <Form onSubmit={reportJob}>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Report</Form.Label>
            <Form.Control as="textarea" rows={3}
              type="text"

              onChange={(e)=>setReportMessage(e.target.value)}
              placeholder="Write a report"
              autoFocus
              required
            />
           
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
        {/* <Button onClick={handleShowModal}>Report Job</Button> */}
    </div>
  )
}

export default Job