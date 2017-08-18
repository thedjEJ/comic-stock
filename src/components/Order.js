import React, { Component } from 'react';
import '../ComicStore.css';

class Order extends Component {
  constructor(){
    super();
    var axios = require('axios')
    
    this.state = {
      axios: axios.create({
        baseURL: "http://frontendshowcase.azurewebsites.net/api/Orders",
        'header':'test'
      }) 
    }
  }

  orders(){
    this.state.axios.get('/')
      .then(function (response) {
        //console.log(response);
      })
    .catch(function (error) {
      //console.log(error);
    });
  }

  

  render(api_request) {
    //if (api_request == 'orders'){
    const response = this.orders()
    //}

    return (
      <div className="comic-store">
        <div className="comic-store-header">
          <h2>Orders</h2>
        </div>
        <div>
          <response/>
        </div>
      </div>
    );
  }
}

export default Order;
