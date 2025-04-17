
# 🛒 Advanced React E-Commerce Web App

## Description

A sleek, responsive e-commerce web app using **React**, **Redux Toolkit**, and **React Query**, powered by the [FakeStoreAPI](https://fakestoreapi.com/). Users can browse products, filter by category, manage their cart with session persistence, and simulate a checkout.

---

## 🔧 Features

### 🛍️ Product Catalog
- Fetches all products using **React Query**
- Displays title, price, category, description, rating, and image
- Users can add items to the cart from the home page

### 🗂️ Category Navigation
- Dynamically populates a dropdown from the FakeStoreAPI (not hard-coded)
- Filters products by selected category in real-time

### 🛒 Shopping Cart
- Built with **Redux Toolkit**
- View, add, update, and remove products from the cart
- Displays product image, title, quantity, and total price
- Persists cart in `sessionStorage`

### 💳 Checkout Simulation
- Clears Redux state and sessionStorage
- Shows visual feedback on successful checkout

### 🔁 Real-Time Updates
- Dynamically calculates and updates total items and total cost in cart

---

## 🧪 Tech Stack

- **React** + **TypeScript**
- **Redux Toolkit**
- **React Query (TanStack)**
- **Axios**
- **CSS**

---

## 📦 Getting Started

```bash
git clone https://github.com/brittmarie333/Advanced-React-E-Commerce-Web-App.git
cd fake-store
npm install
npm run dev
```

---

## 🖥️ Components Overview

### 🏠 Home Page

Displays all products and category filter.

```tsx
const Home: React.FC = () => {
  const { data: products } = useFetchProducts();
  const { data: categories } = useFetchCategories();
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

  return (
    <div className="home">
      <select onChange={handleCategoryChange} className="category-select">
        <option value="all">Categories</option>
        {categories?.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <div className="product-list">
        {filteredProducts?.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 🛒 Shopping Cart Component

```tsx
const ShoppingCart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product));
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    sessionStorage.removeItem('cart');
    alert('Checkout successful!');
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div>
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-summary">
        <p>Total Products: {totalCount}</p>
        <p>Total Price: ${totalAmount.toFixed(2)}</p>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};
```

### 🔁 Redux Slice Snippet

```ts
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const initialState = {
  items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(i => i.id !== action.payload.id);
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});
```

---

## ⚓ Hooks

```ts
// useFetchProducts.ts
const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get('https://fakestoreapi.com/products');
  return res.data;
};

export const useFetchProducts = () => {
  return useQuery('products', fetchProducts);
};

// useFetchCategories.ts
const fetchCategories = async (): Promise<string[]> => {
  const res = await axios.get('https://fakestoreapi.com/products/categories');
  return res.data;
};

export const useFetchCategories = () => {
  return useQuery('categories', fetchCategories);
};
```

---

## 🌐 Useful Resources

- [TanStack Query Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- [Google Fonts](https://fonts.google.com/)
- [Color Hunt](https://colorhunt.co/)
- [YouTube](https://youtube.com)
- [GeeksforGeeks](https://www.geeksforgeeks.org/)
- [ChatGPT](https://chat.openai.com/)

---

## 🎓 Final Project Features & Updates
##  Advanced React E-Commerce Web App (FINAL PROJECT VERSION)

A full-featured e-commerce web app built with React, Redux, Firebase, and TypeScript — complete with user authentication, Firestore-based product and order management, protected routes, and responsive design. Now with full CI/CD pipeline integration and automated deployment to Vercel.

## 🚀 Live Demo

🔗 [View Live Site on Vercel](https://advanced-react-e-commerce-web-app-49m8.vercel.app/)

---

## 📦 Features

- 🔥 Firebase Authentication (Sign Up, Login, Logout)
- 🛍️ Firestore for Product & Order CRUD operations
- 💾 Redux for global state management
- 👤 User Profile Management
- 🔐 Protected Routes
- 📱 Fully Responsive Design
- ✅ CI/CD Pipeline with GitHub Actions
- 🧪 Unit & Integration Testing (Test-Driven Development)

---

## ✅ Requirement Checklist (For Presentation)

### ✔️ CI/CD Pipeline (GitHub Actions + Vercel)
- [x] Workflow triggers on `main` branch push/pull
- [x] Runs tests via Jest on every push
- [x] Deployment **only** happens after tests pass
- [x] Uses secure secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

### ✔️ Test-Driven Development (TDD)
- [x] At least **two unit tests** for separate components (e.g., rendering, interaction)
- [x] One **integration test**: adding a product updates the cart

### ✔️ Deployment & Hosting
- [x] Automatically deployed and hosted via [Vercel](https://vercel.com/)
- [x] Final app is accessible to the public

---

## 🔁 CI/CD Pipeline Details

### Continuous Integration (CI)
- **Tools**: GitHub Actions + Jest
- **Steps**: 
  - Install dependencies
  - Run tests
  - Block deployment if any test fails

### Continuous Deployment (CD)
- **Tool**: Vercel
- **Trigger**: Only after successful CI
- **Secrets**:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`

GitHub Actions Workflow: `.github/workflows/main.yml`

---

## 🧪 Testing Summary

### Unit Tests
- ✅ Separate components tested using Jest + RTL
- ✅ Verifies rendering, state changes, interaction

### Integration Test
- ✅ Adding product to cart updates cart display and state

```bash
npm test
```

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Redux Toolkit
- **Backend**: Firebase Authentication, Firestore
- **CI/CD**: GitHub Actions + Vercel
- **Testing**: Jest, React Testing Library
- **Styling**: CSS / Responsive Design

---

## 📂 Getting Started

```bash
git clone https://github.com/brittmarie333/Advanced-React-E-Commerce-Web-App.git
cd Advanced-React-E-Commerce-Web-App
npm install
npm start
```

---

## 🌐 Deployment Guide

1. Create a new project on Vercel
2. Set required Firebase ENV variables
3. Connect your GitHub repo
4. Add secrets to GitHub repo:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

---

## 🧠 Author

Developed by [Brittany Pitts](https://github.com/brittmarie333)  
Final project for Frontend Specialization!