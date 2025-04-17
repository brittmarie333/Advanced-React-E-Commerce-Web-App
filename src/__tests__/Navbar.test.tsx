
//unit test

import { screen, fireEvent, waitFor } from '@testing-library/react';
import renderWithProviders from '../test-utils';
import Navbar from '../components/Navbar';

test('toggles mobile menu', async () => {
  renderWithProviders(<Navbar />);

  const menuButton = screen.getByRole('button');
  fireEvent.click(menuButton);

  // waitfor menu to toggle
  await waitFor(() => screen.getByText('Home'));

  expect(screen.getByText('Home')).toBeInTheDocument();
});

