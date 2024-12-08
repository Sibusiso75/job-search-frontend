import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaHome } from 'react-icons/fa'

function EmployerEdit() {
    let {id}=  useParams() 
    let navigate = useNavigate()
    const employers = useSelector(state=>state.employers.employers)
    const employer = employers.find(u=>u.id==id)
    const [email, setEmail]= useState(employer.email)
    const [age, setAge]= useState(employer.age)
    const [gender, setGender]= useState(employer.gender)
    const [isAdmin, setIsAdmin]= useState(employer.isAdmin)
    const [companyName, setCompanyName]= useState(employer.companyName)
    const [description, setDescription]= useState(employer.description)
    const [province, setProvince]= useState(employer.province)
    const [area, setArea]= useState(employer.area)
    const [username, setUsername]= useState(employer.username)
    
      return (
    <div>
         <button onClick={()=>navigate(`/employerProfile/${id}`)} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Back home
      </button>
   <form style={{margin:"30px"}}>
    <div style={{display:"flex"}}>

<p htmlFor="">Fullname</p><br />
        <input type="text" 
           minLength={2}
           required
           value={username}
           onChange={(e)=>setUsername(e.target.value)}
           placeholder='name'/>
<p htmlFor="">Email</p><br />

            <input type="email" 
                      
                      value={email}
                      required
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder='Email'/>
                      </div>
                      <div style={{display:"flex"}}>

                       <input type="number" 
                      value={age}
                      
                      required
                      onChange={(e)=>setAge(e.target.value)}
                      placeholder='Age'/>
                      
                 <select onChange={(e)=>setGender(e.target.value)}
                  placeholder='Gender' 
                  
                  value={gender}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                      </select>
                      </div>
                      <div style={{display:"flex"}}>

                      <select onChange={(e)=>setIsAdmin(e.target.value)}
                  value={isAdmin}>
                   <option value="No">No</option>
                    <option value="Yes">Yes</option>
                      </select> 
                      <select onChange={(e)=>setProvince(e.target.value)}
                      value={province}>
              <option value="Eastern Cape">Eastern Cape</option>
              <option value="Western Cape">Western Cape</option>
              <option value="Northern Cape">Northern Cape</option>
              <option value="North west">North west</option>
              <option value="Free state">Free state</option>
              <option value="Gauteng">Gauteng</option>
              <option value="KZN">KZN</option>
              <option value="Mpumalanga">Mpumalanga</option>
              <option value="Limpopo">Limpopo</option>
            </select>
            </div>
            <div style={{display:"flex"}}>

            <input type="text" 
            value={area}
              required
            onChange={(e)=>setArea(e.target.value)}
            placeholder='Job Town ...'/>
            <textarea
            cols="100" rows="100"
            style={{height:"80px"}}
               value={companyName}
            required
            onChange={(e)=>setCompanyName(e.target.value)}
            placeholder='Name of your company or business'/>
            </div>
            <textarea
            value={description}
            cols="100" rows="100"
            style={{height:"150px"}}
              required
            onChange={(e)=>setDescription(e.target.value)}
            placeholder='Tell us more about your company or business '/>
                      <button type="submit" className='btn2'>Update</button>
                      </form>
                    
           
    </div>
  )
}

export default EmployerEdit