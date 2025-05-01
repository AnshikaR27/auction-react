import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephone } from 'react-icons/bs';
import { GiWorld } from 'react-icons/gi';
import './Contact.scss';

const Contact = () => {
  return (
    <div className="contact">
      {/* Hero Section */}
      <div className="contact__hero">
        <h1>Contact Us</h1>
        <p>Need help? We're here to assist you.</p>
      </div>

      {/* Contact Info & Form */}
      <div className="contact__container">
        {/* Info */}
        <div className="contact__info">
          <h2>Reach Us</h2>
          <p><HiOutlineMail /> info@bidify.com</p>
          <p><BsTelephone /> +91 98765 43210</p>
          <p><GiWorld /> www.bidify.com</p>

          <div className="contact__socials">
            <a href="https://facebook.com"><FaFacebookF /></a>
            <a href="https://twitter.com"><FaTwitter /></a>
            <a href="https://instagram.com"><FaInstagram /></a>
            <a href="https://linkedin.com"><FaLinkedin /></a>
          </div>
        </div>

        {/* Form */}
        <div className="contact__form">
          <h2>Send Us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="contact__map">
        <iframe
          title="Bidify Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.268301593547!2d88.48242807432379!3d22.60466653290671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02761363c9c39f%3A0x4a69086b27dfb0e!2sAnimikha%20Housing%20Complex!5e0!3m2!1sen!2sin!4v1682062172036!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
