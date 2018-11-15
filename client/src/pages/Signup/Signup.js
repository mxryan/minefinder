import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    }
  }
  render() {
    return (
      <div>
        <h1>This is the signup page</h1>
        <p>Sign up here!!!!!!</p>
      </div>
    )
  }
}

export default Signup;