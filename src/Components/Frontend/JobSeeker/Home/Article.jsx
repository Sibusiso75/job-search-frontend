import React, { useState,useEffect } from 'react'
import { FaUserCircle, FaHome, FaArrowAltCircleLeft, FaComment, FaWindowClose, FaAlignJustify, FaChevronRight, FaInfoCircle, FaUserGraduate } from 'react-icons/fa';
import { Link,  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticle,addArticle } from '../../../../redux/slices/articleSlice';
import ArticleProps from "./ArticleProps"
import { toast } from 'react-toastify';
import {Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap"
import {MdReport,MdLogout,MdWorkHistory,MdInterests,MdFeedback, MdArticle, MdOutlineLogout, MdOutlinePostAdd, MdPostAdd, MdWork } from 'react-icons/md';
import axios from 'axios';
import { userLoggedIn } from '../../../../redux/slices/userslice';

function Article() {
  const loggedIn = useSelector(state=>state.users.loggedIn)
  const dispatch = useDispatch()
  // const [post, setPost] = useState("")
  const articles = useSelector(state => state.articles.articles)
  let navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [id, setId] = useState("")
  const [query, setQuery]= useState("")
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
  axios.get("http://localhost:5000/verify")
  .then(res=>{
    if(res.data.status){
      setId(res.data.id)

      setUsername(res.data.username)
    }
    
  })
},[])
// async function postSubmit(e){
//   e.preventDefault()
//   try {
    
//     const res = await axios.post("http://localhost:5000/addPost", {post})
//     if(res.data.status){
//       dispatch(addArticle(res.data))
//       toast.success(res.data.message)
//     }
//     else{
//       toast.error("error")
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:5000/articles")
        const data = await response.json()
        dispatch(getArticle(data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchArticles()
  }, [])

return (
  <div>
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
style={{color:"white"}}><FaHome/><span > Home</span> </Link>
            <Link to="/posts" className="me-2" style={{color:"white",borderBottom:"2px groove white"}}><MdArticle/><span> Posts</span> </Link>
           
           
          </Nav>
         
          <Button className="me-2" variant="outline-success" onClick={handleShow}><FaAlignJustify/></Button>

      
    </Navbar>
      <Offcanvas show={show} className="cartNav">
        <Offcanvas.Header closeButton>
          <Button bg="secondary" onClick={handleClose}><FaWindowClose/></Button>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {show?  <div >
      {loggedIn?<div style={{display:"flex",gap:"2rem", flexDirection:"column"}}>
      <Link to={`/profile/${id}`} style={{color:"lightgray"}}><FaUserCircle /> Personal Information<FaChevronRight style={{float:"right"}}/></Link>
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
        <div>
        <br />

          {/* <div className='post'>
          <textarea onChange={(e)=>setPost(e.target.value)} className="txtArea"placeholder="What's on your mind?" />
              <button onClick={loggedIn?postSubmit:()=>navigate("/login")} style={{height:"fit-content",background:"rgb(0,0,15)",marginTop:"15px",padding:"10px",borderRadius:"5px",color:"white"}}>
              Post 
              </button>
          </div> */}
           {
            articles.filter((a)=>{
            return a.post.toLowerCase().includes(query.toLowerCase())
            || a.name.toLowerCase().includes(query.toLowerCase())
            }).reverse().map((article)=>{
              return <ArticleProps key={article.id} {...article}/>
            })
          }
        
        </div>



  
    </div>
  )
}

export default Article