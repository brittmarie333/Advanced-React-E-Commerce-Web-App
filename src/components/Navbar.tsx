import { useState } from 'react';
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
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/" className="navbar-item">Home</Link></li>
          <li><Link to="/cart" className="navbar-item">Shopping Cart</Link></li>
        </ul>
      </div>
      {/* Hamburger menu for mobile */}
      <div className="hamburger" onClick={toggleMenu} role="button" aria-label="Toggle menu">
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  );
};

export default Navbar;
