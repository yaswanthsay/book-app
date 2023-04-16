import { Grid } from '@mui/material'
import React from 'react'

function TopThree() {
  return (
    <Grid container spacing={2}>
     <Grid item xs>
        <div style={{marginTop:"150px",marginLeft:"30px"}}>
           It was very difficult for me to grab top three from the list of these books. <span style={{fontWeight:"bold"}}> Monk who sold his ferrari</span> is one of the greatest book among this list. 
           But because of some unknown reason I am not including the book in Top Three. 
           <span style={{fontWeight:"bold"}}> Subtle art of not giving a f*ck</span> is a great book and a best seller 
           and also hardly hitted me about the realities in life. 
           But because of some unknown reason I am not including it in my Top Three list.
            The next book that should be included in top list and refused to do so due to some unknown reason is 
           <span style={{fontWeight:"bold"}}> The Pilgrimage</span>. The books that are included in Top Three are 
           <span style={{fontWeight:"bold"}}>Courage to be disliked, Atmamun and Atomic habits.</span> I think I loves hard hitting books very much.
           Courage to be disliked and Atmamun is such books. Then the approach of Atomic habit is really nice. It is actually hard hitting when we realizes.
           But, the narration of the book is little bit different. 
        </div>
     </Grid>
    </Grid>
  )
}

export default TopThree