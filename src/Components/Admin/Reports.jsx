import React, {useEffect} from 'react'
import AdminNav from './AdminNav'
import { useDispatch, useSelector } from 'react-redux'
import { getReport,deleteReport } from '../../redux/slices/reportSlice'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Reports() {
 const dispatch = useDispatch()
 const reports = useSelector(state=>state.reports.reports)
 let navigate = useNavigate()

 useEffect(() => {
   const fetchReports = async ()=>{
    const response = await axios.get("https://job-search-api-wyvc.onrender.com/allReports")
    dispatch(getReport(response.data))
   }
   fetchReports() 
 }, [])

 async function deleteR(id){
    try {
        const response = await axios.delete(`https://job-search-api-wyvc.onrender.com/deleteReport/${id}`)
        if(response.data.status){
            dispatch(deleteReport({id}))
            toast.success(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
 }
 
  return (
    <div style={{display:"flex"}}>
        <AdminNav/>
    <div>
      
        <table className="table">
            <thead>
                
                <tr>
                <th>Id</th>
                <th>UserId</th>
                <th>JobId</th>
                <th>Reported By</th>
                <th>Job Title</th>
                <th>Job Type</th>
                <th>Job location</th>
                <th>Status</th>
                    <th>Report message</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    reports.map((r)=>{
                        const { id,
                            title,
                            description,
                            numberOfPeopleToHire,
                            jobUrl,
                            jobLocation,
                            reside,
                            province,
                            jobType,
                            area,
                            username,
                            jobId,
                            userId,
                            status,
                           reportMessage}=r
                        return <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.userId}</td>
                        <td>{r.jobId}</td>
                            <td>{r.username}</td>
                            <td>{r.title}</td>
                            <td>{r.jobType}</td>
                            <td>{r.area}, {r.province}</td>
                            <td>{r.status}</td>
                            <td>{r.reportMessage}</td>

                           <td>
                           <button  className='btn btn-sm btn-secondary' onClick={()=>navigate(`/editReport/${id}`)}>Edit</button>
                            <button  className='btn btn-sm btn-danger' onClick={()=>deleteR(id)}>Delete</button>
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

export default Reports