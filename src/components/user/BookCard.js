import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import {
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material'
import { Link } from 'react-router-dom'

function BookCard() {
  const [bookDetail, setBookDetail] = useState([])

  const detailRef = collection(db, 'Book')

  const showDetail = async () => {
    try {
      const data = await getDocs(detailRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setBookDetail(filteredData)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    showDetail()
  }, [])

  return (
    <Grid container spacing={2}>
      {bookDetail.map((detData) => {

        return(
        <Grid item xs={2}>
            <Card elevation={0}  style={{height:"75px",border:"1px solid #CFCFCF",borderRadius:"10px",boxShadow:"0 0 9px 0px #CFCFCF"}}>
            <CardContent>
              <div style={{display:"flex",justifyContent:"space-between"}}>
              <p style={{fontSize:"12px",alignItems:"center",fontStyle:"italic",fontWeight:"bold"}}>{detData.bookName}</p>
              <Link to="/review"  style={{textDecoration:"none"}}>
                <Button  type="submit" size="small" variant="contained" onClick={()=>localStorage.setItem("bookId",detData.id)}>More</Button>
              </Link>
              </div>
            </CardContent>
          </Card>
        </Grid>
        )
       })}
    </Grid>
  )
}

export default BookCard
