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
import Wachtlist from './Watchlist/Watchlist';
import Contact from './Contact/Contact';
import About from './About/About';
import Support from './Support/Support';
import Notifications from './Notifications/Notifications';
import { MyProvider } from './MyContext/MyContext';


import Footer from './Footer';
import SellForm from './Sell/Sell';
import MyContextProvider from './MyContext/MyContextProvider';
import ListingDetail from './ListingDetail/ListingDetail';
import Comments from './Comments/Comments'; // adjust the path as needed
import ManageListings from './ManageListings/ManageListings';



function App() {
  return (
 
      <BrowserRouter>
      <MyProvider>
        <Header />
        
      
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/listings' element={<Listings />} />
            <Route path="/comments/:listingId" element={<Comments />} />
            <Route path='/categories/:categoryName' element={<Categories />} />

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/watchlist' element={<Wachtlist />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/support' element={<Support />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/sell' element={<SellForm />} />
            <Route path="/manage-listings" element={<ManageListings />} />

          </Routes>
     

        <Footer />
        </MyProvider>
      </BrowserRouter>
   
  );
}

export default App;
