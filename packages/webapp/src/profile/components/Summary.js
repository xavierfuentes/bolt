import React from 'react';
import PropTypes from 'prop-types';

const Summary = ({ data }) => {
  const dataMapper = dataKey => (
    <div key={data[dataKey]['id']}>
      <span>
        {data[dataKey]['label']}: {data[dataKey]['value']}
      </span>
    </div>
  );

  return <div>{Object.keys(data).map(dataMapper)}</div>;
};

Summary.propTypes = {
  data: PropTypes.shape({}),
};

export default Summary;
