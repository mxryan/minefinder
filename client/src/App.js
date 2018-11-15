import React, { Component } from 'react';
import Game from "./pages/Game/";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      page: "welcome",
      signupUsername: "",
      signupPassword: ""
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

  submitSignup = ()=>{
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
  }).then(r => r.json()).then(d=>console.log(d)).catch(e=>console.log(e));
  }
  render() {
    let page;
    switch (this.state.page) {
      case "welcome":
        page = (<div><h1>Welcome!</h1></div>);
        break;
      case "signup":
        page = (<Signup handleChange={this.handleFormChange} submitSignup={this.submitSignup} />)
        break;
      default:
        page = (<Game />);
    }
    return (
      <div>
        <Nav changePage={this.changePage} />
        {page}
      </div>
    );
  }
}

export default App;
