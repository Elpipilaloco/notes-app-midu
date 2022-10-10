import './App.css'
import { useState, useEffect } from 'react'
import { LoginForm } from './components/LoginForm'
import { getAllNotes, createNote, setToken } from './services/notes'
import { login } from './services/login'
import { NoteForm } from './components/NoteForm'

function App () {
  const [notes, setNotes] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    getAllNotes()
      .then(notes => {
        setNotes(notes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const addNote = (noteToAdd) => {
    createNote(noteToAdd)
      .then(
        newNote => {
          setNotes((prevNotes) => prevNotes.concat(newNote))
        })
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await login({
        username,
        password
      })

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <h1>Hola</h1>
      {
        user
          ? <NoteForm notes={notes} addNote={addNote} handleLogout={handleLogout} />
          : <LoginForm username={username} password={password} handleUsernameChange={({ target }) => setUsername(target.value)} handlePasswordChange={({ target }) => setPassword(target.value)} handleLoginSubmit={handleLoginSubmit} />
      }
    </div>
  )
}

export default App
