// integration testing
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store'; 
import Home from '../components/Home';
import ShoppingCart from '../components/ShoppingCart';
import { BrowserRouter as Router } from 'react-router-dom';

test('adds a product to the cart and updates ShoppingCart', async () => {
  render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  );

  // Wait for products to be displayed
  await waitFor(() => screen.getByText('All Categories'));

  // Simulate selecting a product to add to the cart
  const addToCartButton = screen.getByText('Add to Cart');
  fireEvent.click(addToCartButton);

  // Verify that the product was added to the Redux store (cart)
  const state = store.getState();
  expect(state.cart.items.length).toBeGreaterThan(0); // Cart should have 1 item now

  // Now, let's render the ShoppingCart component to check if it's updated
  render(
    <Provider store={store}>
      <Router>
        <ShoppingCart />
      </Router>
    </Provider>
  );

  // Verify that the cart contains the item we just added
  const cartItem = screen.getByText(/Product 1/); // Replace with actual product title
  expect(cartItem).toBeInTheDocument();

  // Verify the cart total is updated (optional, depends on your cart logic)
  const totalAmount = screen.getByText(/Total Price:/);
  expect(totalAmount).toBeInTheDocument();
});
