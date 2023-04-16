import React from 'react'
import { sendEmailVerification } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import check from "../../images/check.png"


function VerifyEmail() {


    const signupEmail = auth?.currentUser?.email
  const emailVerification = async() =>{
    try{
        await sendEmailVerification(auth.currentUser)
        toast.success("Successfully send verification email")
        setTimeout(()=>{
            window.location.reload()
        },2000)
    }catch(err){
        console.log(err) 
        toast.error(err)
    }
  }


  return (
    <div>
        <div style={{marginLeft:"500px",marginTop:"80px",border:"1px solid grey",width:"550px",height:"530px",padding:"30px"}}>
        <h4 style={{color:"green",marginLeft:"200px",fontSize:"30px"}}>Green<span style={{color:"brown"}}>A</span>pp</h4>
        <h6 style={{marginLeft:"141px",fontSize:"20px"}}>Great, now verify your email</h6>
        <img src={check} style={{width:"75px",marginLeft:"235px"}} alt=''/>
        <p style={{marginLeft:"110px"}}>Check your inbox at {signupEmail}<br/> and
        click the verification link inside to complete your<br/>
         registration. This link will expire shortly, so verify 
         soon!</p>
         <p style={{marginLeft:"110px",color:"grey"}}><span style={{color:"black"}}>Don't see an email?</span> Check your spam folder.</p>
         <p style={{marginLeft:"110px",cursor:"pointer"}}>Link expired? <span onClick={emailVerification} style={{color:"blue"}}>Resend verification email</span></p>
    </div>
    <ToastContainer autoClose={2000} />
    </div>
  )
}

export default VerifyEmail