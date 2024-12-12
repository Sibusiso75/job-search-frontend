import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaHome } from 'react-icons/fa'
import { updateUser } from '../../redux/slices/userslice'
import { toast } from 'react-toastify'

function EditUser() {
    let {id}=  useParams() 
    let navigate = useNavigate()
    const users = useSelector(state=>state.users.users)
    const user = users.find(u=>u.id==id)
    const [email, setEmail]= useState(user.email)
    const [username, setUsername]= useState(user.username)


    async function handleUpdate(e) {
      e.preventDefault()
      try {
        const res = await axios.put(`https://job-search-api-wyvc.onrender.com/updateUser/${id}`,{username,email})
        if(res.data.status){
  
          dispatch(updateUser(res.data))
          toast.success(res.data.message)
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error)
      }
     
    }

   
    
      return (
    <div>
         <button onClick={()=>navigate("/admin/dashboard")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Back home
      </button>
   <form style={{margin:"30px"}} onSubmit={handleUpdate}>

        <input type="text" 
           minLength={2}
           required
           value={username}
           onChange={(e)=>setUsername(e.target.value)}
           
           
           
           placeholder='Username'/>
            <input type="email" 
                      
                      value={email}
                      required
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder='Email'/>
                      
                      
                      
                 
                     
                      <button type="submit" className='btn2'>Update</button>
                      </form>
                    
           
    </div>
  )
}

export default EditUser