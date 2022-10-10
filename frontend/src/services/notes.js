import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAllNotes = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const createNote = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const req = axios.post(baseUrl, newObject, config)
  return req.then(res => res.data)
}

const updateNote = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const req = axios.put(`${baseUrl}/${id}`, newObject, config)
  return req.then(res => res.data)
}

export { getAllNotes, createNote, updateNote, setToken }
