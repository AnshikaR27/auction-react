import React from 'react';
import './App.css';
import Header from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Listings from './Listings/Listings';
import Categories from './Categories/Categories';
import Register from './Register/Register';
import Login from './Login/Login';
import Cart from './Cart/Cart';
import Wachtlist from './Watchlist/Wachtlist';
import Contact from './Contact/Contact';
import About from './About/About';
import Support from './Support/Support';
import Notifications from './Notifications/Notifications';
import Sell from './Sell/Sell';
import Footer from './Footer';

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/listings' element={<Listings />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/watchlist' element={<Wachtlist />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/support' element={<Support />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/sell' element={<Sell />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
