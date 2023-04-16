import {configureStore} from '@reduxjs/toolkit'
import bookCoverReducer from './bookCover'


export const store = configureStore({
    reducer:{
        cover : bookCoverReducer
    }
})


