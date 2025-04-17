import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from '../components/Home';

const queryClient = new QueryClient();

test('adds a product from a specific category to the cart', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    </QueryClientProvider>
  );

  // Wait for products to display and category selection dropdown
  await waitFor(() => screen.getByText('All Categories'));

  // Select "men's clothing" category
  const categorySelect = screen.getByRole('combobox'); // Category dropdown
  fireEvent.change(categorySelect, { target: { value: "men's clothing" } });

  // Wait for the category to update and products to be filtered
  await waitFor(() => screen.getByText(/Mens Casual Premium Slim Fit T-Shirts/));

  // Find all "Add to Cart" buttons
  const addToCartButtons = screen.getAllByText(/Add to Cart/i);

  // Click the "Add to Cart" button for the second product (e.g., Mens Casual Premium Slim Fit T-Shirts)
  fireEvent.click(addToCartButtons[1]);  // Adjust index based on the product you want to interact with

  // Check if the product has been added to the cart
  const state = store.getState();
  expect(state.cart.items.length).toBeGreaterThan(0);  // Cart should have at least one item

  // Optionally, verify if the cart now contains the added product
  await waitFor(() => screen.getByText(/Mens Casual Premium Slim Fit T-Shirts/)); // Check cart
  expect(screen.getByText(/Mens Casual Premium Slim Fit T-Shirts/)).toBeInTheDocument();
});
