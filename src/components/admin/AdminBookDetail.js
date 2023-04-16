import { Button, Grid, TextField } from '@mui/material'
import {  doc, setDoc } from 'firebase/firestore'
import React, {  useState } from 'react'
import { db } from '../../config/firebase'
import AdminViewDetail from './AdminViewDetail'

function AdminBookDetail() {


    const [bookName,setBookName] = useState("")
    const [author,setAuthor] = useState("")
    const [adminReview,setAdminReview] = useState("")


    const urlId = localStorage.getItem("urlId")

    const bookDocRef = doc(db,"Book",urlId)


    const addDetail = async() =>{
      try{
        await setDoc(bookDocRef,{
          bookName:bookName,
          author:author,
          adminReview:adminReview
         })
         window.location.reload()
      }catch(err){
        console.log(err)
      }
    }



  return (
    <>
    <Grid container spacing={2}>
    <Grid item xs>
     <div style={{marginLeft:"40px",marginTop:"90px"}}>
      <TextField type="text" size="small" label="Book Name" onChange={(e)=> setBookName(e.target.value)} style={{marginTop:"20px"}}/>
      <br/>
      <TextField type="text" size="small" label="Author" onChange={(e)=> setAuthor(e.target.value)} style={{marginTop:"20px"}}/>
      <br/>
      <TextField type="text" size="small" label="Admin Review" sx={{width: 'calc(100% - 5px)'}} onChange={(e)=> setAdminReview(e.target.value)} style={{marginTop:"20px"}}/>
      <br/>
      <Button type="submit" size="small" variant="contained" style={{marginTop:"20px"}} onClick={addDetail}>Add Details</Button>
     </div>
     </Grid>
     </Grid>
     <Grid container spacing={2}>
        <AdminViewDetail/>
     </Grid>
     </>
  )
}

export default AdminBookDetail