import React, {useState, useEffect} from 'react'
import {FaArrowAltCircleDown, FaArrowAltCircleLeft, FaArrowLeft, FaHome, FaInfoCircle, FaLevelUpAlt, FaRegQuestionCircle, FaSearchLocation} from "react-icons/fa"
import {BsThreeDots} from "react-icons/bs"

import {MdSaveAlt, MdDataArray, MdLocationCity, MdOutlineLocationCity, MdReadMore, MdRecentActors, MdRecommend, MdSave, MdWork} from "react-icons/md"

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { toast } from 'react-toastify'
import { updateReport } from '../../redux/slices/reportSlice'

function EditReport() {
  let {id} = useParams()
 const reports = useSelector(state=>state.reports.reports)
 const report = reports.find(r=>r.id==id)
 const [showSave, setShowSave]= useState(false)
  const [title, setTitle] = useState(report.title)
const [numberOfPeopleToHire, setNumberOfPeopleToHire] = useState(report.numberOfPeopleToHire)
const [description, setDescription] = useState(report.description)
const [jobLocation, setJobLocation] = useState(report.jobLocation)
const [reside, setReside] = useState(report.reside)
const [jobUrl, setJobUrl] = useState(report.jobUrl)
const [province, setProvince]= useState(report.province)
const [area, setArea]= useState(report.area)
const [jobType, setJobType] = useState(report.jobType)
const [email, setEmail] = useState(report.email) 
const [reportMessage, setReportMessage] = useState(report.reportMessage) 
const [status, setStatus] = useState(report.status)
  


 const dispatch = useDispatch()
//  https://job-search-api-n5ob.onrender.com - Production
// http://localhost:5000 -
  let navigate = useNavigate()

 
  // https://job-search-api-n5ob.onrender.com/jobs
  const updateR = async (e)=>{
    e.preventDefault()
    try {
        const response = await axios.put(`https://job-search-api-wyvc.onrender.com/editReport/${id}`,{
            status
        })
        if(response.data.status){
    
            dispatch(updateReport(response.data))
            toast.success(response.data.message)
            navigate("/admin/reports")
    
    
            console.log(response.data)     
        }
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
   
    
  }

  
  
  return (
    <div style={{margin:"30px"}}>
      <button onClick={()=>navigate("/admin/reports")} 
      className='btn btn-sm btn-secondary me-2'>
        <FaArrowAltCircleLeft/> 
      </button>
     <br /><br />

     
    <p> <b>Job Title - </b><MdWork/> {title}</p>
  
 <p><b>Job Type - </b>{jobType}</p>
 <p> <b>Job Location - </b><FaSearchLocation/> {province}, {area}</p>
 <p>{jobLocation}</p>
 <p><b>Report message</b> - {reportMessage}</p>
 <form onSubmit={updateR}>
<div className="d-flex">
 <select value={status} style={{width:"fit-content"}}onChange={(e)=>setStatus(e.target.value)}>
    <option value="select an option">Select an option</option>

    <option value="Status is pending. We'll review your report and get back to you">Status is pending. We'll review your report and get back to you</option>
    <option value="We have removed the job that you have reported">We have removed the job that you have reported</option>
    <option value="We have decided not to remove the job post. Reason - Job comes from a legimate company">We have decided not to remove the job post. Reason - Job comes from a legimate company</option>

 </select>
</div>
<button type="submit" className='btn btn-sm btn-success'>Update report</button>
 </form>

 <hr /> 
        </div>
                                                                
  )
}

export default EditReport