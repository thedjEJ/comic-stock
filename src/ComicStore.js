import React, { Component } from 'react';
import logo from './images/Action_Comics_Vol_1_Logo.png';
import './ComicStore.css';
import Order from './components/Order'
import Supplier from './components/Supplier'
import Issue from './components/Issue'

class ComicStore extends Component {
  constructor(){
    super();
    var axios = require('axios')
    
    this.state = {
      axios: axios.create({
        baseURL: "http://frontendshowcase.azurewebsites.net",
        'header':'test'
      }) 
    }
  }

  render() {
    return (
      <div className="comic-store">
        <div className="comic-store-header">
          <img src={logo} className="comic-store-logo" alt="logo" />
          <h2>Welcome to ACTION COMICS</h2>
        </div>
        <div>
          <Order/>
        </div>
        <div>
          <Supplier/>
        </div>
        <div>
          <Issue/>
        </div>
      </div>
    );
  }
}

export default ComicStore;
