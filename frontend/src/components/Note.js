export const Note = ({ ...note }) => {
  return (
    <div className='App'>
      <p>{note.content}</p>
    </div>
  )
}
