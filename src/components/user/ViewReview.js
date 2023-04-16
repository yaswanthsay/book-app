import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { Button, Card, CardContent, Grid, TextField } from '@mui/material'

function ViewReview() {
  const urlId = localStorage.getItem('urlId')

  const [reviewDetail, setReviewDetail] = useState([])

  const reviewDocRef = doc(db, 'Book', urlId)

  const showReview = async () => {
    try {
      const reviewData = await getDoc(reviewDocRef)
      setReviewDetail(reviewData.data())
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    showReview()
  }, [])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs>
          <div style={{marginTop:"130px",marginLeft:"15px"}} >
          <Card>
          <div style={{ padding: '30px',backgroundColor:"#EBFDE9" }}>
            <h1 style={{ fontSize: '30px' }}>{reviewDetail?.bookName}</h1>
            <h5>{reviewDetail?.author}</h5>
            <Grid item xs>
              <li>{reviewDetail?.adminReview}</li>
            </Grid>
          </div>
          </Card>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default ViewReview
