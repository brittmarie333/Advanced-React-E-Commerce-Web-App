import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { RootState } from '../redux/store';

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

  const handleClearCart = () => {
    dispatch(clearCart());
    sessionStorage.removeItem('cart');
    alert('All items have been removed from your cart!');
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {/* If cart is empty, show an empty cart message */}
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => (
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
          ))
        )}
      </div>
      <div className="cart-summary">
        {cart.length > 0 && (
          <>
            <p>Total Products: {totalCount}</p>
            <p>Total Price: ${totalAmount.toFixed(2)}</p>
            <button onClick={handleCheckout}>Checkout</button>
            <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
