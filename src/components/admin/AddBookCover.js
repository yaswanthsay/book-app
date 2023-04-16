import { Button, Grid, TextField } from '@mui/material'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { db, storage } from '../../config/firebase'
import { Link } from 'react-router-dom'
import { addDoc, collection, getDocs } from 'firebase/firestore'

function AddBookCover() {

  const [cover,setCover] = useState("")
  const [url,setUrl] = useState([])
  const [blog,setBlog] = useState("")
  const [date,setDate] = useState("")
  const [blogResponse,setBlogResponse] = useState([])

  const uploadRef = ref(storage,`bookCoverFiles/${cover.name}`)

  const addImage = async() =>{
    try{
      await uploadBytes(uploadRef,cover)
    }catch(err){
      console.log(err)
    }
  }


  const imageRef = ref(storage,"bookCoverFiles/")

  const showImage = async() =>{
    const data = await listAll(imageRef)
    data.items.map(async(item)=>{
       const url = await getDownloadURL(item)
       setUrl((prev)=>[...prev,url])
    }
    )
  }

  const blogRef = collection(db,"Blog")

  const blogClick = async() =>{
    try{
      await addDoc(blogRef,{
        blog:blog,
        date:date
      })
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }

  const showBlogDate = async() =>{
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
    showImage()
    showBlogDate()
  },[])


  return (
    <>
    <Grid container spacing={2}>
      <div style={{marginTop:"170px",marginLeft:"95px"}}>
        <Grid item xs={8}>
        <TextField type='file' size="small" onChange={(e)=> setCover(e.target.files[0])}/>
        <br/>
        <br/>
        <Button size="small" variant="contained" type="submit" onClick={addImage}>Add Cover</Button>
        </Grid>
      </div>
     </Grid>
     <div style={{marginTop:"30px",marginLeft:"80px"}}>
     <Grid container spacing={2}>
          {url.map((urlImg)=>{
             const urlId = urlImg.substring(urlImg.length - 12)
            return( 
              <Grid item xs={2}>
            <Link to="/adminBookDetail" onClick={()=>localStorage.setItem("urlId",urlId)}>
            <div style={{display:"flex"}}>
              <img src={urlImg} alt="url" style={{width:"90px",height:"120px"}} />
              </div>
            </Link>
            </Grid>
            )
          })}
     </Grid>
     </div>
     <Grid container spacing={2}>
      <Grid item xs={4}>
        <div style={{marginTop:"70px",marginLeft:"80px"}}>
           <TextField label="Blog" type="text" size="small" onChange={(e)=> setBlog(e.target.value)}/>
           <br/>
           <TextField type="date" size="small" onChange={(e)=> setDate(e.target.value)} style={{marginTop:"20px"}}/>
           <br/>
           <Button type="submit" size="small" variant='contained' onClick={blogClick} style={{marginTop:"20px"}}>Add Blog</Button>
        </div>
      </Grid>
      <Grid item xs={8}>
        <div>
          {blogResponse.map((data)=>(
            <Grid item xs={2}>
              <div style={{border:"1px solid black",padding:"10px",color:"grey"}}>
             <li>{data.date}</li>
             </div>
             </Grid>
          )
          )}
        </div>
      </Grid>
     </Grid>
     </>
  )
}

export default AddBookCover