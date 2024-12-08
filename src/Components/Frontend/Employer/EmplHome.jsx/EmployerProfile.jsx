import React, { useState,useEffect}from 'react'
import axios from "axios"
import {  useDispatch, useSelector } from 'react-redux'
import { getEmployer } from '../../../../redux/slices/employerslice'
import { useNavigate,useParams } from 'react-router-dom'
import { FaHome, FaPlus, FaUserCircle } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

function EmployerProfile() {
    let {id}=  useParams() 
    let navigate = useNavigate()
    // <div className='d-flex vh-100 justify-content-center align-items-center'>
    // </div>
    
    const dispatch = useDispatch()
    const employers = useSelector(state=>state.employers.employers)
    const employer = employers.find(emp=>emp.id==id)
    
    const [email, setEmail]= useState(employer.email)
    const [username, setUsername]= useState(employer.username)
    const [companyName, setCompanyName]= useState(employer.companyName)
    const [phoneNumber, setPhoneNumber]= useState(employer.phoneNumber)
    const [numberOfEmployees, setNumberOfEmployees]= useState(employer.numberOfEmployees)
    const [aboutYourCompany, setAboutYourCompany]= useState(employer.aboutYourCompany)








  useEffect(() => {
           const fetchData = async ()=>{
    try {
        
        const response = await axios.get("http://localhost:5000/employers")
         dispatch(getEmployer(response.data))
    } catch (error) {
            console.log(error)
        }
    
       }
       fetchData()
     }, [])
  return (
    <div className='d-flex'>
      <div style={{margin:"30px"}}>

            <button onClick={()=>navigate("/employerHome")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Back home
      </button>
      <form style={{margin:"30px"}}>
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
                       <select onChange={(e)=>setNumberOfEmployees(e.target.value)}>
              <option value={numberOfEmployees}>{numberOfEmployees}</option>              
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
    </div>
  )
}

export default EmployerProfile