import { Button, Grid, TextField } from '@mui/material'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'

function AdminViewDetail() {
  const urlId = localStorage.getItem('urlId')

  const bookDocRef = doc(db, 'Book', urlId)

  const [bookData, setBookData] = useState([])
  const [editReview, setEditReview] = useState('')

  const showData = async () => {
    try {
      const bookDetail = await getDoc(bookDocRef)
      setBookData(bookDetail.data())
    } catch (err) {
      console.log(err)
    }
  }

  const reviewEdit = async () => {
    try {
      await updateDoc(bookDocRef, {
        adminReview: editReview,
      })
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const reviewDelete = async() =>{
    try{
      await deleteDoc(bookDocRef)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    showData()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs>
          <div style={{ marginLeft: '73px', marginTop: '60px' }}>
            <h4>{bookData?.bookName}</h4>
            <p>{bookData?.adminReview}</p>
            <br />
            <TextField
              type="text"
              size="small"
              label="Edit Review"
              onChange={(e) => setEditReview(e.target.value)}
            />
            <br />
            <div>
            <Button style={{marginTop:"20px",backgroundColor:"#F0C411",color:"white"}} variant="contained" type="submit" size="small" onClick={reviewEdit}>
              Edit
            </Button>
            <Button style={{marginTop:"20px",backgroundColor:"#F0C411",color:"white",marginLeft:"20px"}} variant="contained" type="submit" size="small" onClick={reviewDelete}>
              Delete
            </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AdminViewDetail
