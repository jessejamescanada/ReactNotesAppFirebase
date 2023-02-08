import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { FaEye } from 'react-icons/fa'
import '../App.css'

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({email: '', password: ''})
  const [loginError, setLoginError] = useState('')

  const {email, password} = formData
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if(userCredential.user){
        navigate('/profile')
      }
    }catch(err){
      if(err){
        setLoginError('Error - Incorrect email or password')
        setTimeout(() => {
          setLoginError('')
        }, 3000);
      }
    }
  }

  return (
    <div>
      <div className="signin-container">
        <header>
          <p>Welcome Back!</p>
        </header>
        <main>
          <div className="signin-form-container">
            <form className="signin-form"
              onSubmit={onSubmit}
            >
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
              <Link to='/forgotpassword'>Forgot Password</Link>
              <div className="signinBar">
                <button>Sign In</button>
                <div className="error">{loginError}</div>
              </div>
            </form>
            <Link to='/signup'>Sign up instead</Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Signin