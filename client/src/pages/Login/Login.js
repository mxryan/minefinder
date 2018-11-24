import React from "react";
const Login = (props) => {
  return (
    <div>
      <h1>Login</h1>
      <p>After you login you can play a game, check your stats, or view the leaderboard.</p>
      <label htmlFor="loginUsername">Username</label>
      <input type="text" onChange={props.handleChange} id="loginUsername"></input>
      <label htmlFor="loginPassword">Password</label>
      <input type="password" onChange={props.handleChange} id="loginPassword"></input>
      <button onClick={props.submitSignup}></button>
    </div>
  )
}

export default Login;