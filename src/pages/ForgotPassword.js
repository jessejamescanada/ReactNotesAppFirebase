import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState('')

  const onChange = e => {
    setEmail(e.target.value)
  }

  const onSubmit = async e => {
    e.preventDefault()
    console.log(email)
    try{
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
      
    }catch(err){
      console.log(err)
      setFail(`Couldn't find that email. Please try again.`)
      setTimeout(() => {
        setFail('')
      }, 3000);
    }
  }

  return (
    <div className='forgot-password-container'>
      <header>
        <p>Forgot Password</p>
      </header>
      <main>
        <div className="forgot-form-container">
        <form onSubmit={onSubmit}>
          <input type="email"
              id="email" 
              value={email}
              onChange={onChange}
              placeholder='Email'
          />
          <Link to='/signin'>
            Sign In Instead
          </Link>
          <button>Send Reset Link</button>
        </form>
        {success ? 
        <div>
          <p>Email sent successfully!</p>
          <Link to='/'>
              <button>Go Home</button>
          </Link>
        </div>  
        : ''
      }
        <div className='error'>{fail}</div>
        </div>
      </main>
    </div>
  )
}

export default ForgotPassword