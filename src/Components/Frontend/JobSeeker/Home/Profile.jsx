import React,{useState, useEffect} from 'react'
import { getUser, userLoggedIn } from '../../../../redux/slices/userslice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MdEmail, MdLocationPin } from 'react-icons/md'
import { FaArrowAltCircleLeft, FaBirthdayCake, FaMale, FaPhoneAlt } from 'react-icons/fa'
import axios from "axios"
import { FaUserCircle } from 'react-icons/fa'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Profile() {
    const loggedIn = useSelector(state=>state.users.loggedIn)
    let navigate = useNavigate()
    const {id} = useParams()
    const [email, setEmail]= useState("")
    const [username, setUsername]= useState("")
    const [highestGradePassed, setHighestGradePassed] = useState("")
    const [schoolName, setSchoolName] = useState("")    
        const [yearObtainedOne, setYearObtainedOne] = useState("")
        const [yearObtainedTwo, setYearObtainedTwo] = useState("")
        const [institutionName, setInstitutionName] = useState("")
        const [jobTitle, setJobTitle] = useState("")
        const [companyName, setCompanyName] = useState("")
        const [yearsOfExperience, setYearsOfExperience] = useState(null)
        const [startDate, setStartDate] = useState("")
        const [endDate, setEndDate] = useState("")
        const [courseName, setCourseName] = useState("")

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
        
          }
      } 

      useEffect(()=>{
        if(loggedIn==false){
            navigate("/login")
        }
      },[])
      useEffect(()=>{
       const fetchDetails = async ()=>{
        const response = await axios.get(`http://localhost:5000/profile/${id}`)
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

            
       }
       fetchDetails()
      },[])

  return (
    <div style={{margin:"40px"}}>
            <Button bg="secondary" onClick={()=>navigate(`/profileEditUser/${id}`)}><FaArrowAltCircleLeft/></Button>

         <div style={{display:"flex",flexDirection:"column", gap:"0.3rem"}}>
            <div style={{display:"flex",gap:"0.3rem"}}>

           <FaUserCircle style={{fontSize:"100px"}}/>
           <h3 style={{display:"flex", alignItems:"center"}}>{username}</h3>
            </div>
            {/* <p><b>About - </b>I am a web developer</p> */}
            <h6 style={{textDecoration:"underline"}}>Basic Information</h6>
            <p><MdEmail/> {email}</p>
            <p><FaPhoneAlt/> 0631008792</p>
            <p><MdLocationPin/>Uitenhage, Eastern Cape</p>
            <p><FaBirthdayCake/> 1997-03-23</p>
            <p><FaMale/> Male</p>
            <Link style={{textDecorationLine:"underline"}} to={`/profileEditUser/${id}`}>Edit</Link>
          <hr />
          <h5 style={{textDecoration:"underline"}}>Basic Education</h5>
          <p><b>High School Name -</b> {schoolName}</p>
          <p><b>Highest Grade Passed -</b> {highestGradePassed}</p>
          <p><b>Year Obtained -</b> {yearObtainedOne}</p>
          <br />
          <h5 style={{textDecoration:"underline"}}>Tertiary Education</h5>
          <p><b>Institution name -</b> {institutionName}</p>
          <p><b>Qualification name -</b> {courseName}</p>
          <p><b>Year Obtained -</b> {yearObtainedTwo}</p>
          <Link style={{textDecorationLine:"underline"}} to={`/education/${id}`}>Edit</Link>

          <hr/>
          <h5 style={{textDecoration:"underline"}}>Work Experience</h5>
          <p><b>Job Title-</b> {jobTitle}</p>
          <p><b>Company name -</b> {companyName}</p>
          <p><b>Years of experience-</b> {yearsOfExperience}</p>
          <p><b>Started working at {companyName}</b> in {startDate}</p>
          <Link style={{textDecorationLine:"underline"}} to={`/workHistory/${id}`}>Edit</Link>


        

          </div>
    </div>
  )
}

export default Profile