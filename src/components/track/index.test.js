import React from 'react'
import { render } from '@testing-library/react'
import Track from '.'

test('renders itself', () => {
  const { getByText } = render(<Track name='Kick'/>)
  const h1Element = getByText(/Kick/i)
  expect(h1Element).toBeInTheDocument()
})
