import React from 'react'
import {Link } from 'react-router-dom'
import { motion } from "framer-motion"
import background from '../imgs/pencil.jpg'

const Home = ({loggedIn}) => {
    
  return (
    <>
    <div className="home-container" >
        <div className="home-content" style={{backgroundImage: `url(${background})`}}>
            <h1>My Nots</h1>
            <div className="home-btn-container">
                {loggedIn ? 
                    <Link to='/profile'>
                    <motion.button 
                            initial={{x: '-100vw', rotate: 90}}
                            animate={{x: 0, rotate: 0}}
                            transition={{delay: 0.1, duration: 1}}
                            className='home-btn'
                        >Profile
                    </motion.button>
                </Link> 
                :
                <Link to='/signin'>
                    <motion.button 
                            initial={{x: '100vw', rotate: 90}}
                            animate={{x: 0, rotate: 0}}
                            transition={{delay: 0.1, duration: 1}}
                            className='home-signin-btn'
                            >Sign In
                    </motion.button>
                </Link>
                }
            </div>
        </div>
    </div>

    </>

  )
}

export default Home