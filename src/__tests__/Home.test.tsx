import { screen, fireEvent, waitFor } from '@testing-library/react';
import renderWithProviders from '../test-utils';  // Ensure this function wraps necessary providers
import Home from '../components/Home';

test('renders the products and categories', async () => {
  renderWithProviders(<Home />);

  // Wait for the "All Categories" dropdown to load
  await waitFor(() => screen.getByText('All Categories'));

  const select = screen.getByRole('combobox');
  fireEvent.change(select, { target: { value: 'electronics' } });

  // Wait for the products to be loaded and rendered
  await waitFor(() => screen.getByText('WD 2TB Elements Portable External Hard Drive - USB 3.0'));

  // Check that one of the products in the electronics category is displayed
  expect(screen.getByText('WD 2TB Elements Portable External Hard Drive - USB 3.0')).toBeInTheDocument();
});
