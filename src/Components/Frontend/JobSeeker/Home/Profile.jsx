import React,{useState, useEffect} from 'react'
import { getUser, userLoggedIn } from '../../../../redux/slices/userslice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MdEmail, MdLocationPin, MdWork } from 'react-icons/md'
import {BsPlus} from "react-icons/bs"
import { FaArrowAltCircleLeft, FaBirthdayCake, FaEdit, FaFemale, FaGraduationCap, FaHome, FaMale, FaPhoneAlt, FaUserGraduate } from 'react-icons/fa'
import axios from "axios"
import { FaUserCircle } from 'react-icons/fa'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getSkill } from '../../../../redux/slices/skillSlice'

function Profile() {
  const {id} = useParams()
    const loggedIn = useSelector(state=>state.users.loggedIn)
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const skills = useSelector(state=>state.skills.skills)
    const [email, setEmail]= useState("")
    const [username, setUsername]= useState("")
    const [highestGradePassed, setHighestGradePassed] = useState(null)
    const [schoolName, setSchoolName] = useState(null)    
        const [yearObtainedOne, setYearObtainedOne] = useState(null)
        const [yearObtainedTwo, setYearObtainedTwo] = useState(null)
        const [institutionName, setInstitutionName] = useState(null)
        const [jobTitle, setJobTitle] = useState(null)
        const [companyName, setCompanyName] = useState(null)
        const [yearsOfExperience, setYearsOfExperience] = useState(null)
        const [startDate, setStartDate] = useState(null)
        const [endDate, setEndDate] = useState(null)
        const [town, setTown] = useState(null)
    const [postalCode, setPostalCode] = useState("")
    const [province, setProvince] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [gender, setGender] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [bio, setBio] = useState(null)


        const [courseName, setCourseName] = useState(null)

    const [validated, setValidated] = useState(false)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   

      // useEffect(()=>{
      //   if(loggedIn==false){
      //       navigate("/login")
      //   }
      // },[])
      useEffect(()=>{
       const fetchDetails = async ()=>{
        const response = await axios.get(`https://job-search-api-wyvc.onrender.com/profile/${id}`)
        setUsername(response.data.username)
        setEmail(response.data.email)
       setHighestGradePassed(response.data.highestGradePassed)
        setSchoolName(response.data.schoolName)
         setYearObtainedOne(response.data.yearObtainedOne)
          setYearObtainedTwo(response.data.yearObtainedTwo)
            setInstitutionName(response.data.institutionName)
            setJobTitle(response.data.jobTitle)
             setCompanyName(response.data.companyName)
             setYearsOfExperience(response.data.yearsOfExperience)
             setStartDate(response.data.startDate)
             setEndDate(response.data.endDate)
             setCourseName(response.data.courseName)
             setTown(response.data.town)
             setPostalCode(response.data.postalCode)
             setProvince(response.data.province)
             setDateOfBirth(response.data.dateOfBirth)
             setGender(response.data.gender)
             setPhoneNumber(response.data.phoneNumber)
             setBio(response.data.bio)




            
       }
       fetchDetails()
      },[])

      useEffect(()=>{
        try {
          const fetchSkills = async ()=>{
              const response = await axios.get(`https://job-search-api-wyvc.onrender.com/mySkills/${id}`)
              dispatch(getSkill(response.data))
          }
          fetchSkills()
        } catch (error) {
          console.log(error)
        }
      },[])
      
  return (
    <div style={{margin:"40px"}}>
            <Button bg="secondary" onClick={()=>navigate(`/profileEditUser/${id}`)}><FaArrowAltCircleLeft/></Button>
            <br /><br />
         <div style={{padding:"10px", gap:"0.3rem",
          boxShadow:"-1px -1px 3px 1px gray"}}>

            <div style={{display:"flex"}}>

           <FaUserCircle style={{fontSize:"100px"}}/>
           <h3 style={{display:"flex", alignItems:"center"}}> {username}</h3>

            </div>
           <p>{bio==""?null:bio} </p>
            </div>
          <br />
         <div style={{padding:"10px", gap:"0.3rem",
          boxShadow:"-1px -1px 3px 1px gray"}}>

            <h6 style={{textDecoration:"underline"}}>Basic Information</h6>
            <p><MdEmail/> {email}</p>
            <div>{phoneNumber==null?<p><FaPhoneAlt/> - Not specified</p>:<p><FaPhoneAlt/> {phoneNumber}</p>}</div>
            <p><FaHome/> {town}, {postalCode}, {province}</p>
            <div>{dateOfBirth==null?<p><FaBirthdayCake/> - Not specified</p>:<p><FaBirthdayCake/> {dateOfBirth}</p>}</div>
            <p>{gender==null?'Gender - Not specified': gender=='Male'?<span><FaMale/> </span>:<span><FaFemale/> </span>} {gender}</p>
            <Link style={{textDecorationLine:"underline"}} to={`/profileEditUser/${id}`}>Edit</Link>
         </div>
          <br/>
          <div style={{padding:"10px", gap:"0.3rem",
          boxShadow:"-1px -1px 3px 1px gray"}}>
          <h5 style={{textDecoration:"underline"}}>Basic Education</h5>
            {schoolName==null?<div>
              <button  className='btn btn-sm btn-success me-2' onClick={()=>navigate(`/education/${id}`)}>Add basic education <BsPlus/></button></div>:
              <p> <FaUserGraduate/> Went to <b>{schoolName}</b> in {yearObtainedOne} 
              <br /><br />
          <div>{highestGradePassed==null?<p>Highest Grade Passed - Not specified</p>:<div>Highest Grade Passed - <b>{highestGradePassed}</b></div>}</div>
                <Link style={{textDecorationLine:"underline"}} to={`/education/${id}`}>
      Edit
      </Link>
              </p>}
              </div >
          <br />
          <div style={{padding:"10px", gap:"0.3rem",
          boxShadow:"-1px -1px 3px 1px gray"}}>

          <h5 style={{textDecoration:"underline"}}>Tertiary Education</h5>
          <div>{(courseName==(null) && institutionName==null)?<div>          <button  className='btn btn-sm btn-success me-2' onClick={()=>navigate(`/education/${id}`)}>Add tertiary education <BsPlus/></button>
          </div>:<div><FaGraduationCap/> Studied {courseName} at <b>{institutionName}</b> in {yearObtainedTwo}   <Link style={{textDecorationLine:"underline"}} to={`/education/${id}`}>Edit</Link></div>}</div>
        
          </div>

          <hr/>
          <div style={{padding:"10px", gap:"0.3rem",
          boxShadow:"-1px -1px 3px 1px gray"}}>

          <h5 style={{textDecoration:"underline"}}>Work Experience</h5>
          <div>{(jobTitle==null && companyName==null)? <div><button  className='btn btn-sm btn-success me-2' onClick={()=>navigate(`/workHistory/${id}`)}>Add work experience <BsPlus/></button></div>:<div><MdWork/> {jobTitle} at  {companyName} in {startDate}
          <br />
          <p><b>Years of experience-</b> {yearsOfExperience}</p>

          <Link style={{textDecorationLine:"underline"}} to={`/workHistory/${id}`}>Edit</Link>
          </div>

          }</div>
          </div>
     <hr />
          <ol style={{padding:"10px", gap:"0.3rem",
          boxShadow:"-1px -1px 3px 1px gray"}}>
        <h3 style={{textDecoration:"underline"}}>Skills</h3>
         {
          skills.length==0?
          <div>
          <button className='btn btn-sm btn-success me-2' onClick={()=>navigate(`/skills/${id}`)}>Add Skills <BsPlus/></button>
          </div>
          :
          <div>
 {
            skills.map((skill)=>{
                return <li style={{margin:"30px"}}key={skill.id}>
                     <span>
                        {skill.skillName} - {skill.skillLevel} 
                        </span>
                    
                </li>
            })
          }
           <Link style={{textDecorationLine:"underline"}} to={`/skills/${id}`}>
      Edit
      </Link>
          </div>
         }
         
     
      <hr />
      </ol>

    </div>
  )
}

export default Profile