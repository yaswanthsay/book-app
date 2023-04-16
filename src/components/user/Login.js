import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {auth} from '../../config/firebase'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Button, Grid, TextField } from '@mui/material'


function Login() {

    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const login = async (e) =>{
        e.preventDefault()
        try{
           await signInWithEmailAndPassword(auth,email,password)
          toast.success("LoggenIn successfully")
          !auth?.currentUser?.emailVerified && toast.error("Invalid email")
           localStorage.setItem("loginEmail",auth?.currentUser?.email)
           setTimeout(()=>{
            navigate("/")
           },2000)
        }catch(err){
            toast.error(err?.message?.substring(22, err?.message?.indexOf(")")))
        }
    }

    console.log(auth?.currentUser?.emailVerified)

  return (
    <Grid container spacing={2}>
      <Grid item xs>
      <ToastContainer autoClose={2000} position='bottom-right'/>
        <div style={{marginTop:"220px",marginLeft:"685px"}}>
            <p style={{color:"brown",marginLeft: '76px', fontSize: '25px'}}>Login</p>
        <form onSubmit={login}>
            <TextField size="small" label="Email" variant="outlined" onChange={(e)=> setEmail(e.target.value)} type='email'/>
            <br/>
            <TextField size="small" sx={{marginTop:"10px"}} label="Password" variant="outlined" onChange={(e)=> setPassword(e.target.value)} type='password'/>
            <br/>
            <Button variant="contained" size="small" sx={{marginTop:"10px",backgroundColor: '#3BB143',width:"224px"}} type="submit">Login</Button>
            <Link to="/resetPassword"  style={{textDecoration:"none",color:"#0A78C8"}}><p style={{cursor:"pointer",marginLeft:"120px",fontSize:"13px"}}>Forgot password?</p></Link>
            <div style={{display:"flex"}}>
            <p style={{fontSize:"14px"}}>Need to create an account ?</p>
            <Link  to="/signup" style={{textDecoration:"none",color:"brown",fontSize:"13px",marginTop:"14px",marginLeft:"10px"}}>SignUp</Link>
            </div>  
        </form>
        </div>
        </Grid>
        </Grid>
      )
}

export default Login