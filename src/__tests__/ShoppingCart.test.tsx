// unit test
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store'; 
import ShoppingCart from '../components/ShoppingCart';

test('renders the cart items', () => {
  render(
    <Provider store={store}>
      <ShoppingCart />
    </Provider>
  );

  expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
});

test('removes item from cart', () => {
  render(
    <Provider store={store}>
      <ShoppingCart />
    </Provider>
  );

  const removeButton = screen.getByText('Remove');
  fireEvent.click(removeButton);

  // Assert that the item was removed from the cart
  expect(store.getState().cart.items.length).toBe(0);
});
