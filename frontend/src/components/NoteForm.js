import { Note } from './Note'
import { useState, useRef } from 'react'
import { Togglable } from './Togglable'

export const NoteForm = ({ notes, handleLogout, addNote }) => {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const noteToAdd = {
      content: newNote,
      important: true
    }

    addNote(noteToAdd)
    setNewNote('')

    togglableRef.current.toggleVisibility()
  }

  const notasTodas = notes.map(note =>
    <Note key={note.id} {...note} />
  )
  return (
    <Togglable buttonLabel='New Note' ref={togglableRef}>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Escribe tu nota' onChange={handleChange} value={newNote} />
        <button>Crear nota</button>
      </form>
      <div>
        <button onClick={handleLogout}>
          Cerrar sesion
        </button>
      </div>
      <div>{notasTodas}</div>
    </Togglable>
  )
}
