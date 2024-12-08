import React from 'react'
import AdminNav from './AdminNav'
import Users from './Users'
import { Link, useNavigate } from "react-router-dom";

import {useSelector} from "react-redux"

function Admin() {
  return (
   <div  className='d-flex'>
          <AdminNav/>
         <Users/>
    </div>
  )
}

export default Admin