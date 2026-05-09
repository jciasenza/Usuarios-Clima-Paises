import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main routes title', () => {
  render(<App />);
  const linkElement = screen.getByText(/RUTAS CON API/i);
  expect(linkElement).toBeInTheDocument();
});
