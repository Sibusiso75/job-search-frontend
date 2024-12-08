import React, {useState} from 'react'
import AdminNav from './AdminNav'
import { useNavigate } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

function AddArticle() {

const [article, setArticle] = useState("")
const [title, setTitle] = useState("")
const [example, setExample] = useState("")



let navigate = useNavigate()

  return (
    <div>
 <button onClick={()=>navigate("/admin/articles")} 
      style={{background:"green", color:"whitesmoke", fontWeight:"bold"}}>
        <FaHome/> Go Back
      </button>
       <div style={{margin:"15px"}}>
            <h2 style={{marginLeft:"10%"}}>Add article</h2>
        

        {/* <form onSubmit={handleSubmit}> */}
       
          
            
            <input type="text" onChange={(e)=>setTitle(e.target.value)}
            required
            placeholder='title ...'

             />
            <textarea  
             required
            onChange={(e)=>setArticle(e.target.value)}
            
            placeholder='paragraph ...'/>
            <textarea  
             required
            onChange={(e)=>setExample(e.target.value)}
            
            placeholder='example ...'/>
             
             
            <button type="submit" className="btn2">Post</button>
         
        {/* </form> */}
       
            </div>
    </div>
  )
}

export default AddArticle