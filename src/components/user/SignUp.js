import React, { useState } from 'react'
import { auth,googleProvider } from '../../config/firebase'
import { createUserWithEmailAndPassword,signInWithPopup,sendEmailVerification } from 'firebase/auth'
import { Link } from 'react-router-dom'
import search from '../../images/search.png'
import { useNavigate } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Button, Grid, TextField } from '@mui/material'





function SignUp() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  



  const signUp = async (e) => {
    e.preventDefault()
    
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(auth.currentUser)
      auth?.currentUser?.emailVerified && localStorage.setItem("signupEmail",auth?.currentUser?.email)
      navigate("/verifyEmail")
    } catch (err) {
      toast.error(err?.message?.substring(22, err?.message?.indexOf(")")))
      console.log(err)
     if(err?.message?.substring(22, err?.message?.indexOf(")")) === "email-already-in-use" && auth?.currentUser?.emailVerified === false){
      navigate("/verifyEmail")
     }
    }
  }

  const signInWithGoogle = async() =>{
    
    try{
      await signInWithPopup(auth,googleProvider)
      localStorage.setItem("email",auth?.currentUser?.email)
      toast.success("LoggedIn successfully")
      setTimeout(()=>{
        navigate("/")
      },2000)
    }catch(err){
      console.log(err)
    }
  }

  console.log(auth?.currentUser?.emailVerified)

  return (
    <div >
    <Grid container spacing={2}>
      <Grid item xs>
    <div>
      <div>
      <ToastContainer autoClose={2000} position='bottom-right'/>
      </div>
      <div>
      </div>
      <div style={{ marginTop: '220px', marginLeft: '685px' }}>
        <p style={{ marginLeft: '76px', fontSize: '25px', color: 'brown'}}>
          Signup
        </p>
        <form onSubmit={signUp}>
          <TextField size="small" label="Email" variant="outlined" onChange={(e)=> setEmail(e.target.value)} type='email'/>
          <br />
          <TextField size="small" sx={{marginTop:"10px"}} label="Password" variant="outlined" onChange={(e)=> setPassword(e.target.value)} type='password'/>
          <br />
          <Button size="small" variant="contained" sx={{backgroundColor:"#3BB143",marginTop:"10px",width:"224px"}} type="submit">Signup</Button>
          <div style={{display:"flex"}}>
          <p style={{fontSize:"13px"}}>Already have an account?</p>
          <Link to="/login" style={{color:"brown",textDecoration:"none",fontSize:"15px",marginLeft:"35px",marginTop:"12px"}}>Login</Link>
          </div>
        </form>
        <div>
            <p style={{marginLeft:"100px",marginTop:"-10px"}}>or</p>
            <Button sx={{width: '224px',height: '35px',display:"flex",boxShadow:"1px 1px 1px 2px #ECECEC",backgroundColor:"white",cursor:"pointer"}} onClick={signInWithGoogle}><img style={{width:"15px",height:"15px"}} src={search} alt="google"/>
            <p style={{fontSize:"11px",marginLeft:"10px",marginTop:"14px",color:"black"}}>Signup with Google</p></Button>
          </div>
      </div>
    </div>
    </Grid>
    </Grid>
    </div>
  )
}

export default SignUp
