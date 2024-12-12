import React, {useEffect}from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { FaHome, FaPlus, FaUserAltSlash, FaUserCircle } from 'react-icons/fa'
import AdminNav from './AdminNav'
import { useDispatch, useSelector } from 'react-redux'
import { getfeedback } from '../../redux/slices/feedbackSlice'

function AllFeedbacks() {
  const dispatch= useDispatch()
  const feedbacks = useSelector(state=>state.feedbacks.feedbacks)

  useEffect(() => {
    const fetchFeedbacks= async ()=>{
      const response = await axios.get("https://job-search-api-wyvc.onrender.com/feedbacks")
       dispatch(getfeedback(response.data))
    }
    fetchFeedbacks()
  }, [])
  
  return (
    <div style={{display:"flex"}}>
      <AdminNav/>
      <div>

        {/* <button onClick={()=>navigate("/admin")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Back home
      </button> */}
      <div style={{margin:"10px"}}>

   
      </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>UserId</th>
                        <th>Username</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      feedbacks.map((feedback)=>{
                      
                        return <tr key={feedback.id}>
                                <td>{feedback.id}</td>
                                <td>{feedback.userId}</td>
                                <td>{feedback.username}</td>
                                <td>{feedback.feedbackMessage}</td>
                             
                               {/* <td style={{display:"flex",gap:"0.5rem"}} >
                               <button onClick={()=>navigate(`/editArticle/${article.id}`)}className='btn btn-sm btn-secondary me-2'>Edit</button>
                                <button className='btn btn-sm btn-danger'>Delete</button>
                               </td> */}

                            </tr>
                        })
                      }
                </tbody>
            </table>

        
                      </div>
    </div>
  )
}

export default AllFeedbacks