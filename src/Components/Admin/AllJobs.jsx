import React, {useState, useEffect} from 'react'
import {FaHome, FaPlus} from "react-icons/fa"
import AdminNav from './AdminNav'
import { getJob } from '../../redux/slices/jobSlice'
import {  useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function AllJobs() {
    const dispatch = useDispatch()
    const jobs = useSelector(state=>state.jobs.jobs)
    let navigate = useNavigate()
    useEffect(() => {
      const fetchData = async ()=>{
try {
   
   const response = await fetch("http://localhost:5000/allJobs")
   const jobsData = await response.json()
   dispatch(getJob(jobsData))
} catch (error) {
       console.log(error)
   }

  }
  fetchData()
}, [])
 
  return (
    <div className='d-flex' >
        <AdminNav/>
        {/* <h2 style={{textAlign:"center"}}>{jobs.length} jobs</h2> */}
       <div>

          <div style={{margin:"10px"}}>
<button onClick={()=>navigate("/admin/addJob")} 
className='btn btn-sm btn-success'>
  Add new job <FaPlus/>
</button>
</div>
          <table className='table'>

                <thead >
                    <tr>
                        <th >ID</th>
                        <th>UserId</th>
                        <th>Posted By</th>
                        <th >Title</th>
                        <th>Number of People to hire</th>
                        <th>Description</th>
                        <th>Job location</th>
                        <th>Reside In</th>
                        <th>Job url</th>
                        <th>Job Type</th>
                        <th>Job town</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
       jobs.filter((j)=>{
        return j
       }).reverse().map((j)=>{
          const {id,userId, username,title,numberOfPeopleToHire,description,jobLocation,reside,jobUrl,province,area,jobType
          }=j;
            return <tr key={id} >
<td>{id}</td>
<td>{userId}</td>
<td>{username}</td>
<td>{title}</td>
<td>{numberOfPeopleToHire}</td>
<td>{description}</td>
<td>{jobLocation}</td>
<td>{reside}</td>
<td>{jobUrl}</td>
<td>{jobType}</td>
<td >{province}, {area}</td>


<td style={{display:"flex",gap:"0.5rem"}}>
<button onClick={()=>navigate(`/editJob/${id}`)}className='btn btn-sm btn-secondary me-2'>Edit</button>
                                <button className='btn btn-sm btn-danger'>Delete</button>
</td>
            </tr>
        })
      }
                </tbody>
            </table>

        
      {/* <button onClick={()=>navigate("/admin")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
      <FaHome/> Back home
    </button> */}
      {/* <h2>Job</h2>
      <button onClick={()=>navigate("/admin/addJob")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
      <FaPlus/> Add new job
    </button> */}
       
    </div>
    </div>
  )
}

export default AllJobs