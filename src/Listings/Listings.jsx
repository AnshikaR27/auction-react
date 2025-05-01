import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Listings.scss';
import { FaCommentDots, FaStar, FaRegStar, FaGavel } from 'react-icons/fa';
import MyContext from '../MyContext/MyContext'; // adjust path if needed

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const { toggleWatchlistItem } = useContext(MyContext);
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedBidListing, setSelectedBidListing] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3032/api/listings')
      .then((res) => {
        if (res.data.success) {
          const dataWithFavorites = res.data.data.map(item => ({
            ...item,
            isFavorite: false,
          }));
          setListings(dataWithFavorites);
        } else {
          console.error('Failed to load listings');
        }
      })
      .catch((err) => {
        console.error('Error fetching listings:', err);
      });
  }, []);

  const toggleFavorite = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to use the watchlist.');
      return;
    }

    const listing = listings.find(item => item._id === id);
    if (!listing) return;

    const isCurrentlyFavorite = listing.isFavorite;

    try {
      const res = await axios.post(
        `http://localhost:3032/api/watchlist/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setListings(prev =>
          prev.map(listing =>
            listing._id === id
              ? { ...listing, isFavorite: !isCurrentlyFavorite }
              : listing
          )
        );

        toggleWatchlistItem({
          ...listing,
          isFavorite: !isCurrentlyFavorite,
        });
      } else {
        console.error('Failed to update favorite status.');
      }
    } catch (err) {
      console.error('Error updating watchlist:', err);
      alert('Something went wrong while updating your watchlist.');
    }
  };

  const handleCommentClick = async (id) => {
    setSelectedListingId(id);
    setShowModal(true);
    setNewComment('');
    setSuccessMessage('');
    setError('');

    try {
      const res = await axios.get(`http://localhost:3032/api/comments/${id}`);
      if (res.data.success) {
        setComments(res.data.data);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
      setComments([]);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to post a comment.');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:3032/api/comments/${selectedListingId}`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setComments([res.data.data, ...comments]);
        setSuccessMessage('Comment posted successfully!');
        setNewComment('');
        setError('');
      } else {
        setError('Failed to post comment');
      }
    } catch (err) {
      setError('Error posting comment');
      console.error(err);
    }
  };

  const handleBidNowClick = (listing) => {
    setSelectedBidListing(listing);
    setBidAmount('');
    setBidMessage('');
    setShowBidModal(true);
  };

  const handleBidSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setBidMessage('You must be logged in to place a bid.');
      return;
    }

    if (!bidAmount || isNaN(bidAmount)) {
      setBidMessage('Please enter a valid bid amount.');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:3032/api/bids/${selectedBidListing._id}`,
        { amount: bidAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setBidMessage('Bid placed successfully!');
        setBidAmount('');
      } else {
        setBidMessage(res.data.message || 'Failed to place bid.');
      }
    } catch (err) {
      console.error('Error submitting bid:', err);
      setBidMessage('An error occurred while placing your bid.');
    }
  };

  return (
    <div className="listings-container">
      {listings.length === 0 ? (
        <p className="no-listings-message">No listings available.</p>
      ) : (
        listings.map((listing) => (
          <div key={listing._id} className="listing-wrapper">
            <div className="hover-trigger">
              <div className="image-wrapper">
                <img src={listing.image} alt={listing.title} className="listing-image" />
              </div>

              <div className="multi-button">
                <button onClick={() => handleCommentClick(listing._id)} title="Comment">
                  <FaCommentDots />
                </button>
                <button onClick={() => handleBidNowClick(listing)} title="Bid Now">
                  <FaGavel />
                </button>
                <button onClick={() => toggleFavorite(listing._id)} title="Wishlist">
                  {listing.isFavorite ? <FaStar /> : <FaRegStar />}
                </button>
              </div>
            </div>

            <div className="listing-card">
              <h2 className="listing-title">{listing.title}</h2>
              <p className="listing-description">{listing.description}</p>
              <p className="listing-price">Starting Bid: ${listing.startingPrice}</p>
            </div>
          </div>
        ))
      )}

      {/* Comment Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal_comment" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Comments</h2>

            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="comment-item">
                    <div className="comment-header">
                      <span className="comment-name">{comment.userName || comment.email}</span>
                    </div>
                    <div className="comment-text">{comment.text}</div>
                  </div>
                ))
              ) : (
                <p className="no-comments">No comments yet. Be the first!</p>
              )}
            </div>

            <textarea
              className="comment-input"
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
            />
            <div className='comment-actions'>
            <button onClick={handleSubmitComment}>Submit</button>
            {successMessage && <p className="success">{successMessage}</p>}
            {error && <p className="error">{error}</p>}
            </div>
            
          </div>
        </div>
      )}

      {/* Bid Modal */}
      {showBidModal && selectedBidListing && (
        <div className="modal-overlay" onClick={() => setShowBidModal(false)}>
          <div className="modal_bid" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowBidModal(false)}>&times;</span>
            <h2>Place a Bid</h2>
            <p><strong>{selectedBidListing.title}</strong></p>
            <p>Starting at: ${selectedBidListing.startingPrice}</p>

            <input
              type="number"
              placeholder="Enter your bid"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <button onClick={handleBidSubmit}>Submit Bid</button>

            {bidMessage && <p className="bid-message">{bidMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Listings;
