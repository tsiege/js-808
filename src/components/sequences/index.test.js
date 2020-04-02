import React from 'react'
import { render } from '@testing-library/react'
import Sequence from '.'

test('renders itself', () => {
  const { getByText } = render(<Sequence sequences={['Sequence 1']}/>)
  const h1Element = getByText(/Sequence 1/i)
  expect(h1Element).toBeInTheDocument()
})
