import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Note } from './Note'

test('renders content', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  render(<Note {...note} />)

  expect(screen.getByText('This is a test')).toBeInTheDocument()
})
