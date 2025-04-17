import { screen } from '@testing-library/react';
import renderWithProviders from '../test-utils';
import ShoppingCart from '../components/ShoppingCart'; 

test('cart is empty initially', async () => {
  renderWithProviders(<ShoppingCart />);

  //check for empty cart message to indicate cart is empty
  const emptyCartMessage = screen.queryByText('Your cart is empty');
  expect(emptyCartMessage).toBeInTheDocument(); 
});
