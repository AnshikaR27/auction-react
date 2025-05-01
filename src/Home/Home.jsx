import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Bidizy</h1>
          <p>Place bids. Win big. Find unbeatable deals.</p>
          <Link to="/listings" className="btn-primary">Browse Auctions</Link>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Browse Categories</h2>
        <div className="category-grid">
          <div className="category-card">Electronics</div>
          <div className="category-card">Vehicles</div>
          <div className="category-card">Real Estate</div>
          <div className="category-card">Fashion</div>
          <div className="category-card">Collectibles</div>
          <div className="category-card">Services</div>
        </div>
      </section>

      {/* Trending Bids */}
      <section className="trending-bids">
        <h2>Trending Auctions</h2>
        <div className="bids-grid">
          <div className="bid-card">
            <img src="https://via.placeholder.com/200" alt="Product" />
            <h3>iPhone 14 Pro</h3>
            <p>Current Bid: ₹65,000</p>
            <Link to="/auction/1">Bid Now</Link>
          </div>
          <div className="bid-card">
            <img src="https://via.placeholder.com/200" alt="Product" />
            <h3>Yamaha R15 V4</h3>
            <p>Current Bid: ₹1,10,000</p>
            <Link to="/auction/2">Bid Now</Link>
          </div>
          <div className="bid-card">
            <img src="https://via.placeholder.com/200" alt="Product" />
            <h3>Luxury Apartment, Kolkata</h3>
            <p>Current Bid: ₹75 Lakhs</p>
            <Link to="/auction/3">Bid Now</Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Register</h3>
            <p>Create your free account to start bidding.</p>
          </div>
          <div className="step">
            <h3>2. Explore</h3>
            <p>Browse categories and find auctions that interest you.</p>
          </div>
          <div className="step">
            <h3>3. Bid & Win</h3>
            <p>Place your bids and win amazing items!</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Have something to sell?</h2>
        <p>Start your auction today and reach thousands of bidders!</p>
        <Link to="/sell" className="btn-secondary">Start Selling</Link>
      </section>
    </div>
  );
};

export default Home;
