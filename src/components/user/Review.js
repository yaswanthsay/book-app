import { Grid } from '@mui/material'
import React from 'react'
import ViewReview from './ViewReview'
import AddUserReview from './AddUserReview'

function Review() {
  return (
    <>
     <Grid container spacing={2}>
       <Grid item xs={8}>
          <ViewReview/>
       </Grid>
       <Grid item xs={4}>
       <div style={{borderLeft:"1px solid #F0F0F0"}}>
          <AddUserReview/>
          </div> 
       </Grid>
       </Grid>
     </>
    )
}

export default Review