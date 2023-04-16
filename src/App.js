import React from 'react'
import Login from './components/user/Login'
import SignIn from './components/user/SignUp'
import { Routes, Route } from 'react-router-dom'
import Home from './components/user/Home'
import PasswordReset from './components/user/PasswordReset'
import VerifyEmail from './components/user/VerifyEmail'
import NavBar from './components/user/NavBar'
import AdminHome from './components/admin/AdminHome'
import AdminReview from './components/admin/AdminReview'
import Review from './components/user/Review'
import AdminBookDetail from './components/admin/AdminBookDetail'
import Footer from './components/user/Footer'
import About from './components/user/About'
import Blog from './components/user/Blog'
import TopThree from './components/user/TopThree'

function App() {

  return (
    <div style={{minHeight:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{flex:1}}>
      <NavBar/>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/signup' element={<SignIn/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/resetPassword" element={<PasswordReset/>}/>
        <Route path='/verifyEmail' element={<VerifyEmail/>}/>
        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/adminReview' element={<AdminReview/>}/>
        <Route path='/review' element={<Review/>}/>
        <Route path='/adminBookDetail' element={<AdminBookDetail/>}/> 
        <Route path="/about" element={<About/>}/>
        <Route path="/topThree" element={<TopThree/>}/>
        <Route path="/blog" element={<Blog/>}/>
      </Routes>
    </div>
    </div>
  )
}

export default App
