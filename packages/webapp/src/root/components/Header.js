import React from 'react';

const Header = ({ onLogOut }) => {
  const handleLogOutClick = _ => {
    onLogOut();
  };

  return (
    <div>
      <h3>Bank</h3>
      <button onClick={handleLogOutClick}>Sign out</button>
    </div>
  );
};

export default Header;
