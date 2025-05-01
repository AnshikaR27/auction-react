import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [watchlistItems, setWatchlistItems] = useState([]);

  // Handle login and optionally store the token
  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };

  // Add/remove listing to/from watchlist
  const toggleWatchlistItem = (item) => {
    setWatchlistItems((prevItems) => {
      const exists = prevItems.find((i) => i._id === item._id);
      if (exists) {
        // Remove if already exists
        return prevItems.filter((i) => i._id !== item._id);
      } else {
        // Add if not present
        return [...prevItems, item];
      }
    });
  };
  

  return (
    <MyContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        watchlistItems,
        setWatchlistItems,
        handleLogin,
        toggleWatchlistItem, // <-- Added toggle function here
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
