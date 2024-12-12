import axios from "axios"
import {toast} from "react-toastify"
import React, {useState} from "react"
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail]= useState("")
       let navigate = useNavigate()

       axios.defaults.withCredentials=true;
    async function handleSubmit(e){
      e.preventDefault()
      try {
        const response = await axios.post("https://job-search-api-wyvc.onrender.com/forgot-password",{email})
        if(response.data.status){
          toast.success(response.data.message)
        }
        
      } catch (error) {
        toast.error(error)
      }
    }
  return (
    <>
    
        <h2 style={{marginLeft:"1%"}}>Forgot Password</h2>
          <form onSubmit={handleSubmit}>

            <input type="email" 
            onChange={(e)=>setEmail(e.target.value)}
           

            placeholder='Email'/>
             <span style={{margin:"5px"}}>
              <button onClick={()=>navigate("/login")} className='btn btn-sm btn-danger me-2'>Go back</button>
              <button type="submit" className='btn btn-sm btn-success'>Send</button>              </span>
          </form> 
            
    </>
  )
}

export default ForgotPassword