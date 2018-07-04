import React from 'react';

const Register = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <form>
      <label>
        company number <input type="text" />
      </label>
      <label>
        password <input type="password" />
      </label>
      <button onClick={handleSubmit}>Sign up</button>
    </form>
  );
};

export default Register;
