import React from 'react';

const Signup = (props) => {
  return (
    <div>
      <h1>This is the signup page</h1>
      <p>Sign up here. Then go login and start playing.</p>

      <label htmlFor="signupUsername">Username</label>
      <input type="text" onChange={props.handleChange} id="signupUsername"></input>
      <label htmlFor="signupPassword">Password</label>
      <input type="password" onChange={props.handleChange} id="signupPassword"></input>
      <button onClick={props.submitSignup}></button>
    </div>
  )
}


export default Signup;