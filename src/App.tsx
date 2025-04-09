import React from 'react';
import { Provider } from 'react-redux'; 
import { QueryClient, QueryClientProvider } from 'react-query'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import store from './redux/store'; 
import Home from './components/Home'; 
import ShoppingCart from './components/ShoppingCart'; 
import './App.css'; 


const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}> 
      <QueryClientProvider client={queryClient}>
        <Router> 
          <div className="App">
            <h1><center>Fake Store</center></h1>
           
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cart">Shopping Cart</Link></li>
              </ul>
            </nav>

            {/* Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
