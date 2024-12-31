import React, { useState, useEffect } from 'react';
import './App.css';
import { FaBackspace, FaShoppingCart } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="navbar">
      <h2>DailyApp</h2>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#cart">Cart</a></li>
      </ul>
    </nav>
  );
};

const App = () => {
  const [products, setProducts] = useState([]); // Store fetched products
  const [cart, setCart] = useState([]); // Store cart items

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products); // Save fetched products
    };
    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]); // Add to cart array
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <NavBar />

      <header className="header">
        <h1 id="home">Welcome to Shopping Our Company</h1>
        <div className="cart-icon">
          <FaShoppingCart />
          <span>{cart.length}</span>
        </div>
      </header>

      <main className="main-content">
        <section className="product-list" id="products">
          <h2>Products</h2>
          <div className="products">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        <section className="cart" id="cart">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.title} - ${item.price}
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 Shopping App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

