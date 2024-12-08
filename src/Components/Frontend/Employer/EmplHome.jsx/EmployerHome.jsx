import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
// import { getJob } from '../../../../redux/slices/jobSlice'
import { getUser } from '../../../../redux/slices/userslice'
import { loggedIn,getEmployer } from '../../../../redux/slices/employerslice'
import { FaUserCircle, FaHome, FaWindowClose, FaAlignJustify, FaChevronRight, FaWindowMaximize, FaWindowMinimize, FaRegWindowClose } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { MdArticle, MdOutlineLogout, MdWork } from 'react-icons/md'
import { BsJustify, BsJustifyLeft } from 'react-icons/bs'


function EmployerHome() {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  // const jobs = useSelector(state=>state.jobs.jobs)
  const users = useSelector(state => state.users.users)
  // const loggedIn = useSelector(state => state.employers.loggedIn)
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [show, setShow] = useState(false)
  const [filterByExperience, setFilterByExperience] = useState(0)
  const [username, setUsername] = useState("")


  useEffect(()=>{
    const verifyUser = async ()=>{

      const res = await axios.get("http://localhost:5000/verify-employer")
      if(res.data.status){
        dispatch(loggedIn(res.data.status))
        setUsername(res.data.username)
        
        const response = await axios.get("http://localhost:5000/users")
        dispatch(getUser(response.data))
      }
      else{
        navigate("/employerLogin")
      }
    }
    verifyUser()
  },[])
 
  
  //  useEffect(() => {
  //    const fetchJobs = async ()=>{
  //     const response = await fetch("http://localhost:5000/jobs")
  //     const data = await response.json()
  //     dispatch(getJob(data))
  //    }
  //    fetchJobs()
  //  }, [])

  return (
    <div>
      <header className="cartNav">

        <Link to="/articles" style={{ color: "white" }}><FaHome /> Home</Link>
        <div onClick={() => setShow(!show)} style={{ color: "white", position: "absolute", right: "5px" }}>
          {show ? <FaRegWindowClose /> : <FaAlignJustify />}
        </div>

      </header>
      {show ? <div style={{
        position: "absolute", right: "2px", display: "flex", flexDirection: "column",
        gap: "1rem", float: "right", background: "black", color: "white", marginRight: "0px", width: "300px", padding: "10px"
      }}>
        <Link to="/employerProfile/2"><FaUserCircle /> {username} <FaChevronRight style={{ float: "right" }} /></Link>
        <Link to="/employerArticles"><MdArticle /> Articles  <FaChevronRight style={{ float: "right" }} /></Link>
        <Link to="/employerJobs/1"> <MdWork /> My Jobs<FaChevronRight style={{ float: "right" }} /></Link>
        <Link to="/employerLogin"> <MdOutlineLogout /> Log out  <FaChevronRight style={{ float: "right" }} /></Link>


      </div>
        : null
      }
      <br /><br />

      <div className="d-flex">
        {/* <h2>You are an employer</h2><br /> */}
        <input type="text" onChange={(e) => setSearch(e.target.value)}
          placeholder='search ...' />

        <select onChange={(e) => setFilterCategory(e.target.value)}>

          <option value="Filter by category">Filter by qualification level</option>

          <option value="Degree">Degree</option>
          <option value="Diploma">Diploma</option>
          <option value="Higher Certicate">Higher Certicate</option>
          <option value="Matric">Matric</option>
        </select>
        <select onChange={(e) => setFilterByExperience(e.target.value)}>
          <option value="Filter by experience">Filter by experience</option>
          <option value="0">No experience</option>
          <option value="1 year">1 year</option>
          <option value="2 years">2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5+">5+ years</option>

        </select>
      </div>
      <div style={{
        display: "flex", gap: "1rem"
        , flexWrap: "wrap", flexDirection: "column",
        margin: "10px"
      }}>
        {
          users.filter((user) => {
            return user.username.toLowerCase().includes(search.toLowerCase())

          }).map((user) => {

            return <div key={user.id}
            >

              <span >
               <FaUserCircle onClick={() => navigate(`/profileView/${user.id}`)} style={{ fontSize: "50px" }} /><> <b>{user.username} </b></>
              </span>


            </div>
          })
        }

      </div>
    </div>
  )
}

export default EmployerHome