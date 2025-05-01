import React from "react";
import "./About.scss";

const About = () => {
  return (
    <div className="about">
      {/* Intro Section */}
      <section className="about-hero">
        <h1>About Us</h1>
        <p>Empowering people through smarter bidding.</p>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          At Bidify, we aim to revolutionize online auctions by making bidding simple, secure, and accessible to everyone. Whether you're a buyer looking for the best deals or a seller looking to reach a wide audience, Bidify is your go-to platform.
        </p>
      </section>

      {/* How It Works */}
      <section className="how-we-work">
        <h2>How Bidify Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Sign Up</h3>
            <p>Create a free account to start participating in auctions.</p>
          </div>
          <div className="step">
            <h3>2. Bid & Compete</h3>
            <p>Place live bids and outbid others to win exciting products.</p>
          </div>
          <div className="step">
            <h3>3. Win & Receive</h3>
            <p>Win auctions and get your items delivered safely.</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values">
        <h2>Our Core Values</h2>
        <ul>
          <li><strong>Transparency:</strong> Clear and open bidding process.</li>
          <li><strong>Trust:</strong> Verified sellers and buyers.</li>
          <li><strong>Innovation:</strong> Tech-driven platform with live bidding tools.</li>
          <li><strong>Support:</strong> 24/7 customer assistance.</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>"I won a smartphone for half the market price. Bidify is amazing!"</p>
            <span>- Priya M., Kolkata</span>
          </div>
          <div className="testimonial">
            <p>"As a seller, I love how quickly my items get noticed and sold!"</p>
            <span>- Anil K., Mumbai</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Join the Future of Bidding</h2>
        <p>Register now and start exploring live auctions today.</p>
        <a href="/login" className="btn-about">Get Started</a>
      </section>
    </div>
  );
};

export default About;
