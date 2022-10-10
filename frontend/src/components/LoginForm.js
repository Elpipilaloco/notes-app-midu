import { Togglable } from './Togglable'
import PropTypes from 'prop-types'

export const LoginForm = ({ handleLoginSubmit, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <Togglable buttonLabel='Mostrar login'>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <input type='text' value={username} name='Username' placeholder='Username' onChange={handleUsernameChange} />
        </div>
        <div>
          <input type='password' value={password} name='Password' placeholder='Password' onChange={handlePasswordChange} />
        </div>
        <button id='form-login-button'>Login</button>
      </form>
    </Togglable>
  )
}

LoginForm.protTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}
