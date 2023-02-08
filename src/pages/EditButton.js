import React from 'react'

const EditButton = ({setNewNoteData, newNoteData, item, updateSubmit}) => {
  return (
    <div className='edit-note-container'>
        <input type="text"
            placeholder='update note'
            onChange={(e) => setNewNoteData(e.target.value)}
        />
        <button onClick={() => {updateSubmit(item.id, newNoteData)}}>save</button>
    </div>
  )
}

export default EditButton