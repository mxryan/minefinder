import React, { Component } from 'react';
import Game from "./pages/Game/";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Stats from "./pages/Stats"
import Leaderboard from "./pages/Leaderboard";
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
    } else if (name === "login" || name === "signup") {
      this.setState({
        page: name
      });
    } else {
      this.setState({
        appMessage: "Please sign in or sign up"
      })
    }
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
      .then(res => res.json())
      .then(json => {
        if (json.username) {
        this.setState({
          appMessage: `Hi ${json.username}. We made an account for you. Log in to get started!`
        });} else {
          this.setState({
            appMessage: json.msg
          })
        }
      })
      .catch(err => console.log(err));
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
        this.setState({
          loggedIn: false,
          username: null,
          userId: null,
          appMessage: "Goodbye"
        });
      })
      .catch(e => console.log(e));
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
      case "game":
        page = (<Game />);
        break;
      case "stats":
        page = (<Stats loggedIn={this.state.loggedIn} />);
        break;
      case "leaderboard":
        page =(<Leaderboard />);
        break;
      default:
        page = (<Game />);
    }
    return (
      <div>
        <Infobar
          msg={this.state.appMessage}
          username={this.state.username}
          logout={this.logout}
        />
        <Nav changePage={this.changePage} />
        {page}
      </div>
    );
  }
}

export default App;
