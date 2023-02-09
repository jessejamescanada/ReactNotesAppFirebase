import React from 'react'
import { FaTrash } from 'react-icons/fa'
import EditButton from './EditButton'
import { animate, motion } from "framer-motion"

const ProfileNotes = ({item, deleteNote, showUpdateNote, setNewNoteData, updateSubmit, newNoteData, showEdit}) => {
  return (

    <motion.div  className="each-note" 
                  initial={{x: 0, scale: .1}} 
                  animate={{scale: 1,}}
                  transition={{ duration: 1}} 
                  exit={{y: '-100vh', x: '100vw', rotate: 180, transition: {duration: 1.2}}}
    >
    <li >{item.data.note}</li>
      <div className="note-btn-container">
        <FaTrash className='delete-btn' onClick={() => {deleteNote(item.id)}} />
        <button onClick={() => showEdit(item.id)}>Edit Note</button>

      </div>
      {showUpdateNote === item.id ? 
      <EditButton setNewNoteData={setNewNoteData} updateSubmit={updateSubmit} item={item} newNoteData={newNoteData}/>
    : ''}
    </motion.div>

    ) 
}

export default ProfileNotes