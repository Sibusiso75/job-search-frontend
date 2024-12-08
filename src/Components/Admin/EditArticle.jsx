import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaHome } from 'react-icons/fa'

function EditArticle() {
    let {id}=  useParams() 
    let navigate = useNavigate()
    const articles = useSelector(state=>state.articles.articles)
    const article = articles.find(u=>u.id==id)
    const [post, setPost] = useState(article.post)




   
   
      return (
    <div>
         <button onClick={()=>navigate("/admin/articles")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Back home
      </button>
   <form style={{margin:"30px"}}>

   <textarea type="text" onChange={(e)=>setPost(e.target.value)}
            required
            placeholder='post ...'

            value={post}

             ></textarea>
            
             
             
            <button type="submit" className="btn2">Update</button>
         
                      </form>
                    
           
    </div>
  )
}
export default EditArticle