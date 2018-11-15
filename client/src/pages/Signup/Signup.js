import React from 'react';

const Signup = (props) => {
  return (
    <div>
      <h1>This is the signup page</h1>
      <p>Sign up here!!!!!!</p>
      <label htmlFor="email">Email</label>
      <input type="text" onChange={props.handleChange} id="email"></input>
      <label htmlFor="username">Username</label>
      <input type="text" onChange={props.handleChange} id="username"></input>
      <label htmlFor="password">Password</label>
      <input type="password" onChange={props.handleChange} id="password"></input>
    </div>
  )
}


export default Signup;