import React, {useState,useEffect} from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { getJob } from '../../../../redux/slices/jobSlice'
import { saveJob } from '../../../../redux/slices/savedJobsSlice'
import { getUser,userLoggedIn } from '../../../../redux/slices/userslice'
import {FaRProject,FaSearchLocation, FaUserCircle, FaHome, FaSearch, FaChevronRight, FaAlignJustify, FaAlignLeft, FaWindowClose, FaAlignRight, FaDoorClosed, FaRegWindowClose, FaStickyNote, FaInfo, FaInfoCircle, FaGraduationCap, FaUserGraduate, FaTimesCircle, FaClock, FaBirthdayCake, FaLocationArrow, FaCalendar, FaNetworkWired} from 'react-icons/fa'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap"
import {MdSave, MdAlignHorizontalLeft, MdAlignVerticalCenter, MdArrowDropDown, MdArticle, MdCloseFullscreen, MdDarkMode, MdOutlineAlignVerticalCenter, MdOutlineLogout, MdTab, MdWork, MdReport, MdWorkHistory, MdInterests, MdFeedback, MdLogout, MdJoinFull, MdLocalActivity, MdLocalAirport, MdWorkOutline, MdLocationOn, MdLocationCity, MdLocationOff } from 'react-icons/md'
import { toast } from 'react-toastify'

