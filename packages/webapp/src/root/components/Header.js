import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLogOut }) => (
  <div>
    <Link to="/">Natwest</Link>
    {/* <Link to="/settings">Settings</Link> */}
    <button onClick={onLogOut}>Sign out</button>
  </div>
);

export default Header;
