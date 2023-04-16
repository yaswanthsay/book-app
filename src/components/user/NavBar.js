import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { auth } from '../../config/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Avatar, Grid } from '@mui/material';
import account from '../../images/account.png'
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';


function NavBar() {

    const navigate = useNavigate()

const [profileToggle,setProfileToggle] = React.useState(false)
const [isLogout,setIsLogout] = React.useState(false)

    const logout = async() =>{
       
      try{
        await signOut(auth)
        setIsLogout(!isLogout)
        localStorage.removeItem("loginEmail")
        localStorage.removeItem("signupEmail")
        localStorage.removeItem("email")
        localStorage.removeItem("photoUrl")
        toast.success("Logged out successfully");
        navigate("/")
  
      }catch(err){
        console.log(err)
        toast.error(err);
      }
    }
     
    const email = localStorage.getItem("email")
    const signupEmail = localStorage.getItem("signupEmail")
    const loginEmail = localStorage.getItem("loginEmail")
    const loginUsername = loginEmail?.substring(0, loginEmail?.indexOf("@")).toUpperCase()
    const googleUserName = email?.substring(0, email?.indexOf("@")).toUpperCase()
  
  
  const currentURL = window.location.href.substring(window.location.href.indexOf("/") + 16);
  
   React.useEffect(()=>{
    setTimeout(()=>{
      navigate(currentURL)
    },2000)
   },[])
  
  
  const profileImage = auth?.currentUser?.photoURL


  return (
    <Grid container spacing={2}>
      <Box sx={{ flexGrow: 1 }}>
      {/* <ToastContainer autoClose={2000}/> */}
         <AppBar position="fixed" elevation={0}>
           <Toolbar sx={{backgroundColor:"black",height:"70px"}}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={4}></Grid>
                <Grid item={8}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontFamily:"",fontSize:"28px" }}>
               <p style={{width:"130px",height:"50px"}}> Paper<span style={{fontStyle:"italic",fontWeight:"bolder"}}>p</span><span >illow</span></p>
            </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
            <div style={{display:"flex"}}>
            <Link to="/" state={{isLogout:isLogout}} style={{textDecoration:"none",color:"white",fontFamily:"inherit",marginLeft:"20px",fontWeight:"bolder"}}>Home</Link>
             {(!loginEmail ) && <Link to="/signup" style={{textDecoration:"none",color:"white",fontFamily:"inherit",marginLeft:"20px",fontWeight:"bold"}}>Signup</Link>}
             {((!loginEmail || !auth?.currentUser?.emailVerified )) && <Link to="/login" style={{textDecoration:"none",color:"white",fontFamily:"inherit",marginLeft:"20px",fontWeight:"bold"}}>Login</Link>}
             {(loginEmail || signupEmail || email ) && <Link to="/" onClick={logout} style={{textDecoration:"none",color:"white",fontFamily:"inherit",marginLeft:"20px",fontWeight:"bold"}}>Logout</Link>}
             <p style={{fontSize:"12px",color:"#EBC722",marginTop:"4px",marginLeft:"20px"}} >
                   {loginUsername ? loginUsername : googleUserName}
             </p>
             </div>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={1}>
                <Avatar onClick={()=> setProfileToggle(!profileToggle)} alt="profile" sx={{width:"25px",height:"25px",cursor:"pointer"}} src={profileImage ?? account} />
           </Grid>
           <Grid item xs={1}>
           {profileToggle && <div style={{zIndex:"2"}}>
            <Profile/>
           </div>}
           </Grid>
           </Toolbar>
          </AppBar>
        </Box>
    </Grid>
  )

}

export default NavBar