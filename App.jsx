import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Layout({ children, cart, setCart }) {
  const [showCart, setShowCart] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const updateQty = (index, amount) => {
    const updated = [...cart];
    updated[index].qty += amount;

    if (updated[index].qty <= 0) {
      updated.splice(index, 1);
    }

    setCart(updated);
  };

  const removeAll = () => setCart([]);

  return (
    <div>
      <header className="header">
        <div className="container">
          <h2>audiophile</h2>

          <nav className="nav">
            <Link to="/" className="link">HOME</Link>
            <Link to="/headphones" className="link">HEADPHONES</Link>
            <Link to="/speakers" className="link">SPEAKERS</Link>
            <Link to="/earphones" className="link">EARPHONES</Link>
          </nav>

          <div style={{ position: "relative" }}>
            <button onClick={() => setShowCart(!showCart)} className="cartBtn">
              🛒 ({cart.length})
            </button>

            {showCart && (
              <div className="cartDropdown">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                  <h4>CART ({cart.length})</h4>
                  <span onClick={removeAll} style={{ cursor: "pointer", color: "#888" }}>
                    Remove all
                  </span>
                </div>

                {cart.map((item, i) => (
                  <div key={i} className="cartItem">
                    <img src={item.image} alt="" style={{ width: "50px", borderRadius: "5px" }} />

                    <div style={{ flex: 1 }}>
                      <p>{item.title}</p>
                      <p>${item.price}</p>
                    </div>

                    <div className="qtyBox">
                      <button onClick={() => updateQty(i, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(i, 1)}>+</button>
                    </div>
                  </div>
                ))}

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                  <span>TOTAL</span>
                  <strong>${total}</strong>
                </div>

                <button className="button" style={{ width: "100%", marginTop: "15px" }}>
                  CHECKOUT
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div>{children}</div>

      <Footer />
    </div>
  );
}

function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>XX99 MARK II HEADPHONES</h1>
          <p style={{ maxWidth: "400px", margin: "20px 0" }}>
            Experience natural, lifelike audio and exceptional build quality.
          </p>
          <Link to="/headphones">
            <button className="button">SHOP NOW</button>
          </Link>
        </div>
      </section>

      <section className="zx9">
        <div className="container">
          <h2>ZX9 SPEAKER</h2>
          <p style={{ maxWidth: "400px", margin: "20px 0" }}>
            Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
          </p>

          <Link to="/speakers">
            <button className="button" style={{ background: "#000" }}>
              SEE PRODUCT
            </button>
          </Link>
        </div>
      </section>

      <section className="categoryWrapper">
        <Category title="HEADPHONES" link="/headphones" />
        <Category title="SPEAKERS" link="/speakers" />
        <Category title="EARPHONES" link="/earphones" />
      </section>
    </div>
  );
}

function Category({ title, link }) {
  return (
    <div className="categoryBox">
      <h3>{title}</h3>
      <Link to={link}>SHOP →</Link>
    </div>
  );
}

function Product({ title, price, image, addToCart }) {
  return (
    <div className="container" style={{ marginTop: "60px" }}>
      <img src={image} style={{ width: "300px" }} alt="" />
      <h2>{title}</h2>
      <h3>${price}</h3>

      <button onClick={() => addToCart({ title, price, image })} className="button">
        ADD TO CART
      </button>
    </div>
  );
}

function Headphones({ addToCart }) {
  return (
    <Product
      title="XX99"
      price={2999}
      addToCart={addToCart}
      image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    />
  );
}

function Speakers({ addToCart }) {
  return (
    <Product
      title="ZX9"
      price={4500}
      addToCart={addToCart}
      image="https://images.unsplash.com/photo-1589003077984-894e133dabab"
    />
  );
}

function Earphones({ addToCart }) {
  return (
    <Product
      title="YX1"
      price={599}
      addToCart={addToCart}
      image="https://images.unsplash.com/photo-1518444065439-e933c06ce9cd"
    />
  );
}

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find((i) => i.title === item.title);

    if (existing) {
      setCart(
        cart.map((i) =>
          i.title === item.title ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  return (
    <Router>
      <Layout cart={cart} setCart={setCart}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/headphones" element={<Headphones addToCart={addToCart} />} />
          <Route path="/speakers" element={<Speakers addToCart={addToCart} />} />
          <Route path="/earphones" element={<Earphones addToCart={addToCart} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

function Footer() {
  return (
    <>
      <section className="footerTop">
        <div className="footerTopInner">
          <div style={{ maxWidth: "500px" }}>
            <h2>
              BRINGING YOU THE <span style={{ color: "#d87d4a" }}>BEST</span> AUDIO GEAR
            </h2>
            <p style={{ color: "#555", marginTop: "20px" }}>
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio accessories.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
            alt=""
            className="footerImg"
          />
        </div>
      </section>

      <footer className="footerBottom">
        <div className="container">
          <h3>audiophile</h3>

          <p style={{ maxWidth: "500px", color: "#aaa" }}>
            Audiophile is an all in one stop to fulfill your audio needs.
          </p>

          <nav className="nav" style={{ marginTop: "20px" }}>
            <Link to="/" className="link">HOME</Link>
            <Link to="/headphones" className="link">HEADPHONES</Link>
            <Link to="/speakers" className="link">SPEAKERS</Link>
            <Link to="/earphones" className="link">EARPHONES</Link>
          </nav>

          <p style={{ color: "#777", marginTop: "20px" }}>
            Copyright 2026. All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}