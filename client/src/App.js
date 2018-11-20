import React, { Component } from 'react';
import Game from "./pages/Game/";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Infobar from "./components/Infobar";

// refactor login and signup user/pass in state to just one of each?

//**IF YOU REVEAL THE LAST SQUARE AND ITS A BOMB BUT YOU ARE AT 0 BOMBS LEFT (by mistakenly flagging wrong square) THE GAME POSTS A WIN AND A LOSS BUT SHOULD JUST BE A LOSS

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: null,
      userId: null,
      page: "login",
      signupUsername: "",
      signupPassword: "",
      loginUsername: "",
      loginPassword: "",
      appMessage: ""
    }
  }

  changePage = (e) => {
    let name = e.target.getAttribute("name");
    if (this.state.loggedIn) {
      this.setState({
        page: name
      });
    } else if(name === "login" || name === "signup"){
      this.setState({
        page: name
      });
    } else {
      this.setState({
        appMessage: "Please sign in or sign up"
      })
    }
  }

  printAppState = () => {
    console.log(this.state);
  }


  handleFormChange = (e) => {
    let name = e.target.id;
    this.setState({ [name]: e.target.value });
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
    })
      .then(r => r.json())
      .then(d => console.log(d))
      .catch(e => console.log(e));
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
        if (res.ok) {
          return res.json();
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })
      .then(d => {
        // user succesfully logs in, what do now?
        console.log(d);
        console.log(`welcome ${d.username}`)
        this.setState({
          loggedIn: true,
          username: d.username,
          userId: d.id,
          appMessage: `Hello ${d.username}`
        })
      })
      .catch(e => {
        // login unsuccesful
        console.log(e)
      });
  }

  logout = () => {
    fetch("/api/logout")
      .then(r => r.json())
      .then(d => {
        // logout succesful
        console.log(d);
        this.setState({
          loggedIn: false,
          username: null,
          userId: null,
          appMessage: "Goodbye"
        });
      })
      .catch(e => console.log(e));
  }

  pingServer = () => {
    fetch("/api/ping")
      .then(res => res.json())
      .then(d => console.log(d))
      .catch(e => console.log(e));
  }
  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    let page;
    switch (this.state.page) {
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
        <Infobar
          pingServer={this.pingServer}
          printAppState={this.printAppState}
          msg={this.state.appMessage}
          logout={this.logout}
        />
        <Nav changePage={this.changePage} />
        {page}
      </div>
    );
  }
}

export default App;
