import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaHome } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { getUser,updateUser } from '../../redux/slices/userslice'
import axios from 'axios'

function User() {
    const {id}=  useParams() 
    let navigate = useNavigate()
    const users = useSelector(state=>state.users.users)
    const user = users.find(u=>u.id==id)
    const [username, setUsername]= useState(user.username)
    const [email, setEmail]= useState(user.email)
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth)
    const [gender, setGender] = useState(user.gender)
    const [aboutMe, setAboutMe] = useState(user.aboutMe)
    const [province, setProvince] = useState(user.province)
    const [country, setCountry] = useState(user.country)
    const [town, setTown] = useState(user.town)
    const [postalCode, setPostalCode] = useState(user.postalCode)
   
    async function update(e){
      e.preventDefault()
      try {
          
          const response = await axios.put(`https://job-search-api-wyvc.onrender.com/updateUser/${id}`,{username,email,dateOfBirth, gender,
            address, aboutMe, province, country, town, postalCode})
            if(response.data.status){
              dispatch(updateUser(response.data))
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
         <button onClick={()=>navigate("/admin/dashboard")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Back home
      </button>
   <form style={{margin:"30px"}} onSubmit={update}>
      <p>Username</p>
        <input type="text" 
           minLength={2}
           required
           value={username}
           onChange={(e)=>setUsername(e.target.value)}
           
           
           
           placeholder='Username'/>
           <p>Email</p>
            <input type="email" 
                      
                      value={email}
                      required
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder='Email'/>
                     
                     <div  style={{display:"flex", gap:"1rem"}}>
            <select value={gender} onChange={(e)=>setGender(e.target.value)}>
          
          <option value="Male">Male</option>
          <option value="Female">Female</option>


        </select>

             <input type="text" value={country} placeholder="country" onChange={(e)=>setCountry(e.target.value)}/>
            </div>
            <div  style={{display:"flex", gap:"1rem"}}>
              <input type="number" value={postalCode}  onChange={(e)=>setPostalCode(e.target.value)}/>
            <textarea value={town} placeholder="town" onChange={(e)=>setTown(e.target.value)}>

            </textarea>
             <textarea  value={province} placeholder="province" onChange={(e)=>setProvince(e.target.value)}></textarea>
            <textarea value={aboutMe}  placeholder="aboutMe" onChange={(e)=>setAboutMe(e.target.value)}></textarea>
            </div>

                     
            
                      <button type="submit" className='btn2'>Update</button>
                      </form>
                    
           
    </div>
  )
}

export default User