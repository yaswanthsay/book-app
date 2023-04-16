import React from 'react'
import AddBookCover from './AddBookCover'
import { Grid } from '@mui/material'

function AdminHome() {
  return (
    <Grid container spacing={2}>
      <Grid item xs>
      <AddBookCover/>
      </Grid>
    </Grid>
  )
}

export default AdminHome