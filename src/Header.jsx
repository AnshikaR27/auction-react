import { FaOpencart } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import './Header.css';

const Header = () => {
  return (
    <div className="header-container">
      <h1 className="head">Bidzy</h1>

      <div className="header-part">
        <h4>Active Listings</h4>
        <h4>Categories</h4>
        <h4>Watchlist</h4>
        <h4>Sell</h4>
      </div>

      <div className="icons-part">
        <h1><FaRegUserCircle /></h1>
        <h1><IoIosNotifications /></h1>
        <h1><FaOpencart /></h1>
      </div>
    </div>
  );
};

export default Header;
