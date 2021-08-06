import { render, screen } from '@testing-library/react'
import App from './App'

test('Renders initial App', () => {
  render(<App />)
  const linkElement = screen.getByText('RXJS demo with react')
  expect(linkElement).toBeInTheDocument()
});
