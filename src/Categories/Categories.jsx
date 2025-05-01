import React from 'react';
import { useParams } from 'react-router-dom';
import './Categories.scss';

const Categories = () => {
  const { categoryName } = useParams();

  // You can filter items by categoryName here
  return (
    <div className="category-page">
      <h2>Items in Category: <span className="category-name">{categoryName}</span></h2>
      <p>You can fetch and display relevant listings for this category here.</p>
    </div>
  );
};

export default Categories;
