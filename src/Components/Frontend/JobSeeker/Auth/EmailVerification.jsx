import React, {useState, useEffect, Fragment} from 'react'
import {FaCheck} from "react-icons/fa"
import { useNavigate, useParams } from 'react-router-dom'

function EmailVerification() {
    const [validUrl, setValidUrl] = useState(false)
    let navigate = useNavigate()
    let param = useParams()

    useEffect(()=>{
        async function verifyEmailUrl(){
            try {
        const url = `http://localhost:5000/users/${param.id}/verify/${paran.token}`
              const {data} = await axios.get(url)
              console.log(data)
              setValidUrl(true)
            } catch (error) {
                console.log(error)
                setValidUrl(false)
            }
        }
        verifyEmailUrl()
    },[param])
    
  return (
    <Fragment>
        {validUrl ?
        <div>
            <h4>
            Email verified successfully <FaCheck style={{fontSize:"30px"}}/>
            </h4>
            <button onClick={()=>navigate("/login")}></button>

        </div>:
        <div>
            <h4>404 - Page not found</h4>
        </div>
        }
    </Fragment>
  )
}

export default EmailVerification