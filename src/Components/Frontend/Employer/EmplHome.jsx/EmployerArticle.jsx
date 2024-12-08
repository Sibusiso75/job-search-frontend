import React, { useEffect } from 'react'
import { FaUserCircle, FaHome, FaArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticle } from '../../../../redux/slices/articleSlice';

function EmployerArticle() {
  const articles = useSelector(state=>state.articles.articles)
  const dispatch = useDispatch()
   let navigate = useNavigate()
   useEffect(() => {
     const fetchArticles = async ()=>{
       const response = await fetch("http://localhost:5000/articles")
       const data = await response.json()
       dispatch(getArticle(data))
     }
     fetchArticles()
   }, [])


  return (
    <div className='d-flex'>
      <div  style={{margin:"20px"}}>
   
      {articles.map((article)=>{
      const {id,title, example,authorName,posted, paragraph} = article;
      return <div key={id}>
         <h5>Written by <FaUserCircle/> {authorName},  {posted}</h5>
       <br />
         <h6>{title}</h6>
         <br />
         <p><b>{paragraph}</b></p>
         <p>{example}</p>
      </div>
    })
    }
      </div>
     
      </div>
  )
}

export default EmployerArticle