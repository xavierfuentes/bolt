import React from 'react';
import PropTypes from 'prop-types';

const addressToString = ({ country, line1, line2, line3, premises, postcode }) => `
  ${premises ? `${premises}` : ''}
  ${line1 ? `, ${line1}` : ''}
  ${line2 ? `, ${line2}` : ''}
  ${line3 ? `, ${line3}` : ''}
  ${postcode ? `, ${postcode}` : ''}
  ${country ? `, ${country}` : ''}
  `;

const Contacts = ({ data }) => {
  const dataMapper = contact => (
    <div key={contact.id}>
      <span>Key Contact:</span>
      <span>{contact.name}</span>
      <span>{contact.position}</span>
      <span>{addressToString(contact.address)}</span>
    </div>
  );

  return <div>{data.map(dataMapper)}</div>;
};

Contacts.propTypes = {};

export default Contacts;
