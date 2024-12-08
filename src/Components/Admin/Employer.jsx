

import React, {useState} from 'react'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaHome } from 'react-icons/fa'
import { updateEmployer } from '../../redux/slices/employerslice'

function Employer() {
    let {id}=  useParams() 
    let navigate = useNavigate()
    const employers = useSelector(state=>state.employers.employers)
    const employer = employers.find(u=>u.id==id)
    const [email, setEmail]= useState(employer.email)
    const [username, setUsername]= useState(employer.username)
    const [companyName, setCompanyName]= useState(employer.companyName)
    const [phoneNumber, setPhoneNumber]= useState(employer.phoneNumber)
    const [numberOfEmployees, setNumberOfEmployees]= useState(employer.numberOfEmployees)
    const [aboutYourCompany, setAboutYourCompany]= useState(employer.aboutYourCompany)
    
    async function update(e){
      e.preventDefault()
      try {
          
          const response = await axios.put(`http://localhost:5000/updateEmployer/${id}`,{username, email,phoneNumber, password, companyName, numberOfEmployees, aboutYourCompany })
            if(response.data.status){
              dispatch(updateEmployer(response.data))
              toast.success("Updated successfully")
              navigate("/admin/dashboard")
            }
            else{
              toast.error("error")
            }
      } catch (error) {
          toast.error(error)
      }
  }
      return (
    <div>
         <button onClick={()=>navigate("/employers")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Back home
      </button>
   <form style={{margin:"30px"}} onSubmit={update}>
    <div style={{display:"flex"}}>


        <input type="text" 
           minLength={2}
           required
           value={username}
           onChange={(e)=>setUsername(e.target.value)}
           placeholder='name'/>
            <input type="email" 
                      
                      value={email}
                      required
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder='Email'/>
                      </div>
                      <div style={{display:"flex"}}>

                       <input type="text" 
                      value={companyName}
                      
                      required
                      onChange={(e)=>setCompanyName(e.target.value)}
                      placeholder='Company name'/>
                      
                      <input type="number" 
                      value={phoneNumber}
                      
                      required
                      onChange={(e)=>setPhoneNumber(e.target.value)}
                      placeholder='Phone no'/>
                       <select value={numberOfEmployees} onChange={(e)=>setNumberOfEmployees(e.target.value)}>
              <option value="1-49">1-49</option> 
              <option value="50-149">50-149</option>
              <option value="150-249">150-249</option>
              <option value="250-499">250-499</option>
              <option value="500-749">500-749</option>
              <option value="750-999">750-999</option>             
                         </select>
                      </div>
                    
            <div style={{display:"flex"}}>

           
           
            </div>
            <textarea
            value={aboutYourCompany}
            cols="100" rows="100"
            style={{height:"150px"}}
              required

            onChange={(e)=>setAboutYourCompany(e.target.value)}
            placeholder='Tell us more about your company or business '/>
                      <button type="submit" className='btn2'>Update</button>
                      </form>
                    
           
    </div>
  )
}

export default Employer