import React from 'react'
import '../App.css';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {getAuth} from 'firebase/auth'

const Navbar = ({loggedIn}) => {
    const auth = getAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const pathMatchRoute = route => {
        if(route === location.pathname){
            return true
        }
    }

      // logout
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }
  return (
    <footer className='navbar'>
        <nav className="navbar-bar">
            <ul>
                <li onClick={() => navigate('/')}>
                    <p className={pathMatchRoute('/') ? 'navbar-listitem-nameActive' : 'navbar-listItem'}>Home</p>
                </li>
            {loggedIn ?
                 <li onClick={() => navigate('/profile')}>
                 <p className={pathMatchRoute('/profile') ? 'navbar-listitem-nameActive' : 'navbar-listItem'}>Profile</p>
                </li>
                : ''
            }
                <li>
                  {loggedIn ? 
                  <button type='button' onClick={onLogout} className='logout-btn'>Logout</button>
                :
                <Link to='/signin'><button type='button' className='logout-btn'>Login</button></Link>
                }
                </li>
            </ul>
        </nav>
    </footer>
  )
}

export default Navbar