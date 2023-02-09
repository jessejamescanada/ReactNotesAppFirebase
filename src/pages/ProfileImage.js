import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { motion } from "framer-motion"

const ProfileImage = ({item, deleteNote}) => {
  return (
    <motion.div className='each-note' 
                  initial={{x: 0, scale: .1}} 
                  animate={{scale: 1}}
                  transition={{duration: 1}} 
                  exit={{y: '-100vh', x: '-100vw', rotate: 180, transition: {duration: 1.2}}}
    >
    <img src={item.data.imgUrls} alt="" className='uploaded-img' />
    <div className="note-btn-container">
    <FaTrash className='delete-btn' onClick={() => {deleteNote(item.id)}} />
  </div>
</motion.div>
  )
}

export default ProfileImage