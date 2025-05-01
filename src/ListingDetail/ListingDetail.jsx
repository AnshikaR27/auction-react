import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ListingDetail.scss';

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3032/api/listings/${id}`)
      .then(res => {
        if (res.data.success) {
          setListing(res.data.data);
        } else {
          console.error('Failed to fetch listing');
        }
      })
      .catch(err => {
        console.error('Error fetching listing:', err);
      });
  }, [id]);

  if (!listing) return <p className="loading">Loading listing...</p>;

  return (
    <div className="listing-detail">
      <img src={listing.image} alt={listing.title} className="detail-image" />
      <h1>{listing.title}</h1>
      <p className="description">{listing.description}</p>
      <p className="price">Starting Bid: ${listing.startingPrice}</p>
    </div>
  );
};

export default ListingDetail;
