import React from 'react';
import { Provider } from 'react-redux'; 
import { QueryClient, QueryClientProvider } from 'react-query'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import store from './redux/store'; 
import Home from './components/Home'; 
import ShoppingCart from './components/ShoppingCart'; 
import Navbar from './components/Navbar';



const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}> 
      <QueryClientProvider client={queryClient}>
        <Router> 
          <Navbar />
            {/* Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
