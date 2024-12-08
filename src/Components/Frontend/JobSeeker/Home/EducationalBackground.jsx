import React from 'react'
import { useParams } from 'react-router-dom'

function EducationalBackground() {
    const {id} = useParams()
    
  return (
    <div style={{margin:"30px"}}>
     <p>{id} - EducationalBackground</p>
    </div>
  )
}

export default EducationalBackground