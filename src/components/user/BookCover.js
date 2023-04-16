import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { storage } from '../../config/firebase'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'

function BookCover() {
  const [image, setImage] = useState([])

  const imageRef = ref(storage, `bookCoverFiles/`)

  const showImage = async () => {
    const data = await listAll(imageRef)
    data.items.forEach(async (item) => {
      const imgUrl = await getDownloadURL(item)
      setImage((prev) => [...prev, imgUrl])
    })
  }

  useEffect(() => {
    showImage()
  }, [])

  return (
    <Grid container spacing={2}>
      {image.map((img) => {
        const urlId = img.substring(img.length - 12)
        return (
          <Grid item xs={2}>
            <Link to="/review"><img
              src={img}
              alt="img"
              onClick={() => localStorage.setItem('urlId', urlId)}
              style={{
                width: '150px',
                height: '180px',
                boxShadow: '0 0 9px 0px #CFCFCF',
              }}
            /></Link>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default BookCover
