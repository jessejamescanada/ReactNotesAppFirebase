import React from 'react'
import {useState, useEffect} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase-config'
import {v4 as uuidv4} from 'uuid'
import { motion } from "framer-motion"
import '../App.css'

const CreateNote = ({setNewOriginalId}) => {
  const [formData, setFormData] = useState({ note: '', images: {} })
  const [addImg, setAddImg] = useState(false)
  const [imgQuestion, setImgQuestion] = useState(true)
  const [createNoteForm, setCreateNoteForm] = useState(true)
  const [todayDate, setTodayDate] = useState('')
  const [error, setError] = useState('')
  const {note, images} = formData
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
        setFormData({...formData, userRef: user.uid})
      }else{
        navigate('/signin')
      }
    })
  },[])

  // imgs
  const imgSubmit = async e => {
      e.preventDefault()
      const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

        const storeageRef = ref(storage, 'images/' + fileName)
        const uploadTask = uploadBytesResumable(storeageRef, image)

        uploadTask.on('state_changed', 
      (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              }
            }, 
              (error) => {
                reject(error)
              }, 
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        })
      }
        const imgUrls = await Promise.all(
          [...images].map((image) => storeImage(image))
            ).catch(() => {
        return
      })
      setImgQuestion(true)

    const formDataCopy = {
      ...formData,
      imgUrls,
      id: Math.floor(Math.random() * 100000000),
      timestamp: serverTimestamp()
    }
      delete formDataCopy.images
      const docRef = await addDoc(collection(db, 'notes'), formDataCopy)
      setNewOriginalId(formDataCopy.id)

      setAddImg(false)
      setCreateNoteForm(true)
}

useEffect(() => {
  currentDate()
},[])

const currentDate = () => {
    let date = new Date()
    date = date.toString().split(" ")
    const slicedDate = date.slice(0, 4)
    const stringDate = slicedDate.join(', ')
    setTodayDate(stringDate)

}

// text
  const onSubmit = async e => {
      e.preventDefault()
      if(formData.note === ''){
        setError('Please enter a note!')
        setTimeout(() => {
          setError('')
        }, 2000);
        return
      }
        const formDataCopy = {
          ...formData,
          id: Math.floor(Math.random() * 100000000),
          timestamp: serverTimestamp(),
          date: todayDate
      }
      delete formDataCopy.images
      const docRef = await addDoc(collection(db, 'notes'), formDataCopy)
      // this new original id takes state from profile (where youre displaying a new note) and updating the state with a random ID which triggers a rerender by calling it in the useEffect dependency on <Profile/>
      setNewOriginalId(formDataCopy.id) 
      setFormData(prevState => ({
        ...prevState,
        note: ''
      }))
  }

  const onMutate = e => {
        // files
        if(e.target.files){
          setFormData((prevState) => ({
            ...prevState,
            images: e.target.files
          }))
        }
        if(!e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
          }))
        }
  }

  const onImgAdd = () => {
    setAddImg(true)
    setCreateNoteForm(false)
    setImgQuestion(false)
  }

  const cancelImg = () => {
    setAddImg(false)
    setCreateNoteForm(true)
    setImgQuestion(true)
  }

  return (
    <div className="create-note-container">
      <div className="create-note-content">
        <header>
        </header>
        <div className="create-form-container">
          {createNoteForm ? 
          <>
              <form onSubmit={onSubmit} className='text-form'>
                <motion.input 
                    initial={{x: '-100vw', rotate: -90}}
                    animate={{x: 0, rotate: 0}}
                    transition={{delay: 0.1, duration: 1}}
                    type="text" 
                    id='note'
                    value={note}
                    onChange={onMutate}
                    placeholder='note...'
                    maxLength={90}
                />
                  
                <motion.button
                      initial={{x: '100vw', rotate: 90}}
                      animate={{x: 0, rotate: 0}}
                      transition={{delay: 0.1, duration: 1}}
                    >Add Note
                </motion.button>
              </form>
              <div className='error'>{error}</div>
            </>
        : ''}

        {imgQuestion ? 
          <div className="add-img-btn-label">
            <p>Add an image instead?</p>
            <button onClick={onImgAdd}>Add Image</button>
          </div>
          : ''}
            
            {addImg ? 
                <div className="add-img-section">
                  <form className='img-form'>
                  <input type="file" 
                      id='images'
                      onChange={onMutate}
                      max='1'
                      accept='.jpg,.png,.jpeg'
                  />
                  <button onClick={imgSubmit}>Upload</button>
                  </form>
                  <button onClick={cancelImg}>Cancel</button>
                </div>
          : ''}
        </div>
      </div>
    </div>
  )
}

export default CreateNote