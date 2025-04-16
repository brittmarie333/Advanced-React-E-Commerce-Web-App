//unit test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store  from '../redux/store'; 
import Home from '../components/Home';

test('renders the products and categories', async () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  // Wait for categories and products to load
  await waitFor(() => screen.getByText('All Categories'));

  // Check if the dropdown renders categories
  const select = screen.getByRole('combobox');
  fireEvent.change(select, { target: { value: 'electronics' } });

  // Verify product filtering
  expect(screen.getByText('Electronics Product 1')).toBeInTheDocument();
});

test('adds product to cart', async () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  const button = screen.getByText('Add to Cart');
  fireEvent.click(button);

  // Check if Redux action is dispatched correctly
  expect(store.getState().cart.items.length).toBeGreaterThan(0);
});
