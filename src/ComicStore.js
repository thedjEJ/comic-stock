import React, { Component } from "react";
import logo from "./images/Action_Comics_Vol_1_Logo.png";
import "./ComicStore.css";
//import Creator from './components/Creator'
import Issue from "./components/Issue.jsx";
import Order from "./components/Order";
import Supplier from "./components/Supplier.jsx";
import { Router, Route, Switch } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

const App = () => (
  <div>
    <Navbar>
    <nav>
      <Link to="/suppliers"> Suppliers </Link>
      <Link to="/issues"> Issues </Link>
      <Link to="/orders"> Orders </Link>
    </nav>
    <div>
      <Route path="/Suppliers" component={Supplier}/>
    </div>
    <div>
      <Route path="/issues" component={Issue}/>
    </div>
    <div>
      <Route path="/orders" component={Order}/>
    </div>
    </Navbar>
  </div>
)

class ComicStore extends Component {
  constructor() {
    super();
    var axios = require("axios");

    this.state = {
      axios: axios.create({
        baseURL: "http://frontendshowcase.azurewebsites.net",
        header: "test"
      })
    };
  }

  render() {
    return (
      <div className="comic-store">
        <div className="comic-store-header">
          <img src={logo} className="comic-store-logo" alt="logo" />
          <h2>Welcome to ACTION COMICS</h2>
        </div>
        <BrowserRouter>
        <App/>
        </BrowserRouter>
      </div>
    );
  }
}

export default ComicStore;
