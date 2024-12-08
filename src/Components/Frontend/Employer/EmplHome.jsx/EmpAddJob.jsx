import React, {useState} from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

 /*inputs -
   1. Your company's name
   2. Your company's number of employees -options (select an option, 1-49,50-149,150-249, 250-499, 500-749, 750-999, 1000+ )
   3. Your first and last name
   4. Your phone number - options (select an option, 1,2,3,4,5,6,7,8,9,10,10+, I have an ongoing need to fill this role)
   continue button
   next page
   5. Job title
   6. Number of people to hire for this job options (select an option, 1,2,3,4,5,6,7,8,9,10,10+, I have an ongoing need to fill this role)
   7. Which option best describes this job's location? (select an option, {In-person, precise location - The job is performed at a specific address},
    {General location within a limited area. The job address can't be specified }, {Remote. The job is performed remotely }, {Hybrid. The job combines working in office and remotely}, {On the road. The job requires regular travel}  )
   8. Are employees required to reside in a specific location? (yes or no)[radio input]
   continue button
   next page
   9. Job type - (Full time, Part time, Contract, Temporary, Internship, Learnership)
   10.Schedule - (4 hour shift, 8 hour shift, 12 hour shift, night shift, )
   11. 
  */
function EmpAddJob() {
const [title, setTitle] = useState("")
const [numberOfPeopleToHire, setNumberOfPeopleToHire] = useState(0)
const [description, setDescription] = useState("")
const [jobLocation, setJobLocation] = useState("")
const [reside, setReside] = useState("")
const [jobUrl, setJobUrl] = useState("")
const [province, setProvince]= useState("")
const [area, setArea]= useState("")
const [jobType, setJobType] = useState("")

 
let navigate = useNavigate()
function handleSubmit(e){
  e.preventDefault()
  if(title && level &&description && jobUrl!==""){
    navigate("/")
  }
  
}

  return (
    <div style={{margin:"30px"}}>
         <button onClick={()=>navigate(`/employerJobs`)} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Back home
      </button>

            <h2 style={{marginLeft:"10%"}}>Add job post</h2>
        

       
          
          <label htmlFor="">Job Title</label>
            <input type="text" 
             required
            onChange={(e)=>setTitle(e.target.value)}
            
            placeholder='e.g Software Developer'/>
                         <label htmlFor="">Job description</label>
            <textarea  
             required
            onChange={(e)=>setDescription(e.target.value)}
            
            placeholder='Job description ...'/>
              <label htmlFor="">Number of People to hire for this job</label><br />
              <select onChange={(e)=>setNumberOfPeopleToHire(e.target.value)}>
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
             <input type="url"    required
             placeholder='Enter your website url ...'
            onChange={(e)=>setJobUrl(e.target.value)}/>
               <label htmlFor="">Which option best describes this job's location?</label>
               
             <select onChange={(e)=>setJobLocation(e.target.value)}>
              <option value="select an option">select an option</option>
              <option placeholder="The job is performed at a specific address" value="In-person. Precise location">In-person. Precise location</option>
              <option value="Remote. The job is performed remotely">Remote. The job is performed remotely </option>
              <option value="Hybrid. The job combines working in office and remotely">Hybrid. The job combines working in office and remotely </option>
              <option value="On the road. The job requires regular travel">On the road. The job requires regular travel </option>
            </select>
            <label htmlFor="">
              Are employees required to reside in a specific location?

</label>
<select onChange={(e)=>setReside(e.target.value)}>
              <option value="select an option">select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No </option>
            </select>
            <label htmlFor="">Which province is this job located?</label>
            <select onChange={(e)=>setProvince(e.target.value)}>
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
            <select onChange={(e)=>setJobType(e.target.value)}>
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
            required
            onChange={(e)=>setArea(e.target.value)}
            placeholder='Enter the town of where the job is located ...'/>
            <p>When a job seeker clicks 'apply' button to your job post, they will be directed to your website.</p>
            <button type="submit" className="btn2">Post</button>
         
        
       
            </div>
  )
}

export default EmpAddJob