import React, {useState} from 'react'
import  axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { addEmployer } from '../../../../redux/slices/employerslice'
import {toast} from "react-toastify"
import {  useDispatch, useSelector } from 'react-redux'
function EmployerSignUp() {
  /*inputs -
   1. Your company's name
   2. Your company's number of employees -options (select an option, 1-49,50-149,150-249, 250-499, 500-749, 750-999, 1000+ )
   3. Your first and last name
   4. Your phone number - options (select an option, 1,2,3,4,5,6,7,8,9,10,10+, I have an ongoing need to fill this role)
   continue button
   next page
   5. Job title
   6. Number of people to hire for this job options (select an option, 1,2,3,4,5,6,7,8,9,10,10+, I have an ongoing need to fill this role)
   7. Which option best describes this job's location? (select an option, {In-person, precise location - The job is performed at a specific address},{General location within a limited area. The job address can't be specified }, {Remote. The job is performed remotely }, {Hybrid. The job combines working in office and remotely}, {On the road. The job requires regular travel}  )
   8. Are employees required to reside in a specific location? (yes or no)[radio input]
   continue button
   next page
   9. Job type - (Full time, Part time, Contract, Temporary, Internship, Learnership)
   10.Schedule - (4 hour shift, 8 hour shift, 12 hour shift, night shift, )
   11. 
  */
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [username, setUsername]= useState("")
    const [companyName, setCompanyName]= useState("")
    const [phoneNumber, setPhoneNumber]= useState(0)
    const [numberOfEmployees, setNumberOfEmployees]= useState("")
    const [aboutYourCompany, setAboutYourCompany]= useState("")





    const dispatch = useDispatch()



let navigate = useNavigate()

//https://mealapp-api-2.onrender.com/register

    function handleSubmit(e){
        e.preventDefault()
        axios.post("http://localhost:5000/employerRegister", 
        {username, email, password,phoneNumber,companyName,numberOfEmployees,aboutYourCompany }).then((response)=>{           
               if(response.data.status){
     dispatch(addEmployer(response.data))
     toast.success(response.data.message)
     navigate("/employerLogin")
                 } else{
                toast.error(response.data.message)
               }
        }).catch(err =>{
            console.log("Error")
            toast.error("Error")
        })
    }
  return (
    <div style={{margin:"25px"}}>
       
    <Link to="/" style={{color:"gray",float:"right", textDecoration:"underline"}}>Browse</Link>
            <h2 style={{marginLeft:"10%"}}>Register as an employer</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="">First and last name</label>
           <input type="text" 
           minLength={2}
          required
            onChange={(e)=>setUsername(e.target.value)}
            
            
            placeholder='e.g John Cena'/>
            <label htmlFor="">Email</label>
            <input type="email" 
              required
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='e.g johncena@gmail.com'/>
             <label htmlFor="">Phone number</label>
            <input type="number" 
              required
            onChange={(e)=>setPhoneNumber(e.target.value)}
            placeholder='0712345678'/>
            <label htmlFor=""> Password</label>

            <input type="password" 
                       minLength={6}
                       maxLength={30}
            onChange={(e)=>setPassword(e.target.value)}
            required
            placeholder='Enter Password'/>
        
           <label htmlFor="">Company's name</label>
           <textarea
              cols="100" rows="100"
              style={{height:"70px"}}
  
              required
              onChange={(e)=>setCompanyName(e.target.value)}
              placeholder='Name of your company'/>
              <label htmlFor="">Number of employees</label>
              <select onChange={(e)=>setNumberOfEmployees(e.target.value)}>
              <option value="Select an option">Select an option</option>
              <option value="1-49">1-49</option>
              <option value="50-149">50-149</option>
              <option value="150-249">150-249</option>
              <option value="250-499">250-499</option>
              <option value="500-749">500-749</option>
              <option value="750-999">750-999</option>
                         </select>
                         <label htmlFor="">Tell us more about your company</label>
                         <textarea
            cols="100" rows="100"
            style={{height:"150px"}}
              required
            onChange={(e)=>setAboutYourCompany(e.target.value)}
           /> 
            <button type="submit" className='btn2'>Register</button>
                       
           
           
            

           
        </form> 
        <p>Already have an account? <Link style={{color:"blue"}} to ="/employerLogin">
                Login
            </Link></p>
           
    </div>
  )
}

export default EmployerSignUp