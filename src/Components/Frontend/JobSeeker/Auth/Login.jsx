import React, {useState} from "react"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux"
import { userLoggedIn } from "../../../../redux/slices/userslice"
import { toast } from "react-toastify"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function Login() {
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

      
    let navigate = useNavigate()

        axios.defaults.withCredentials=true;
    async function handleSubmit(event){
      event.preventDefault();
      try {
          const response = await axios.post("http://localhost:5000/login",
            {email,password})
            if(email==""){
              setValidated(true)
            }
            if(password==""){
              setValidated(true)
            }
         else if(response.data.status){

           dispatch(userLoggedIn(response.data.status))
          navigate("/")
        toast.success(response.data.message)
        console.log(response.data)
        setError(false)
         }
         else{
          setError(true)
         }

         
        
        
          
    
      } catch (error) {
        console.log(error)
      }
     
     
  }
    
   
  return (
    <div>
         <div style={{margin:"15px"}}>
         <Link to="/" style={{color:"gray",float:"right", textDecoration:"underline"}}>Browse</Link>
            <h2 style={{marginLeft:"10%"}}>Login as a job seeker</h2>
        

            <Form  style={{margin:"30px"}}noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          {/* <Form.Label>Username</Form.Label> */}
            <Form.Control
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
              
              required
            />
            <Form.Control.Feedback type="invalid">
            Please provide a valid email.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          {/* <Form.Label>City</Form.Label> */}
          <Form.Control 
                        onChange={(e)=>setPassword(e.target.value)}
          type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
           Please provide a valid password
          </Form.Control.Feedback>
        </Form.Group>
       {error? <p style={{fontSize:"small",color:"red"}}>Incorect Email or Password</p>:null}
      <Button type="submit">Login</Button>
        </Form> 
        <Link style={{color:"blue"}} to="/forgotPassword">Forgot Password?</Link>
            <p>Don't have an account? <Link style={{color:"blue"}} to ="/register">
                Sign up
            </Link></p>
            </div>
    </div>
  )
}

export default Login