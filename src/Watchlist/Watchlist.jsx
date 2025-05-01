// Watchlist.jsx
import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHeart, FaTrash, FaEye, FaArrowLeft } from 'react-icons/fa';
import MyContext from '../MyContext/MyContext';
import './Watchlist.scss';

const Watchlist = () => {
  const { watchlistItems, removeFromWatchlist } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if we're on the watchlist page or viewing as a dropdown
  const isFullPage = location.pathname === '/watchlist';

  const handleViewItem = (itemId) => {
    navigate(`/listing/${itemId}`);
  };

  const handleRemoveFromWatchlist = (event, itemId) => {
    event.stopPropagation(); // Prevent triggering the parent click handler
    removeFromWatchlist(itemId);
  };

  // Render different UI based on whether this is a dropdown or full page
  if (isFullPage) {
    return (
      <div className="watchlist-page">
        <div className="watchlist-header">
          <button 
            className="back-button" 
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Back
          </button>
          <h1>Your Watchlist</h1>
        </div>

        {watchlistItems.length === 0 ? (
          <div className="empty-watchlist-page">
            <FaHeart className="empty-icon" />
            <h2>Your watchlist is empty</h2>
            <p>Items you add to your watchlist will appear here.</p>
            <button 
              className="browse-button"
              onClick={() => navigate('/listings')}
            >
              Browse Listings
            </button>
          </div>
        ) : (
          <div className="watchlist-grid">
            {watchlistItems.map((item) => (
              <div 
                key={item.id} 
                className="watchlist-card"
                onClick={() => handleViewItem(item.id)}
              >
                <div className="card-image">
                  {item.image ? (
                    <img src={item.image} alt={item.title} />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}
                </div>
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-price">${item.currentBid || item.startingBid}</p>
                  <div className="bid-info">
                    {item.bids > 0 ? (
                      <span className="bid-count">{item.bids} bids</span>
                    ) : (
                      <span className="no-bids">No bids yet</span>
                    )}
                    {item.timeLeft && <span className="time-left">{item.timeLeft}</span>}
                  </div>
                </div>
                <div className="card-actions">
                  <button 
                    className="view-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewItem(item.id);
                    }}
                    title="View Item"
                  >
                    <FaEye /> View
                  </button>
                  <button 
                    className="remove-button"
                    onClick={(e) => handleRemoveFromWatchlist(e, item.id)}
                    title="Remove from Watchlist"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // For dropdown/modal view (used in the Header dropdown)
  return (
    <>
      {!isFullPage && (
        <>
          <button className="watchlist-toggle" onClick={() => setIsOpen(true)}>
            Open Watchlist
          </button>

          {isOpen && (
            <div className="modal-overlay" onClick={() => setIsOpen(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
                <h2>Your Watchlist</h2>
                {watchlistItems.length === 0 ? (
                  <p>No items in your watchlist.</p>
                ) : (
                  <div className="watchlist-items">
                    {watchlistItems.map((item) => (
                      <div 
                        key={item.id || item._id} 
                        className="watchlist-item"
                        onClick={() => handleViewItem(item.id || item._id)}
                      >
                        <div className="item-image">
                          {item.image ? (
                            <img src={item.image} alt={item.title} />
                          ) : (
                            <div className="no-image">No Image</div>
                          )}
                        </div>
                        <div className="item-details">
                          <div className="item-title">{item.title}</div>
                          <div className="item-price">
                            ${item.currentBid || item.startingBid || item.startingPrice}
                          </div>
                        </div>
                        <div className="item-actions">
                          <button 
                            className="remove-button"
                            onClick={(e) => handleRemoveFromWatchlist(e, item.id || item._id)}
                            title="Remove from Watchlist"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="modal-footer">
                      <button 
                        className="view-all-button"
                        onClick={() => {
                          navigate('/watchlist');
                          setIsOpen(false);
                        }}
                      >
                        View All
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Watchlist;