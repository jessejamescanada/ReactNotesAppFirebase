import React, { useState, useEffect } from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
        setLoggedIn(true)
      }else{
        setLoggedIn(false)
      }
    })
  },[])
  return (
    <>
      <Router>
        <Navbar loggedIn={loggedIn}/>
        <Routes>
          {loggedIn ? <>
            <Route path='/' element={<Home loggedIn={loggedIn}/>} />
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
          </>
          :
          <>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          </>
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;
