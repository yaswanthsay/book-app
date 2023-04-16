import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { storage } from '../../config/firebase'
import { getDownloadURL, listAll, ref } from 'firebase/storage'

function Books() {

  const [image,setImage] = useState([])


  const imageRef = ref(storage,"bookCoverFiles/")

  const showData = async() =>{
    const data = await listAll(imageRef)
    data.items.forEach(async(item)=>{
       const url = await getDownloadURL(item)
         setImage((prev)=> [...prev,url])
    })
  }


  useEffect(() => {
    showData()
  }, [])


  return (
    
      <Grid container spacing={2}>
        {image.map((data) => (
          <Grid item xs={3}>
                 <img src={data} alt="img" style={{width:"350px",height:"400px",boxShadow:"0 8px 15px 0 rgba(0, 0, 0, 0.2)"}}/>
          </Grid>
        ))}
      </Grid>
  
  )
}

export default Books

