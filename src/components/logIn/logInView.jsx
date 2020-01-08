import React from 'react';
import { func } from 'prop-types';

const LogInView = ({ onSubmit }) => (
  <div>
    <h1>Log in</h1>
    <form onSubmit={onSubmit}>
      <label htmlFor="email">
        Email
        <input
          style={{ width: '100%' }}
          name="email"
          type="email"
          placeholder="Email"
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          style={{ width: '100%' }}
          name="password"
          type="password"
          placeholder="Password"
        />
      </label>
      <button type="submit">Log in</button>
    </form>
  </div>
);

LogInView.propTypes = {
  onSubmit: func.isRequired,
};

export default LogInView;
