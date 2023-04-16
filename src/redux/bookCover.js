import { createSlice } from "@reduxjs/toolkit";



const bookCoverSlice = createSlice({
    name:"cover",
    initialState:{
        value:""
    },
    reducers:{
        addCoverDetails:(state,action)=>{
            console.log(action.payload)
            state.value = action.payload
        }
    }
})

export const {addCoverDetails} = bookCoverSlice.actions
export default bookCoverSlice.reducer