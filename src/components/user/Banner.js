import { Grid } from '@mui/material'
import React from 'react'
import reads1 from '../../images/reads1.jpg'


function Banner() {
  return (
    <Grid container spacing={2}>
      <Grid item xs>
      <div>
      <img src={reads1} alt="banner" style={{width:"100%",height:"805px"}}/>
      <div style={{position:"absolute",bottom:"430px",left:"210px"}}>
        <p style={{color:"#EDFFEB",fontSize:"25px"}}>hard work is
        no <br/><span style={{fontSize:"86px",fontFamily:"fantasy",fontStyle:"none"}}>excuse</span></p>
      </div>
      </div>
        </Grid>
    </Grid>
  )
}

export default Banner