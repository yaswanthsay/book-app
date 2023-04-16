import { Grid } from '@mui/material'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import moment from 'moment'

function Blog() {


  const [blogResponse,setBlogResponse] = useState([])

  const blogRef = collection(db,"Blog")

  const showBlogData = async() =>{
    try{
     const data = await getDocs(blogRef)
     const filteredData = data.docs.map((doc)=>({
      ...doc.data(),
      id:doc.id
     }))
     setBlogResponse(filteredData)
    }catch(err){
      console.log(err)
    }
  }    

  useEffect(()=>{
    showBlogData()
  },[])


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs>
          {blogResponse.map((blogData)=>{
            console.log(blogData)
           return <div style={{ marginTop: '120px', marginLeft: '50px' }}>
            <h3>Read as much as you can.</h3>
            <div style={{ display: 'flex' }}>
              <h4 style={{ color: '#ADADAD' }}>{moment(blogData.date).format('DD/MM/YYYY')}</h4>
            </div>
            <p>
              {blogData.blog}
            </p>
          </div>
          })}
        </Grid>
      </Grid>
    </>
  )
}

export default Blog
