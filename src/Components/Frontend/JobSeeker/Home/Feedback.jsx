import React from 'react'
import { useParams } from 'react-router-dom'

function Feedback() {
    const {id} = useParams()
    
  return (
    <div style={{margin:"30px"}}>
     <p>{id} - Feedback</p>
    </div>
  )
}

export default Feedback