import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../config/firebase'
import correct from '../../images/correct.png'

function PasswordReset() {



    const [email,setEmail] = useState("")
    const [reset,setReset] = useState(false)



    const resetPassword = async() =>{
        try{
         const data = await sendPasswordResetEmail(auth,email)
          setReset(true)
         console.log(data)
        }catch(err){
          console.log(err)
        }
      }

  return (
    <>
        <div style={{marginTop:"140px",marginLeft:"600px",border:"1px solid black",width:"350px",padding:"20px",height:"340px"}}>
        <h3 style={{color:"green"}}>Green<span style={{color:"brown"}}>A</span>pp</h3>
        <h5>Reset your password</h5>
        <p>To reset your password, enter your email below<br/> and submit. An email will be sent to you with <br/>instructions about how to complete the process.</p>
        {!reset && <labrl>Email Address</labrl>}
        <br/>
        {!reset && <input placeholder='Email' type='email' onChange={(e)=> setEmail(e.target.value)}/>}
        <br/>
        {reset ? <div style={{border:"3px solid green",borderRadius:"10px",padding:"10px"}}>Please check your email inbox for a link to complete the reset.<img style={{marginTop:"5px",width:"20px"}} src={correct} alt="reset"/></div>
         : <button type='submit' onClick={resetPassword} style={{color:"white",backgroundColor:"green",marginTop:"20px",cursor:"pointer",borderRadius:"4px",border:"1px solid green"}}>Reset Password</button>}
    </div>
    </>
  )
}

export default PasswordReset