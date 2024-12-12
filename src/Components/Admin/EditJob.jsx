import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { FaHome } from 'react-icons/fa'
import axios from "axios"
import { updateJob } from '../../redux/slices/jobSlice'
import { toast } from 'react-toastify'
import ReactQuill from "react-quill"


function EditJob() {
    let {id}=  useParams() 
    const jobs = useSelector(state=>state.jobs.jobs)
    const job = jobs.find(u=>u.id==id)
    const [title, setTitle] = useState(job.title)
    const [numberOfPeopleToHire, setNumberOfPeopleToHire] = useState(job.numberOfPeopleToHire)
    const [description, setDescription] = useState(job.description)
    const [jobLocation, setJobLocation] = useState(job.jobLocation)
    const [reside, setReside] = useState(job.reside)
    const [jobUrl, setJobUrl] = useState(job.jobUrl)
    const [jobType, setJobType] = useState(job.jobType)
    const [province, setProvince]= useState(job.province)
    const [area, setArea]= useState(job.area)
    let navigate = useNavigate()
    const dispatch = useDispatch()
    
async function update(e){
  e.preventDefault()
  try {
    
    const res = await axios.put(`http://localhost:5000/editJob/${id}`,{
      title,numberOfPeopleToHire,description,jobLocation,reside,jobUrl,jobType,province,area})
      if(res.data.status){
        dispatch(updateJob(res.data))
        toast.success(res.data.message)
      }
      else{
        toast.error("error")
      }
  } catch (error) {
    toast.error("error")
  }
}
   
   
      return (
    <div>
         <button onClick={()=>navigate("/admin/jobs")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Back home
      </button>
   <form style={{margin:"30px"}} onSubmit={update}>

   <label htmlFor="">Job Title</label>
            <input type="text" 
            value={title}
             required
            onChange={(e)=>setTitle(e.target.value)}
            
            placeholder='e.g Software Developer'/>
                         <label htmlFor="">Job description</label>
                         <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
             required
             className="editor-input"
            
            placeholder='Job description ...'/>
              <label htmlFor="">Number of People to hire for this job</label><br />
              <select value={numberOfPeopleToHire} onChange={(e)=>setNumberOfPeopleToHire(e.target.value)}>
              <option value="Select an option">Select an option</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="10+">10+</option>
              <option value="I have an ongoing need to fill this role">
                I have an ongoing need to fill this role
                </option>




                         </select>
   
         <label htmlFor="">Job Url</label>
             <input type="url"value={jobUrl}    required
             placeholder='Enter your website url ...'
            onChange={(e)=>setJobUrl(e.target.value)}/>
               <label htmlFor="">Which option best describes this job's location?</label>
               
             <select value={jobLocation} onChange={(e)=>setJobLocation(e.target.value)}>
              <option value="select an option">select an option</option>
              <option placeholder="The job is performed at a specific address" value="In-person. Precise location">In-person. Precise location</option>
              <option value="The job is performed remotely">The job is performed remotely </option>
              <option value="Hybrid. The job combines working in office and remotely">Hybrid. The job combines working in office and remotely </option>
              <option value="On the road. The job requires regular travel">On the road. The job requires regular travel </option>
            </select>
            <label htmlFor="">
              Are employees required to reside in a specific location?

</label>
<select value={reside} onChange={(e)=>setReside(e.target.value)}>
              <option value=""></option>
              <option value="Yes">Yes</option>
              <option value="No">No </option>
            </select>
            <label htmlFor="">Which province is this job located?</label>
            <select value={province} onChange={(e)=>setProvince(e.target.value)}>
              <option value=""></option>
              <option value="Eastern Cape">Eastern Cape</option>
              <option value="Western Cape">Western Cape </option>
              <option value="Northern Cape">Northern Cape </option>
              <option value="North West">North West </option>
              <option value="Free State">Free State </option>
              <option value="Gauteng">Gauteng </option>
              <option value="KZN">KZN </option>
              <option value="Limpopo">Limpopo </option>
              <option value="Mpumalanga">Mpumalanga </option>

            </select>
            <label htmlFor="">Job Type</label>
            <select value={jobType} onChange={(e)=>setJobType(e.target.value)}>
              <option value="select an option">select an option</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
              <option value="Learnership">Learnership</option>
            </select>
           <label htmlFor="">Job Town</label>
            
            <textarea
            value={area}
            required
            onChange={(e)=>setArea(e.target.value)}
            placeholder='Enter the town of where the job is located ...'/>
                      <button type="submit" className='btn2'>Update</button>
                      </form>
                    
           
    </div>
  )
}

export default EditJob