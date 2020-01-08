import React from 'react';
import { func } from 'prop-types';


const SignUpView = ({ onSubmit }) => (
  <div>
    <h1>Sign up</h1>
    <form onSubmit={onSubmit}>
      <label htmlFor="email">
        Email
        <input
          name="email"
          type="email"
          placeholder="Email"
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          name="password"
          type="password"
          placeholder="Password"
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  </div>
);

SignUpView.propTypes = {
  onSubmit: func.isRequired,
};

export default SignUpView;
