import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaHeart, FaTrash, FaEye, FaTimes } from 'react-icons/fa';
import './Header.scss';
import MyContext from './MyContext/MyContext';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, watchlistItems, removeFromWatchlist } = useContext(MyContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showWatchlistDropdown, setShowWatchlistDropdown] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [myListings, setMyListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dropdownRef = useRef(null);
  const watchlistRef = useRef(null);

  const isAuthenticated = !!sessionStorage.getItem('token');

  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [setIsLoggedIn, isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (watchlistRef.current && !watchlistRef.current.contains(event.target)) {
        setShowWatchlistDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserNavigation = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/login');
  };

  const handleViewItem = (itemId) => {
    navigate(`/listing/${itemId}`);
    setShowWatchlistDropdown(false);
  };

  const handleRemoveFromWatchlist = (event, itemId) => {
    event.stopPropagation();
    removeFromWatchlist(itemId);
  };

  const fetchMyListings = async () => {
    setLoadingListings(true);
    setErrorMessage('');
    
    try {
      // Use sessionStorage consistently for token storage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setErrorMessage('You must be logged in to view your listings');
        setLoadingListings(false);
        return;
      }
      
      const response = await fetch('/api/my-listings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (!data.success) {
        setErrorMessage(data.error || 'Failed to fetch listings');
        setMyListings([]);
      } else {
        setMyListings(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
      setErrorMessage('Failed to connect to server. Please try again later.');
      setMyListings([]);
    } finally {
      setLoadingListings(false);
    }
  };

  const handleManageListings = async () => {
    setShowDropdown(false);   // Close the dropdown
    setShowManageModal(true); // Open the modal
    await fetchMyListings();  // Fetch the user's listings when the modal opens
  };
  
  const closeListing = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await fetch(`/api/close-listing/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMyListings(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Failed to close listing:', err);
    }
  };

  return (
    <div className="header-container">
      <div className="head" onClick={() => navigate('/')}>Bidzy</div>

      <div className="header-part">
        <h4 onClick={() => navigate('/')}>Home</h4>
        <h4 onClick={() => navigate('/listings')}>Listings</h4>
        <h4 onClick={() => navigate('/about')}>About</h4>
        <h4 onClick={() => navigate('/sell')}>Sell</h4>

        <div
          className="watchlist-container"
          ref={watchlistRef}
          onMouseEnter={() => setShowWatchlistDropdown(true)}
          onMouseLeave={() => setShowWatchlistDropdown(false)}
        >
          <h4 className="watchlist-label">
            <FaHeart className="watchlist-icon" />
            Watchlist {watchlistItems.length > 0 && `(${watchlistItems.length})`}
          </h4>

          {showWatchlistDropdown && (
            <div className="watchlist-dropdown">
              <div className="watchlist-header"><h3>Your Watchlist</h3></div>
              <div className="watchlist-items-container">
                {watchlistItems.length === 0 ? (
                  <div className="empty-watchlist">Your watchlist is empty</div>
                ) : (
                  watchlistItems.map((item) => (
                    <div key={item.id} className="watchlist-item" onClick={() => handleViewItem(item.id)}>
                      <div className="item-image">
                        {item.image ? <img src={item.image} alt={item.title} /> : <div className="no-image">No Image</div>}
                      </div>
                      <div className="item-details">
                        <div className="item-title">{item.title}</div>
                        <div className="item-price">${item.currentBid || item.startingBid}</div>
                      </div>
                      <div className="item-actions">
                        <button className="view-button" onClick={() => handleViewItem(item.id)} title="View Item"><FaEye /></button>
                        <button className="remove-button" onClick={(e) => handleRemoveFromWatchlist(e, item.id)} title="Remove"><FaTrash /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {watchlistItems.length > 0 && (
                <div className="watchlist-footer">
                  <button className="view-all-button" onClick={() => { navigate('/watchlist'); setShowWatchlistDropdown(false); }}>View All</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="icons-part">
        <div className="user-container"
          ref={dropdownRef}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <FaUser className="user-icon" onClick={handleUserNavigation} />
          {showDropdown && (
            <div className="user-dropdown">
              {!isLoggedIn ? (
                <div className="dropdown-item" onClick={handleUserNavigation}>Login</div>
              ) : (
                <>
                  <div className="dropdown-item" onClick={() => { navigate('/profile'); setShowDropdown(false); }}>Profile</div>
                  <div className="dropdown-item" onClick={() => { navigate('/my-bids'); setShowDropdown(false); }}>My Bids</div>
                  <div className="dropdown-item" onClick={handleManageListings}>Manage Listings</div>
                  <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      {showManageModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowManageModal(false)}>
              <FaTimes />
            </button>
            <h2>Manage Your Listings</h2>
            <div className="listings-table">
              {loadingListings ? (
                <div className="loading">Loading your listings...</div>
              ) : errorMessage ? (
                <div className="error-message">{errorMessage}</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myListings.length === 0 ? (
                      <tr>
                        <td colSpan="3">No listings available</td>
                      </tr>
                    ) : (
                      myListings.map((listing) => (
                        <tr key={listing._id}>
                          <td>{listing.title}</td>
                          <td>${listing.startingPrice}</td>
                          <td>
                            <button onClick={() => closeListing(listing._id)}>
                              Close
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;