import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ collapsible = false, title, children }) => (
  <div>
    <div>
      <h3>{title}</h3>
      <span>Updated dd-mm-yy</span>
    </div>
    <div>{children}</div>
  </div>
);

Card.propTypes = {
  collapsible: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Card;
