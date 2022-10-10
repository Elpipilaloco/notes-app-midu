import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

export const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [Visible, setVisible] = useState(false)

  const hideWhenVisible = { display: Visible ? 'none' : '' }
  const showWhenVisible = { display: Visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!Visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>Cancelar</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
