import React, {useState, useEffect} from 'react'
import axios from "axios"

import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { addJob } from '../../redux/slices/jobSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import ReactQuill from "react-quill"

 /*inputs -
  //  1. Your company's name
  //  2. Your company's number of employees -options (, 1-49,50-149,150-249, 250-499, 500-749, 750-999, 1000+ )
  //  3. Your first and last name
  //  4. Your phone number - options (, 1,2,3,4,5,6,7,8,9,10,10+, I have an ongoing need to fill this role)
  //  continue button
  //  next page
  //  5. Job title
  //  6. Number of people to hire for this job options (, 1,2,3,4,5,6,7,8,9,10,10+, I have an ongoing need to fill this role)
  //  7. Which option best describes this job's location? (, {In-person, precise location - The job is performed at a specific address},
  //   {General location within a limited area. The job address can't be specified }, {Remote. The job is performed remotely }, {Hybrid. The job combines working in office and remotely}, {On the road. The job requires regular travel}  )
  //  8. Are employees required to reside in a specific location? (yes or no)[radio input]
  //  continue button
  //  next page
  //  9. Job type - (Full time, Part time, Contract, Temporary, Internship, Learnership)
  //  10.Schedule - (4 hour shift, 8 hour shift, 12 hour shift, night shift, )
  //  11. 
  */
function AddJob() {
  // const [companyName, setCompanyName] = useState(second)
  const dispatch = useDispatch()
const [title, setTitle] = useState("")
const [numberOfPeopleToHire, setNumberOfPeopleToHire] = useState("")
const [description, setDescription] = useState("")
const [jobLocation, setJobLocation] = useState("")
const [reside, setReside] = useState("")
const [jobUrl, setJobUrl] = useState("")
const [province, setProvince]= useState("")
const [area, setArea]= useState("")
const [jobType, setJobType] = useState("")
const [userId, setUserId] = useState("")
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")

useEffect(()=>{
  axios.get("http://localhost:5000/verify")
  .then(res=>{
   if(res.data.status){
     setUsername(res.data.username)
     setEmail(res.data.email)
     setUserId(res.data.id)
   }
   else {
     toast.error("User not verified")
   }
  })
 },[])


let navigate = useNavigate()
async function handleSubmit(e){
  e.preventDefault()
try {
  const response = await axios.post("http://localhost:5000/addJob",{userId,username,title,numberOfPeopleToHire,description,jobLocation,reside,jobUrl,province,area,jobType})
     if(response.data.status){
       dispatch(addJob(response.data))
      
      toast.success("Job has been added")
      navigate("/admin/jobs")
     }
  
} catch (error) {
  toast.error("error")

}
}

  return (
    <div style={{margin:"30px"}}>
         <button onClick={()=>navigate("/admin/jobs")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Back home
      </button>
      <p></p>
      <b>{username} - {userId}</b>

            <h2 style={{marginLeft:"10%"}}>Add job post</h2>
        

       <form onSubmit={handleSubmit}>

          
          <p>Job Title</p>
            <input type="text" 
             required
             onChange={(e)=>setTitle(e.target.value)}
             
             placeholder='e.g Software Developer'/>
                         <p>Job description</p>
                         <div className="editor">
            <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
             required
             className="editor-input"
            
            placeholder='Job description ...'/>
                         </div>
                         <br /><br /><br/>
              <span>Number of People to hire for this job</span><br />
              <select onChange={(e)=>setNumberOfPeopleToHire(e.target.value)}>
              <option value=""></option>
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
              <option value="I have an ongoing need to fill this role">
                I have an ongoing need to fill this role
                </option>




                         </select>
   
         <p>Job Url</p>
             <input type="url"    required
             placeholder='Enter your website url ...'
             onChange={(e)=>setJobUrl(e.target.value)}/>
               <p>Which option best describes this job's location?</p>
               
             <select onChange={(e)=>setJobLocation(e.target.value)}>
              <option value=""></option>
              <option placeholder="The job is performed at a specific address" value="In-person. Precise location">In-person. Precise location</option>
              <option value="The job is performed remotely">The job is performed remotely </option>
              <option value="Hybrid. The job combines working in office and remotely">Hybrid. The job combines working in office and remotely </option>
              <option value="On the road. The job requires regular travel">On the road. The job requires regular travel </option>
            </select>
            <p>
              Are employees required to reside in a specific location?

</p>
<select onChange={(e)=>setReside(e.target.value)}>
              <option value=""></option>
              <option value="Yes">Yes</option>
              <option value="No">No </option>
            </select>
            <p>Which province is this job located?</p>
            <select onChange={(e)=>setProvince(e.target.value)}>
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
            <p>Job Type</p>
            <select onChange={(e)=>setJobType(e.target.value)}>
              <option value=""></option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
              <option value="Learnership">Learnership</option>
            </select>
           <p>Job Town</p>
            
            <textarea
            required
            onChange={(e)=>setArea(e.target.value)}
            placeholder='Enter the town of where the job is located ...'/>
            <p>When a job seeker clicks 'apply' button to your job post, they will be directed to your website.</p>
            <button type="submit" className="btn2">Post</button>
            </form>
         
        
       
            </div>
  )
}

export default AddJob