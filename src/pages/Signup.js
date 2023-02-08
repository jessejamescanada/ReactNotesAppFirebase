import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase-config'
import { FaEye } from 'react-icons/fa'
import '../App.css'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({name: '', email: '', password: ''})

  const {name, email, password} = formData
  const navigate = useNavigate()

  const onChange = e => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const passwordShow = e => {
    e.preventDefault()
    setShowPassword((prevState) => !prevState)
  }

  const onSubmit = async e => {
    e.preventDefault()

    try{
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <div className="signin-container">
        <header>
          <p>Sign Up!</p>
        </header>
        <main>
          <div className="signin-form-container">
            <form className="signin-form"
              onSubmit={onSubmit}
            >
              <input type="text"
                  placeholder='Name'
                  id='name'
                  value={name}
                  onChange={onChange}
              />
              <input type="email"
                  placeholder='Email'
                  id='email'
                  value={email}
                  onChange={onChange}
              />
              <div className="password-input">
                <input type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    id='password'
                    value={password}
                    onChange={onChange}
                />
                <FaEye className='eye' onClick={(e) => passwordShow(e)}>Show Password</FaEye>
              </div>
              <div className="signinBar">
                <button>Sign Up</button>
              </div>
            </form>
            <Link to='/signin'>Sign in instead</Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Signup