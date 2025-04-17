import { screen } from '@testing-library/react';
import renderWithProviders from '../test-utils'; // Make sure this function wraps necessary providers
import ShoppingCart from '../components/ShoppingCart'; // Adjust the path if needed

test('cart is empty initially', async () => {
  renderWithProviders(<ShoppingCart />);

  // Check for the empty cart message
  const emptyCartMessage = screen.queryByText('Your cart is empty');
  expect(emptyCartMessage).toBeInTheDocument();  // Ensure that the empty cart message is displayed
});