function Home() {
  
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(state=>state.users.users)
  const jobs = useSelector(state=>state.jobs.jobs)
  const loggedIn = useSelector(state=>state.users.loggedIn)
  const [show, setShow] = useState(false)
  const [query, setQuery]= useState("")
  const [username, setUsername] = useState("")
  const [showSave, setShowSave]= useState(false)
  const [id, setId] = useState("")
  const [userId, setUserId] = useState("")


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [savedJobs, setSavedJobs] = useState([])
//   const [title, setTitle] = useState("")
// const [numberOfPeopleToHire, setNumberOfPeopleToHire] = useState("")
// const [description, setDescription] = useState("")
// const [jobLocation, setJobLocation] = useState("")
// const [reside, setReside] = useState("")
// const [jobUrl, setJobUrl] = useState("")
// const [province, setProvince]= useState("")
// const [area, setArea]= useState("")
// const [jobType, setJobType] = useState("")
// const [email, setEmail] = useState("")



axios.defaults.withCredentials=true;
async function handleLogOut(e){
    e.preventDefault()
    const response = await axios.get("http://localhost:5000/logout")
      if(response.data.status){
        dispatch(userLoggedIn(false))
          navigate("/login")
    
      }
  }
  // const {search}= useLocation()
    // const [categories, setCategories]= useState("")
// const searchParams =new URLSearchParams(search)
// const category = searchParams.get('category ') || 'all'
// const q = searchParams.get('query') || 'all'
// const price = searchParams.get('price') || 'all'
// // const rating = searchParams.get('rating') || 'all'
// const order = searchParams.get('order') || 'newest'
// const page = searchParams.get('page') || 1







    // function handleSubmit(e){
    //   e.preventDefault()
    //   navigate(query?`/search?query=${query}`:"/home")
    // }

    // const category = searchParams.get('category') || 'all'
    // const q = searchParams.get('query') || 'all'
    // const price = searchParams.get('price') || 'all'
    // // const rating = searchParams.get('rating') || 'all'
    // const order = searchParams.get('order') || 'newest'
    // const page = searchParams.get('page') || 1
//     useEffect(() => {
//       const fetchData = async ()=>{
// try {
//    const response = await axios.get(`http://localhost:5000/jobs/search?page=${page}&query=${q}&category=${category}&price=${price}&order=${order}`)
//     dispatch(getJob(response.data))

// } catch (error) {
//        console.log(error) }}
//   fetchData()
// }, [page, q, category, order,price])



// useEffect(() => {
//   const fetchCategories = async ()=>{
// try {
// const response = await axios.get(`http://localhost:5000/jobs/categories`)
//  setCategories(response.data)
// } catch (error) {
//    console.log(error) }}
// fetchCategories()
// }, [])

// https://job-search-api-n5ob.onrender.com/jobs
useEffect(()=>{
  axios.get("http://localhost:5000/verify")
  .then(res=>{
   if(res.data.status){
     dispatch(userLoggedIn(res.data.status))
     setUsername(res.data.username)
     setId(res.data.id)
   }
   
  })
 },[])
 useEffect(() => {
   const fetchJobs = async ()=>{
    const response = await fetch("http://localhost:5000/allJobs")
    const data = await response.json()

    dispatch(getJob(data))
   }
   fetchJobs()
 }, [])

//  function showingSave(){
//   setShowSave(!showSave)
//  }

//  async function save(e){
//   e.preventDefault()
//   try {
//     const response = await axios.post("https://job-search-api-n5ob.onrender.com/save-job",{
//       userId,username
//       })

//     if(response.data.status){
//       setSavedJobs(jobs)
//       dispatch(saveJob(response.data))
//       toast.success(response.data.message)
//       console.log(response.data)
//     }
//     else {
//       navigate("/login")
//     }
//   } catch (error) {
//     toast.error("error")
//     console.log(error)
//   }
// }




//  function getFilterUrl(filter){
//    const filterPage = filter.page || page
//   const filterCategory = filter.category || category
//     const filterQuery = filter.query || q
//     const filterPrice =filter.price  || price
//     // return `http://localhost:5000/jobs/search?page=${filterPage}&query=${filterQuery}&category=${filterCategory}&price=${filterPrice}&order=${filterOrder}`
//     // const rating = searchParams.get('rating') || 'all'
//     const filterOrder = filter.order || order
    
//     return `/jobs/search?page=${filterPage}&query=${filterQuery}&category=${filterCategory}&price=${filterPrice}&order=${filterOrder}`
//  }

 
  return (
    <div>
        {/* <header className="cartNav">
        <input type="text" onChange={(e)=>setQuery(e.target.value)} 
              
              placeholder='search by job title, province and city ...'/>
        <Link to="/" style={{borderBottom:"2px double white"}} ><FaHome/> Home </Link>
        <Link to="/posts"><MdArticle/> Posts</Link>
          {/* <Link to="/savedJobs"> <MdWork/> Saved Jobs</Link> */}
       {/* <br />
                <div className='alignRight' onClick={()=>setShow(!show)} >
                                 {show?<div><FaRegWindowClose/></div>:<div><FaAlignJustify/></div>} 
                            </div> */}
      {/* </header>  */}
      {/* 0686852083 */}

      <Navbar bg="dark" >
      <Form className="d-flex">
            <Form.Control
            onChange={(e)=>setQuery(e.target.value)}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
      <Navbar.Toggle  style={{display:"flex", justifyContent:"spaceAround"}}/>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px',gap:"0.3rem",display:"flex"}}
          >
            <Link to="/"               className="me-2"
style={{color:"white",borderBottom:"2px groove white"}}><FaHome/> Home </Link>
            <Link to="/posts" className="me-2" style={{color:"white"}}><MdArticle/> Posts </Link>
           
           
          </Nav>
         
          <Button className="me-2" variant="outline-success" onClick={handleShow}><FaAlignJustify/></Button>

      
    </Navbar>
      <Offcanvas show={show} className="cartNav">
        <Offcanvas.Header closeButton>
          <Button onClick={handleClose}><FaRegWindowClose/></Button>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {show?  <div >
      {loggedIn?<div style={{display:"flex",gap:"2rem", flexDirection:"column"}}>
      <Link to={`/profileEditUser/${id}`} style={{color:"lightgray"}}><FaUserCircle /> Personal Information<FaChevronRight style={{float:"right"}}/></Link>
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

      
   
      {/* <div>
        
        
        <h3>Department</h3>
        <ul>
        <li>
        <Link className={'all'===category?'text-bold':''}
        to={getFilterUrl({category:'all'})}
        >
        Any
        </Link>
        </li>
          {
            categories.map((c)=>(
              <li key={c}>
                <Link className={c===category?'text-bold':''}
                to={getFilterUrl({category:c})}
                >
                {c}
                
                </Link>
                </li>
                ))
              }
              </ul>
              
              </div>
      <div>
        <h3>Salary</h3>
        <ul>
          <li>
            <Link className={'all'===salary?'text-bold':''}
            to={getFilterUrl({salary:'all'})}>Any</Link>

          </li>
          {
            salaries.map((s)=>(
              <li key={s.value}>
                <Link className={s.value===salary?'text-bold':''}
                to={getFilterUrl({salary:s.value})}>
                    {s.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div> */}
      <br />
        
         {/* <Row className="justify-content-between mb-3">
          <Col md={6}> */}
            {/* <div> */}
              {/* {countJobs===0? 'No':countJobs} Results
              {query!=='all'&& ':' + query} 
              {category!=='all'&& ':' + category} 
              {salary!=='all'&& ': Salary' + salary} 
            
               */}
             
              {/* <button onClick={handleSubmit}><FaSearch/></button> */}
              
               {/* </div> */}

          {/* </Col> */}
          {/* <Col className="text-end">
            Sort By {''}
            <select value={order} onChange={(e)=>{navigate(getFilterUrl({order:e.target.value}))}}>
               <option value="newest">newest</option>
                 <option value="lowest">lowest</option>
                 <option value="highest">highest</option>
         </select>
          </Col> */}
         {/* </Row> */}

        
        <div style={{display:"flex",gap:"1rem"
       , flexWrap:"wrap",
}}>
  {/* {jobs.length===0 && <h3>No jobs found</h3>} */}
            {
                jobs.filter((job)=>{
                  return job.title.toLowerCase().includes(query.toLowerCase()) ||
                  job.province.toLowerCase().includes(query.toLowerCase())||
                 job.area.toLowerCase().includes(query.toLowerCase())
                  
                }).reverse().map((job)=>{
                      return  <div key={job.id} className='itemsContainer'>
                      <div  style={{display:"flex", flexDirection:"column"}}  onClick={()=>navigate(`/job/${job.id}`)}>
                                    <p><MdWork/> Job title - <b>{job.title}</b></p>
                                    <p><MdLocationCity/> <b> {job.jobType}</b></p>
                                    <p><MdLocationOn/> {job.province}, {job.area}</p>
                                    {/* <p><MdWork/> {job.jobLocation}</p> */}

                                    <p><FaClock/> Posted in {job.createdAt}</p>
                                   
                                  </div>
                                  {/* <div style={{display:"flex", justifyContent:"flex-end"}}>
            
                                     <BsThreeDotsVertical style={{fontSize:"25px"}} onClick={showingSave} /> 
                                  
                                   {showSave?
                                    <div>
                                       <button onClick={save} style={{background:"black",color:"white"}}> Save job</button>
                                  </div>:null}  
            
                                      </div> */}
                                </div>                            
                })
            }
            {/* {[...Array(pages).key()].map((x)=>(
              <Link key={x+1} className='mx-1' to={getFilterUrl({page:x+1})}>
                <button className={Number(page)===x+1?"text-bold":''}>
                    {x+1}
                </button>
              </Link>
            ))} */}
            

        </div>
        <br /><br />



       
    </div>
  )
}

export default Home