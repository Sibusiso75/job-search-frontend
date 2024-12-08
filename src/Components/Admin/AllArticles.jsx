import React, {useEffect}from 'react'
// import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from 'react-router-dom'
import { FaHome, FaPlus, FaUserAltSlash, FaUserCircle } from 'react-icons/fa'
import AdminNav from './AdminNav'
import { useDispatch, useSelector } from 'react-redux'
import { getArticle } from '../../redux/slices/articleSlice'

function AllArticles() {
let navigate = useNavigate()
  const dispatch= useDispatch()
  const articles = useSelector(state=>state.articles.articles)
  useEffect(() => {
    const fetchArticles = async ()=>{
      const response = await fetch("http://localhost:5000/articles")
      const data = await response.json()
       dispatch(getArticle(data))
    }
    fetchArticles()
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

      <button onClick={()=>navigate("/admin/addArticle")} 
      className='btn btn-sm btn-success'>
        Add new article <FaPlus/>
      </button>
      </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Email</th>
                        <th>Posted</th>
                        <th>Post</th>
                        <th>Comments</th>
                        <th>Replies</th>


                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      articles.map((article)=>{
                      
                        return <tr key={article.id}>
                                <td>{article.name}</td>
                                <td>{article.authorEmail}</td>
                                <td>{article.posted}</td>
                                <td>{article.post}</td>
                                <td>
                                {article.comments.map((c) => {
            return <div key={c.id} style={{ display: "flex", flexDirection: "column",borderBottom:"1px solid black", borderRadius: "10px", padding: "20px", width: "fit-content" }}>
              <div style={{ display: "flex", gap: "0.2rem" }}>
   
<FaUserCircle style={{ fontSize: "30px" }} />{c.username} {article.name==c.username? "(author)": ""},
<p style={{ color: "gray" }}>
  {article.posted}
</p>
</div>
<p>{c.comment}</p>
<div>
<p style={{borderBottom:"1px solid black"}}><b>Replies on {article.name}'s post</b></p>
  {c.replies.map((r,index)=>{
    return <div key={index} style={{ display: "flex", flexDirection: "column",borderBottom:"1px solid black", borderRadius: "10px", padding: "20px", width: "fit-content" }}>
      <div><FaUserCircle/> {r.username} {r.reply}</div>

    </div>
  })}
</div>
</div>
})}



             
                 
            
                                </td>





                               <td style={{display:"flex",gap:"0.5rem"}} >
                               <button onClick={()=>navigate(`/editArticle/${article.id}`)}className='btn btn-sm btn-secondary me-2'>Edit</button>
                                <button className='btn btn-sm btn-danger'>Delete</button>
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

export default AllArticles