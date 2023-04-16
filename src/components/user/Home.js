import React from 'react'
import Banner from './Banner'
import BookCover from './BookCover'
import { Card, CardContent, Grid } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import Bottom from './Bottom'
import Footer from './Footer'
import Intro from './Intro'



function Home() {

  const location = useLocation()

  const isLogout = location.state?.isLogout

  isLogout && toast.success("Logged out successfully")


  return (
    <>
    <div style={{backgroundColor:"#F7F7F7"}}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Banner />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <Intro />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <div style={{padding:"60px"}}>
        <Card  >
            <CardContent>
          <div style={{ marginTop: '40px', marginLeft: '60px' }}>
            <BookCover />
          </div>
          </CardContent>
          </Card>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <Bottom />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <Footer />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
             <ToastContainer autoClose={2000} position='bottom-right'/>
        </Grid>
      </Grid>
      </div>
    </>
  )
}

export default Home


