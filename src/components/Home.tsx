import React, { useState } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

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
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products?.filter(product => product.category === selectedCategory);

  if (productsLoading || categoriesLoading) return <div>Loading...</div>;

  return (
    <div className="home">
      {/* Filter Dropdown */}
      <div className="dropdown-container">
        <select onChange={handleCategoryChange} className="category-select">
          <option value="all">All Categories</option>
          {categories?.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Product List */}
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
