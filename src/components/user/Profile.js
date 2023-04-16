import React, { useRef, useState } from 'react'
import { storage, auth } from '../../config/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import picuser from '../../images/picuser.png'
import pencil from '../../images/pencil.png'
import { updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Grid } from '@mui/material'

function Profile() {

  const editRef = useRef(null)
  

  const navigate = useNavigate()

  const [uploadImage, setUploadImage] = useState('')
  const [preview, setPreview] = useState('')

  const handleImage = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]))
    setUploadImage(e.target.files[0])
  }

  const handleClick = () =>{
     editRef.current.click()
  }

  const picUpload = async () => {
    if (uploadImage === null) return
    const picRef = ref(storage, `greenAppFiles/${uploadImage.name}`)
    try {
      const uploaded = await uploadBytes(picRef, uploadImage)
      const url = await getDownloadURL(uploaded.ref)
      await updateProfile(auth.currentUser, {
        photoURL: url,
      })
      toast.success('Profile picture updated successfully')
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (err) {
      console.log(err)
    }
  }

  const userName = auth?.currentUser?.email
    .substring(0, auth?.currentUser?.email.indexOf('@'))
    .toUpperCase()
  const email = auth?.currentUser?.email

  const profileImage = auth?.currentUser?.photoURL

  return (
    <div
      style={{
        width: '250px',
        height: '400px',
        borderRadius: '6px',
        border: '1px solid #DEDEDE',
        position: 'relative',
        right:"370px",
        top: '226px',
        boxShadow: '1px 1px 1px 1px #F1F1F1',
        backgroundColor:"white",
        zIndex:"2"
      }}
    >
      <div style={{backgroundColor:"#EFEFEF",height:"105px",marginTop:"15px",borderRadius:"6px"}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div >
            <p style={{ fontSize: '10px', marginLeft: '74px',color:"black" }}>{userName}</p>
            <p style={{ marginLeft: '67px', fontSize: '11px', color: '#3BB143' }}>
              Upload Profile pic here
            </p>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div>
          <img
            accept="image/*"
            src={preview ? preview : profileImage ? profileImage : picuser}
            alt="profilePic"
            style={{ width: '65px', height: '65px', marginLeft: '89px',marginTop:'20px',borderRadius:"100px" }}
          />
          <input
            type="file"
            onChange={handleImage}
            style={{display:"none"}}
            ref={editRef}
          />
          <img src={pencil} style={{width:"20px",height:"20px",cursor:"pointer"}} alt="profile" onClick={handleClick} />
          {auth?.currentUser?.emailVerified && (
            <Button
            variant="contained"
              type="submit"
              size="small"
              onClick={picUpload}
              style={{
                cursor: 'pointer',
                marginTop: '30px',
                marginLeft: '85px',
              }}
            >
              Upload
            </Button>
          )}
          <p style={{ fontSize: '11px', marginLeft: '45px',color:"black" }}>
            (Allowed format : png/jpg/jpeg)
          </p>
        </div>
      </Grid>
      <hr style={{ marginTop: '100px' }} />
      <Grid item xs={12}>
        {email && <div style={{ marginLeft: '40px' }}>
          <p style={{ fontSize: '12px',color:"black" }}>Email : {email}</p>
        </div>}
      </Grid>
      <ToastContainer autoClose={2000} position="bottom-right" />
      </div>
    </div>
  )
}

export default Profile
