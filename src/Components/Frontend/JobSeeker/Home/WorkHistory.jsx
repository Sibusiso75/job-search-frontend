import React from 'react'
import { useParams } from 'react-router-dom'

function WorkHistory() {
  const {id} =useParams()
  return (
    <div>WorkHistory - {id}</div>
  )
}

export default WorkHistory