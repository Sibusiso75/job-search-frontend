import React, {useState, useEffect} from 'react'
import {FaHome, FaInfoCircle, FaSearchLocation} from "react-icons/fa"
import { useNavigate, useParams } from 'react-router-dom'
import {  MdBookmarkAdded, MdBookmarkRemove, MdOutlineBookmarkAdd, MdOutlineBookmarkAdded, MdWork } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { getJob } from '../../../../redux/slices/jobSlice'

function EmployerJobs() {
 const jobs = useSelector(state=>state.jobs.jobs)
 let {id}=  useParams() 
 
  let navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
   const fetchJobs = async ()=>{
    const response = await fetch("http://localhost:5000/jobs")
    const data = await response.json()
    dispatch(getJob(data))
   }
   fetchJobs()
  }, [])
  
  return (
    <div className='d-flex'>
      <div  style={{margin:"30px"}}>

      <button onClick={()=>navigate("/addJob")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        Add new jobs
      </button>
      <h2>Jobs</h2>

       {
         jobs.map((j)=>{
          const {id, title,jobType,numberOfPeopleToHire,locationThatBestDescriptionsTheJob,EmployeesResideInJoblocation, description,level, posted,url, province, area}=j;
           return <div key={id} >
 <p> <b>Job Title - </b><MdWork/> {title}</p>
 <p><b>Job Level - </b>{level}</p>
 <p> <b>Job Location - </b><FaSearchLocation/> {province}, {area}</p>
 <br />
 <p> <b><FaInfoCircle/> Job description </b></p>
 <p>{description}</p>
 <p><b>Posted in </b>{posted}</p>
 <p><b>Job Type </b>{jobType}</p>

 

 <button onClick={()=>navigate(`editJob/${id}`)}>Edit Info</button>
                       

                      <hr/>
                              
                         
            </div>
        })
      }
             </div>
      </div>
  )
}

export default EmployerJobs