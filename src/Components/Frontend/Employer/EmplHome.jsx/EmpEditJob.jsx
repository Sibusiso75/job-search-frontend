import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaHome } from 'react-icons/fa'

function EmpEditJob() {
    let {id}=  useParams() 
    let navigate = useNavigate()
    const jobs = useSelector(state=>state.jobs.jobs)
    const job = jobs.find(u=>u.id==id)
    const [title, setTitle] = useState(job.title)
    const [numberOfPeopleToHire, setNumberOfPeopleToHire] = useState(job.numberOfPeopleToHire)
    const [description, setDescription] = useState(job.description)
    const [locationThatBestDescriptionsTheJob, setLocationThatBestDescriptionsTheJob] = useState(job.locationThatBestDescriptionsTheJob)
    const [EmployeesResideInJoblocation, setEmployeesResideInJoblocation] = useState(job.EmployeesResideInJoblocation)
    const [url, setUrl] = useState(job.url)
    const [province, setProvince]= useState(job.province)
    const [area, setArea]= useState(job.area)
    const [jobType, setJobType] = useState(job.jobType)



   
   
      return (
    <div>
         <button onClick={()=>navigate(`/employerJobs/${id}`)} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Back home
      </button>
   <form style={{margin:"30px"}}>

   <label htmlFor="">Job Title</label>
            <input type="text" 
            value={title}
             required
            onChange={(e)=>setTitle(e.target.value)}
            
            placeholder='e.g Software Developer'/>
                         <label htmlFor="">Job description</label>
            <textarea  
            value={description}
             required
            onChange={(e)=>setDescription(e.target.value)}
            
            placeholder='Job description ...'/>
              <label htmlFor="">Number of People to hire for this job</label><br />
              <select value={numberOfPeopleToHire} onChange={(e)=>setNumberOfPeopleToHire(e.target.value)}>
              <option value="Select an option">Select an option</option>
              <option value="1">1</option>
              <option value="2">2</option>
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
             <input type="url"value={url}    required
             placeholder='Enter your website url ...'
            onChange={(e)=>setUrl(e.target.value)}/>
               <label htmlFor="">Which option best describes this job's location?</label>
               
             <select value={locationThatBestDescriptionsTheJob} onChange={(e)=>setLocationThatBestDescriptionsTheJob(e.target.value)}>
              <option value="select an option">select an option</option>
              <option placeholder="The job is performed at a specific address" value="In-person. Precise location">In-person. Precise location</option>
              <option value="Remote. The job is performed remotely">Remote. The job is performed remotely </option>
              <option value="Hybrid. The job combines working in office and remotely">Hybrid. The job combines working in office and remotely </option>
              <option value="On the road. The job requires regular travel">On the road. The job requires regular travel </option>
            </select>
            <label htmlFor="">
              Are employees required to reside in a specific location?

</label>
<select value={EmployeesResideInJoblocation} onChange={(e)=>setEmployeesResideInJoblocation(e.target.value)}>
              <option value="select an option">select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No </option>
            </select>
            <label htmlFor="">Which province is this job located?</label>
            <select value={province} onChange={(e)=>setProvince(e.target.value)}>
              <option value="select an option">select an option</option>
              <option value="Eatern Cape">Eatern Cape</option>
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
            cols="100" rows="100"
            value={area}
            required
            onChange={(e)=>setArea(e.target.value)}
            placeholder='Enter the town of where the job is located ...'/>
                      <button type="submit" className='btn2'>Update</button>
                      </form>
                    
           
    </div>
  )
}

export default EmpEditJob