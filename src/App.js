import React, { Component } from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom';

import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import Footer from "./component/layout/Footer";

import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import Browse from "./component/auth/Browse";
import Profile from "./component/auth/Profile";

import './App.css';

class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { apiResponse: "" };
  }

  componentDidMount()
  {
    fetch('/')
      .then(response => response.json())
      .then(res => {
        if (res.data)
        {
          this.setState({ apiResponse: res.data })
        }
      });
  }

  renderUsers()
  {
    if (this.state.users.length <= 0)
    {
      return <div>Loading...</div>
    }
    else
    {
      return this.state.users.map((val, key) => {
        return <div key={key}>{val.name} | {val.age}</div>
      });
    }
  }

  render()
  {
    return (
      <Router>
        <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className={"container"}>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
            </div>
            <Footer />
        </div>
      </Router>
    );
  }
}

export default App;