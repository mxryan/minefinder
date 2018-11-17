import React from "react";
const Login = (props) => {
  return (
    <div>
      <h1>Login</h1>
      <p>Hey man this is the login page, which you will visit to login after you sign up. The should also be something on the nav bar that lets you know if you are signed in. I'm also gonna put a button that sends a json response based on whether or not you are logged in.</p>
      <label htmlFor="loginUsername">Username</label>
      <input type="text" onChange={props.handleChange} id="loginUsername"></input>
      <label htmlFor="loginPassword">Password</label>
      <input type="password" onChange={props.handleChange} id="loginPassword"></input>
      <button onClick={props.submitSignup}></button>
    </div>
  )
}

export default Login;