import React, { Component } from "react";
import logo from "./images/Action_Comics_Vol_1_Logo.png";
import "./ComicStore.css";
//import Creator from './components/Creator'
import Issue from "./components/Issue.jsx";
import Order from "./components/Order";
import Supplier from "./components/Supplier.jsx";
import { Router, Route, Switch } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";

const App = () => (
  <div>
    <Navbar>
      <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Welcome to ACTION COMICS</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem align='left'>
        <Link to="/comic-stock/suppliers"> Suppliers </Link>
      </NavItem>
      <NavItem>
        <Link to="/comic-stock/issues"> Issues </Link>
      </NavItem>
      <NavItem>
        <Link to="/comic-stock/orders"> Orders </Link>
      </NavItem>    
    </Nav>
    <div>
      <Route path="/comic-stock/Suppliers" component={Supplier}/>
    </div>
    <div>
      <Route path="/comic-stock/issues" component={Issue}/>
    </div>
    <div>
      <Route path="/comic-stock/orders" component={Order}/>
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
        </div>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </div>
    );
  }
}

export default ComicStore;
