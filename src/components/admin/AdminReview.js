import {  collection,  doc,  getDoc,  getDocs, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { Button, TextField } from '@mui/material'

function AdminReview() {


   

    const storageId = localStorage.getItem("id")

    const [reviewResponse,setReviewResponse] = useState([])
    const [editReview,setEditReview] = useState("")

    console.log(storageId)
    const reviewRef = doc(db,"Book",storageId)
   

     const showReview = async() =>{
        try{
           const reviewData = await getDoc(reviewRef)
           setReviewResponse(reviewData.data())
        }catch(err){
            console.log(err)
        }
     }

     const reviewEdit = async() =>{
      try{
       const editData = await updateDoc(reviewRef,{
          adminReview:editReview,
       })
        window.location.reload()
      }catch(err){
        console.log(err)
      }
     }

    useEffect(()=>{
      showReview()
    },[])


  return (
    <>
    <div style={{padding:"130px"}}>
    <div style={{padding:"10px",marginTop:"20px"}}>
    <h1 style={{fontSize:"50px"}}>{reviewResponse.bookName}</h1>
    <p>{reviewResponse.author}</p>
    <h3>{reviewResponse.adminReview}</h3>
    <TextField type="text" size="small" sx={{width: 'calc(100% - 5px)'}} onChange={(e)=> setEditReview(e.target.value)} label="Edit Admin Review"/>
    <br/>
    <Button style={{marginTop:"15px"}} size="small" variant="contained" type="submit" onClick={reviewEdit}>Edit Review</Button>
    </div>
    </div>
    
    </>
  )
}

export default AdminReview