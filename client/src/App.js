import React, { Component } from 'react';
import Game from "./pages/Game/";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Infobar from "./components/Infobar";

// refactor login and signup user/pass in state to just one of each?

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      page: "welcome",
      signupUsername: "",
      signupPassword: "",
      loginUsername: "",
      loginPassword: ""
    }
  }

  changePage = (e) => {
    let name = e.target.getAttribute("name");
    this.setState({
      page: name
    });
  }

  handleFormChange = (e) => {
    let name = e.target.id;
    this.setState({ [name]: e.target.value });
    console.log(this.state);
  }

  submitSignup = () => {
    let outData = {
      username: this.state.signupUsername,
      password: this.state.signupPassword
    }
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(outData)
    }).then(r => r.json()).then(d => console.log(d)).catch(e => console.log(e));
  }
  submitLogin = () => {
    let outData = {
      username: this.state.loginUsername,
      password: this.state.loginPassword
    }
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(outData)
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        throw Error(`Request rejected with status ${res.status}`);
      }
    })
      .then(d => console.log(d))
      .catch(e => console.log(e));
  }

  logOut = () => {
    fetch("/api/logout")
      .then(r => r.json())
      .then(d => console.log(d))
      .catch(e => console.log(e));
  }

  pingServer = () => {
    fetch("/api/ping")
      .then(res => res.json())
      .then(d => console.log(d))
      .catch(e => console.log(e));
  }

  render() {
    let page;
    switch (this.state.page) {
      case "welcome":
        page = (<div><h1>Welcome!</h1><button onClick={this.logOut}>Logout</button></div>);
        break;
      case "signup":
        page = (<Signup handleChange={this.handleFormChange} submitSignup={this.submitSignup} />)
        break;
      case "login":
        page = (<Login handleChange={this.handleFormChange} submitSignup={this.submitLogin} />);
        break;
      default:
        page = (<Game />);
    }
    return (
      <div>
        <Infobar pingServer={this.pingServer} />
        <Nav changePage={this.changePage} />
        {page}
      </div>
    );
  }
}

export default App;
