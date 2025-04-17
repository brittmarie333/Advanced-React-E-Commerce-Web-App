//integration test

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

  // waitfor products to display and category selection dropdown
  await waitFor(() => screen.getByText('All Categories'));

  // select "men's clothing" category
  const categorySelect = screen.getByRole('combobox'); // Category dropdown
  fireEvent.change(categorySelect, { target: { value: "men's clothing" } });

  // waitfor the category to update and products to filter
  await waitFor(() => screen.getByText(/Mens Casual Premium Slim Fit T-Shirts/));

  // find all add to cart buttons - got so many errors and this works!
  const addToCartButtons = screen.getAllByText(/Add to Cart/i);

  // addtocart button for the second product --> Mens Casual Premium Slim Fit T-Shirts -copied from site
  fireEvent.click(addToCartButtons[1]);  

  // verify item in cart
  const state = store.getState();
  expect(state.cart.items.length).toBeGreaterThan(0);  // cart will have at least one item 
 
  await waitFor(() => screen.getByText(/Mens Casual Premium Slim Fit T-Shirts/)); //check the shoppingcart
  expect(screen.getByText(/Mens Casual Premium Slim Fit T-Shirts/)).toBeInTheDocument();
});
