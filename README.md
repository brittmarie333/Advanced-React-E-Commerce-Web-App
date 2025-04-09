# Advanced React E-Commerce Web App

## Description

This project is an e-commerce web application built using React, Redux Toolkit, and React Query, which allows users to browse and manage products in a store, with an emphasis on a user-friendly experience for selecting categories, adding products to the cart, and managing their shopping cart state.

## Features

- **Product Catalog**:
  - **Product Listing and Display**: The Home component fetches product data using React Query from the FakeStoreAPI. It displays product details such as title, price, category, description, rating, and image. Each product includes a button for adding it to the shopping cart.

- **Category Navigation**:
  - A dropdown is dynamically populated with product categories fetched from the FakeStoreAPI. Users can filter products based on category selection, with React Query making API requests to fetch products of the selected category.

- **Shopping Cart**:
  - **State Management**: Redux Toolkit is used to manage the shopping cart state, allowing for adding, updating, and removing products from the cart.
  - **Cart Component**: Users can view the products added to their cart, including details like product title, image, count, and price. Each product has a button to remove it from the cart.
  - **Persistence**: Shopping cart data is stored in sessionStorage, ensuring persistence across different browser sessions. The cart data is retrieved and updated as the user interacts with the application.

- **Checkout**:
  - A simulated checkout functionality is implemented where users can clear their cart after making a purchase. Redux state and sessionStorage are both cleared, and users receive feedback indicating the successful completion of the checkout process.

- **Real-Time Updates**:
  - Total product count and total price in the shopping cart are dynamically updated as the user adds, removes, or updates products, providing real-time feedback and an accurate view of the shopping cart's contents.

### Technologies Used

- **React**
- **TypeScript**
- **Redux**
- **CSS**

#### Resources Used: :mag:
- [Google Fonts](https://fonts.google.com/)
- [Color Hunt](https://colorhunt.co/)
- [YouTube](https://youtube.com)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [GeeksforGeeks](https://www.geeksforgeeks.org/)
- [ChatGPT](https://chat.openai.com)

## Getting Started

1. **Clone the repository**:
   
bash
   git clone https://github.com/brittmarie333/Advanced-React-E-Commerce-Web-App.git
2. **Install dependencies**:
    npm install
3. **Run the Application**:
    npm run dev


## HomePage
This is your landing page and you can easily use the drop down filter to locate the department you would like to browse. You can add items to your shopping cart directly from the home page. It's automatically loaded with all items, use the filter to organize your experience.

```
const Home: React.FC = () => {
  const { data: products, isLoading: productsLoading } = useFetchProducts();
  const { data: categories, isLoading: categoriesLoading } = useFetchCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const dispatch = useDispatch();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products?.filter(product => product.category === selectedCategory);

  if (productsLoading || categoriesLoading) return <div>Loading...</div>;

  return (
    <div className="home">
      {/* filter dropdown */}
      <select onChange={handleCategoryChange} className="category-select">
        <option value="all">Categories</option>
        {categories?.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      {/* product list */}
      <div className="product-list">
        {filteredProducts?.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;


```


## Shopping Cart
You will find my items stored in sessionStorage waiting for checkout. Once checkout is complete, a modal will appear confirming checkout and, once closed your page will refresh and you can navigate back to home and continue shopping.

 ```
const ShoppingCart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product));
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    sessionStorage.removeItem('cart');
    alert('Checkout successful! Your cart has been cleared.');
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-details">
              <img src={item.image} alt={item.title} className="product-image" />
              <div>
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="item-price">
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Total Products: {totalCount}</p>
        <p>Total Price: ${totalAmount.toFixed(2)}</p>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};
```

## Navbar
A simple Navbar allows you to easily navigate between the Home page and Shopping Cart. The navbar also shrinks to a hamburger menu when viewed from mobile or smaller screens.
 
```
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // toggle the menu on mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">Fake Store</Link>
      </div>
      <div className={navbar-links ${isMenuOpen ? 'active' : ''}}>
        <ul>
          <li><Link to="/" className="navbar-item">Home</Link></li>
          <li><Link to="/cart" className="navbar-item">Shopping Cart</Link></li>
        </ul>
      </div>
      {/* Hamburger menu for mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  );
};

export default Navbar;
```

## REDUX components: 
This is where my redux store and cartSlice are held and a snippet of cartSlice below.
```
interface CartItem {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
```

## Hooks
There are two different files in hooks for fetch categories and fetch products from the fake store api.
```
categories:
// async function to fetch product categories
const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get<string[]>('https://fakestoreapi.com/products/categories');
  return response.data; 
};

// custom hook to fetch categories
export const useFetchCategories = () => {
  return useQuery<string[], Error>('categories', fetchCategories);
};

products: 
// async function to fetch products
const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
  return response.data; 
};

// custom hook to fetch products
export const useFetchProducts = () => {
  return useQuery<Product[], Error>('products', fetchProducts);
};
```