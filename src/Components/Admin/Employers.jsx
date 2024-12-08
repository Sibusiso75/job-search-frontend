import React, { useEffect}from 'react'
import axios from "axios"
import {  useDispatch, useSelector } from 'react-redux'
import { getEmployer } from '../../redux/slices/employerslice'
import { useNavigate } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
function Employers() {
    let navigate = useNavigate()
    
    const dispatch = useDispatch()
    const employers = useSelector(state=>state.employers.employers)

  useEffect(() => {
           const fetchData = async ()=>{
    try {
        
        const response = await axios.get("http://localhost:5000/employers")
         dispatch(getEmployer(response.data))
    } catch (error) {
            console.log("error")
        }
    
       }
       fetchData()
     }, [])
  return (
    <div>

            <button onClick={()=>navigate("/admin/dashboard")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Back home
      </button>
      <h3>{employers.length} employers</h3>
            <table className='table'>
                <thead>
                    <tr>
                    <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Company name</th>
                        <th>Number of employees</th>
                        <th>About your company</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employers.map((employer)=>{

                            return <tr key={employer.id}>
                              <td>{employer.id}</td>

                                <td>{employer.username}</td>
                                <td>{employer.email}</td>
                                <td>{employer.phoneNumber}</td>
                                <td>{employer.companyName}</td>
                                <td>{employer.numberOfEmployees}</td>
                                <td>{employer.aboutYourCompany}</td>


                               <td style={{gap:"0.5rem"}}>
                                <button onClick={()=>navigate(`/employer/${employer.id}`)}className='btn btn-sm btn-secondary me-2'>Edit</button>
                                {/* <button className='btn btn-sm btn-danger'>Delete</button> */}
                               </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        
    </div>
  )
}

export default Employers