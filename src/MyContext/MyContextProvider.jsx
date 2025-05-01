import React, {  useState } from 'react';
import MyContext from './MyContext';
import { useNavigate } from 'react-router-dom';

const MyContextProvider = ({ children }) => {



  const [token, setToken] = useState(() => {
    const store = sessionStorage.getItem('token');
    return store ? store : '';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Navigate = useNavigate();
 


  const handleLogin = (newToken) => {
    setToken(newToken);
    sessionStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      sessionStorage.removeItem('token');
      window.location.reload();
      setToken('');
      Navigate('/');
   
    }
  };


  
  
  
  //end
  return (
    <MyContext.Provider value={{isLoggedIn, setIsLoggedIn, handleLogout, token, handleLogin, Navigate, setToken
    }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;