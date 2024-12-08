import React, {useState} from "react"
import Axios from "axios"
import {toast} from "react-toastify"
import { loggedIn } from "../../../../redux/slices/employerslice"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"

function EmployerLogin() {
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [error, setError] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

    let navigate = useNavigate()
  
    // https://mealapp-api-2.onrender.com/login

    Axios.defaults.withCredentials=true;
    function handleSubmit(e){
        e.preventDefault()
        Axios.post("http://localhost:5000/employerLogin", 
          { email, password}).then(response =>{
            if(response.data.status){
              navigate("/employerHome")
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        }).catch(err =>{
            toast.error("error")
        })
   }
   
  return (
    <div>
         <div style={{margin:"15px"}}>
         <Link to="/" style={{color:"gray",float:"right", textDecoration:"underline"}}>Browse</Link>
            <h2 style={{marginLeft:"10%"}}>Login as an employer</h2>
        

         <form onSubmit={handleSubmit}> 
       
          
            <input type="email" 
             required
            onChange={(e)=>setEmail(e.target.value)}
            
            placeholder='Email'/>

            <input type="password" 
             required
            onChange={(e)=>setPassword(e.target.value)}
            
            placeholder='Password'/>
            <button onClick={handleSubmit} className="btn2">Login</button>

        </form>
        <Link style={{color:"blue"}} to="/forgotPassword">Forgot Password?</Link>
            <p>Don't have an account? <Link style={{color:"blue"}} to="/employerSignUp">
                Sign up
            </Link></p>
            </div>
    </div>
  )
}

export default EmployerLogin