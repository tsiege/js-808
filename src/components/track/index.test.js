import React from 'react'
import { render } from '@testing-library/react'
import Track from '.'

test('renders itself', () => {
  const sequence = new Array(16).fill(false)
  const { getByText } = render(<Track name='Kick' sequence={sequence} />)
  const h1Element = getByText(/Kick/i)
  expect(h1Element).toBeInTheDocument()
})
