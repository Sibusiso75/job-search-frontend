import React, { useEffect}from 'react'
import axios from "axios"
import {  useDispatch, useSelector } from 'react-redux'
import { getUser,deleteUser } from '../../redux/slices/userslice'
import { useNavigate } from 'react-router-dom'
import AdminNav from './AdminNav'
import { toast } from 'react-toastify'

function Users() {
    let navigate = useNavigate()
    // <div className='d-flex vh-100 justify-content-center align-items-center'>
    // </div>
    
    const dispatch = useDispatch()
    const users = useSelector(state=>state.users.users)

    async function removeUser(id){
        try {
            
            const response = await axios.delete(`https://job-search-api-wyvc.onrender.com/deleteUser/${id}`)
              if(response.data.status){
                dispatch(deleteUser({id}))
                toast.success(response.data.message)
              }
              else{
                toast.error(response.data.message)
              }
        } catch (error) {
            toast.error(error)
        }
    }
  useEffect(() => {
           const fetchData = async ()=>{
    try {
        
        const response = await axios.get("https://job-search-api-wyvc.onrender.com/admin")
         dispatch(getUser(response.data))
    } catch (error) {
            console.log(error)
        }
    
       }
       fetchData()
     }, [])
  return (
    <div className='d-flex'>
         <div>

<div style={{margin:"10px"}}>
  {users.length==1? <h3>{users.length} User</h3>:<h3>{users.length} Users</h3>}
</div>
            <table className='table'>
                <thead>
                    <tr>
                    <th>ID</th>

                        <th>Name</th>
                        <th>Email</th>
                       <th>DOB</th>
                       <th>Gender</th>
                       <th>Town</th>
                       <th>Postal code</th>
                       <th>Province</th>


                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user=>{
                            
                            return <tr key={user.id}>
                              <td>{user.id}</td>

                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.dateOfBirth}</td>
                                <td>{user.gender}</td>
                                <td>{user.town}</td>
                                <td>{user.postalCode}</td>
                                <td>{user.province}</td>




                                
                              

                              <td>
                                <button onClick={()=>navigate(`/user/${user.id}`)}className='btn btn-sm btn-secondary me-2'>Edit</button>
                                <button onClick={()=>removeUser(user.id)}className='btn btn-sm btn-danger'>Delete</button>
                               </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </div>
    </div>
  )
}

export default Users