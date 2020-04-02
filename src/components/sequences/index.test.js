import React from 'react'
import { render } from '@testing-library/react'
import { isElementOfType } from 'react-dom/test-utils';
import Button from '.'

test('renders itself', () => {
  const { baseElement } = render(<Button playing='playing' />)
  isElementOfType(baseElement, <button></button>)
})
