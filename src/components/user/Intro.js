import { Grid } from '@mui/material'
import React from 'react'

function Intro() {
  return (
    <div style={{backgroundColor:"#E8E8E8"}}>
    <Grid container spacing={2}>
        <Grid item xs>
          <div style={{marginTop:"20px"}}>
             <h4 style={{color:"#BDBDBD",fontSize:"30px",textAlign:"center"}}>You can find <span style={{fontSize:"60px"}}> reviews</span> of the books that I have read till now here.</h4>
          </div>
        </Grid>
    </Grid>
    </div>
    )
}

export default Intro