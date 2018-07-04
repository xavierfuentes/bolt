import React from 'react';
import PropTypes from 'prop-types';

const Address = ({ data }) => {
  const addressMapper = addressKey => (
    <div key={addressKey}>
      <div>{data[addressKey]['label']}</div>
      <div>{data[addressKey]['line1']}</div>
      <div>{data[addressKey]['line2']}</div>
      <div>{data[addressKey]['line3']}</div>
      <div>{data[addressKey]['line4']}</div>
      <div>{data[addressKey]['postcode']}</div>
      <div>{data[addressKey]['line5']['value']}</div>
    </div>
  );

  return <div>{Object.keys(data).map(addressMapper)}</div>;
};

Address.propTypes = {};

export default Address;
