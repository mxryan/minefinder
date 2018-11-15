import React, { Component } from 'react';
import Game from "./pages/Game/";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      page: "welcome"
    }
  }
  changePage = (e)=>{
    let name = e.target.getAttribute("name");
    this.setState({
      page: name
    });
  }
  render() {
    let page;
    switch(this.state.page) {
      case "welcome":
      page = (<div><h1>Welcome!</h1></div>);
      break;
      case "signup":
      page = (<Signup />)
      break;
      default:
      page = (<Game />);
    }
    return (
      <div>
        <Nav changePage={this.changePage}/>
        {page}
      </div>
    );
  }
}

export default App;
