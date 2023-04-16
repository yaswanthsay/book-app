import { Grid } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <div style={{backgroundColor:"#232323"}}>
    <Grid container spacing={2}>
        <Grid item xs>
            <h4 style={{textAlign:"center",color:"#646464",fontFamily:"monospace"}}>Copyright SAYAS Private Limited | All Rights Reserved || Designed by Yaswanth Krishna.</h4>
        </Grid>
    </Grid>
    </div>
  )
}

export default Footer