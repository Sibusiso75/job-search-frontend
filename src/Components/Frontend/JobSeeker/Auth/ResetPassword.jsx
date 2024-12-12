import axios from "axios"
import React , {useState} from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import {toast} from "react-toastify"

function ResetPassword() {
   
    const [password, setPassword]= useState("")
    let navigate = useNavigate()
    let {token} = useParams()

  
    async function handleSubmit(e){
        e.preventDefault()
        try {
           const response = await axios.post(`https://job-search-api-wyvc.onrender.com/reset-password/${token}`, 
            {password})
             if(response.data.status){
                 toast.success(response.data.message)
                 setTimeout(() => {
                     navigate("/login")
                 }, 3000);
             }
             else{
              toast.error(response.data.message)
             }
            
        
        } catch (error) {
           toast.error(error)
        }
      
      


    }
  return (
    <div style={{margin:"30px"}}>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
       
             <label htmlFor="password">Password</label>
            <input type="password" 
            onChange={(e)=>setPassword(e.target.value)}

            placeholder='Password'/>

            <button type="submit" className="btn1">Reset</button>
            <div>Cancel<Link to ="/login">
                Login
            </Link></div>
        </form>
    </div>
  )
}

export default ResetPassword