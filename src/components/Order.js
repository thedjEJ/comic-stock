import React, { Component } from 'react';
import '../ComicStore.css';
var axios = require('axios')

class Order extends Component {
  constructor(){
    super();
    
    axios.create({
        baseURL: "http://frontendshowcase.azurewebsites.net/api/Orders",
        'header':'test'
    }) 
  }

  orders(order_id){
    if (!order_id){
        order_id = '';
    }
    axios.get('/'+order_id)
      .then(function (response) {
        //console.log(response);
      })
    .catch(function (error) {
      //console.log(error);
    });
  }

  createOrder(supplier, issue){
    axios.put('/'+supplier.id+'issues/'+issue.id+'Put')
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
