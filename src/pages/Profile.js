import React from 'react'
import {getAuth, updateProfile} from 'firebase/auth'
import {useState, useEffect} from 'react'
import {db} from '../firebase-config'
import {updateDoc, doc, collection, getDocs, query, where, deleteDoc} from 'firebase/firestore'
import '../App.css'
import CreateNote from './CreateNote'
import { FaTrash } from 'react-icons/fa'
import { motion } from "framer-motion"
import EditButton from './EditButton'

const Profile = () => {
  const auth = getAuth()

  const [newOriginalId, setNewOriginalId] = useState('')
  const [showUpdateNote, setShowUpdateNote] = useState(-1)
  const [newNoteData, setNewNoteData] = useState('')
  const [loading, setLoading] = useState(true)
  const [notesArray, setNotesArray] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const { name, email } = formData

  // get 
  useEffect(() => {
    const fetchUserNotes = async () => {
      setLoading(true)
      const notesRef = collection(db, 'notes')
      const q = query(notesRef, where('userRef', '==', auth.currentUser.uid))
      const querySnap = await getDocs(q)

      const notes = []

      querySnap.forEach((doc) => {
        return notes.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setNotesArray(notes)
      setLoading(false)
    }
    fetchUserNotes()
    console.log(notesArray)
  },[auth.currentUser.uid, newOriginalId])

  // delete
  const deleteNote = async id => {
    const noteDoc = doc(db, 'notes', id)
    await deleteDoc(noteDoc)
    setNewOriginalId(Math.floor(Math.random() * 1000000))
  }


  // edit form
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  
  const updateSubmit = async(id, note) => {
    setShowUpdateNote(false)
  
    if(note !== ''){
      const docNote = doc(db, 'notes', id)
      const newFields = {note: note}
      await updateDoc(docNote, newFields)
      setNewOriginalId(Math.floor(Math.random() * 1000000))
    }else{
      setShowUpdateNote(false)
    }
  }

  const showEdit = (id) => {
    console.log(id)
  
    setShowUpdateNote( id)

    console.log(showUpdateNote)
  }

  return (
    <>
    <div className='profile-container'>
      <div className="profile-content">
        <header className='welcome-back'>
          <p>Welcome Back <motion.div
                        initial={{x: 0, rotate: 5}}
                        animate={{x: 0, rotate: -5}}
                        transition={{delay: 0.2, duration: 1, repeat: Infinity, repeatType: 'reverse'}}
                        className='welcome-name'
                >{formData.name}
          </motion.div>!</p>
        </header>
        <main>
          <div className="profile-details-and-button">
          </div>
          <div className="profile-card">
            <form>
              {changeDetails ? 
                  <input type="text"
                      id='name'
                      value={name}
                      onChange={onChange}
                  />  
            : ''}
            </form>
          </div>
          <CreateNote setNewOriginalId={setNewOriginalId} notesArray={notesArray} />
          {notesArray ? (
            <>
            <div className="profile-notes-container">
            <ul>
                {notesArray.map((item) => (

                  item.data.imgUrls ? (
                  <div className='each-note'>
                      <img src={item.data.imgUrls} alt="" className='uploaded-img' />
                      <div className="note-btn-container">
                      <FaTrash className='delete-btn' onClick={() => {deleteNote(item.id)}} />
                    </div>
                  </div>) 
                  :<>

                  <div className="each-note">
                  <li>{item.data.note}</li>
                    <div className="note-btn-container">
                      <FaTrash className='delete-btn' onClick={() => {deleteNote(item.id)}} />
                      <button onClick={() => showEdit(item.id)}>Edit Note</button>
                      {/* <button onClick={() => {setShowUpdateNote(prevState => !prevState)}}>Edit Note</button> */}
                    </div>
                    {showUpdateNote === item.id ? 
                    <EditButton setNewNoteData={setNewNoteData} updateSubmit={updateSubmit} item={item} newNoteData={newNoteData}/>
                  : ''}
                  </div>
                </>
                ))}
                <div className="img">
                    <img src={notesArray.imgUrls} alt="" />
                </div>
              </ul>
            </div>
            </>
          ) : ''}
        </main>
      </div>
    </div>
    </>
  )
}

export default Profile