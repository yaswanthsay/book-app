import { Grid } from '@mui/material'
import React from 'react'
import '../../components/user/bottom.css'
import { Link } from 'react-router-dom'


function Bottom() {
  return (
    <div style={{backgroundColor:"#313131",height:"300px"}}>
    <Grid container spacing={2} >
       <Grid item xs={4}>
        <div style={{marginTop:"100px",marginLeft:"230px"}}>
        <p style={{fontSize:"25px",color:"white"}}> Paper<span style={{fontStyle:"italic",fontWeight:"bolder"}}>p</span><span >illow</span></p>
        </div>
       </Grid>
       <Grid item xs={8}>
        <div style={{marginTop:"60px"}}>
            <ul>
            <Link to="/about" style={{textDecoration:"none",color:"white"}}><li>About</li></Link>
            <Link to="/topThree" style={{textDecoration:"none",color:"white"}}><li>Top Three</li></Link>
            <Link to="/blog" style={{textDecoration:"none",color:"white"}}><li>Blog</li></Link>
            </ul>
         </div>
       </Grid>
    </Grid>
    </div>
  )
}

export default Bottom