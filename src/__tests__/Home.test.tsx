//unit test

import { screen, fireEvent, waitFor } from '@testing-library/react';
import renderWithProviders from '../test-utils';  
import Home from '../components/Home';

test('renders the products and categories', async () => {
  renderWithProviders(<Home />);

  //waitfor all categories dropdown
  await waitFor(() => screen.getByText('All Categories'));

  const select = screen.getByRole('combobox');
  fireEvent.change(select, { target: { value: 'electronics' } });

  // waitfor products to load and render
  await waitFor(() => screen.getByText('WD 2TB Elements Portable External Hard Drive - USB 3.0'));

  //verify that electronic is displayed 
  expect(screen.getByText('WD 2TB Elements Portable External Hard Drive - USB 3.0')).toBeInTheDocument();
});
 