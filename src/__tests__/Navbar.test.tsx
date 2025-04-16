// unit test
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

test('toggles mobile menu', () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );

  const menuButton = screen.getByRole('button'); // Hamburger button
  fireEvent.click(menuButton);

  expect(screen.getByText('Home')).toBeInTheDocument();
});
