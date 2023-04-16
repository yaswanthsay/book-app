import { Button, Grid, TextField } from '@mui/material'
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/firebase'
import { toast,ToastContainer } from 'react-toastify'
import account from '../../images/account.png'


function AddUserReview() {

    const [review,setReview] = useState("")
    const [rating,setRating] = useState("")
    const [revData,setRevData] = useState([])
    const [rateLimit,setRateLimit] = useState(false)

    const urlId = localStorage.getItem("urlId")

    const reviewDocRef = doc(db,"Book",urlId)
    const reviewColRef = collection(reviewDocRef,"Review")

    const addUserReview = async() =>{
      
      if(auth?.currentUser?.emailVerified){
        try{
          await addDoc(reviewColRef,{
              userReview:review,
              userRating:rating,
              userAccount:auth?.currentUser?.emailVerified ? auth?.currentUser.email : ""
            })
            window.location.reload()
      }catch(err){
        console.log(err)
      }
      }
      else{
        toast.warning("Please login")
      }  
    }

    const showUserReview = async() =>{
      const reviewData = await getDocs(reviewColRef)
      const filteredData = reviewData.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id
      }))
      setRevData(filteredData)
    }

    useEffect(()=>{
      showUserReview()
    },[])


   return (
    <>
    <div>
      <ToastContainer autoClose={2000} position='bottom-right'/>
    </div>
    <Grid container spacing={2}>
       <Grid item xs>
        <Grid container spacing={2}>
        <Grid item xs>
          <h3 style={{position:"relative",top:"100px",left:"30px"}}>You can add your reviews here.</h3>
        </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs>
          <div style={{marginTop:"130px",marginLeft:"160px"}}>
         <TextField type="text" size="small" label="Review" onChange={(e)=> setReview(e.target.value)}/>
         <br/>
         <TextField inputProps={{maxLength:"5"}} value={rateLimit ? "" : rating} style={{marginTop:"20px"}}  type="number"  size="small" label="Rating" 
         onChange={(e)=>{ 
          if(e.target.value > 5){
            setRateLimit(true)
            toast.warning("Rate out of 5")
          }
          else{
            setRateLimit(false)
            setRating(parseInt(e.target.value))
          }
         } 
        }/>
         <br/>
         <Button style={{marginTop:"20px"}} variant='contained' type="submit" onClick={addUserReview}>Add Review</Button>
         </div>
          </Grid>
        </Grid>
       </Grid>
    </Grid>
    <hr style={{marginTop:"30px"}}/>
    <div style={{marginTop:"20px"}}>
    <Grid container spacing={2}>
      <Grid item xs>
         {revData.map((data)=>{
          return <div style={{marginLeft:"30px"}}>
            <div style={{display:"flex"}}><img src={account} style={{width:"20px",height:"20px"}} alt="account"/>
            <h6 style={{marginTop:"2px",marginLeft:"15px"}}>{data.userAccount}</h6></div>
            <p>{data.userReview}</p>
            <h4>{data.userRating}/5</h4>
          </div>
         })}
      </Grid>
    </Grid>
    </div>
    </>
  )
}

export default AddUserReview