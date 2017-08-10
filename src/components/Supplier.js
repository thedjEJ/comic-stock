import React, { Component } from 'react';
import '../ComicStore.css';
import { Button } from 'react-bootstrap';

class Supplier extends Component {
  constructor(){
    super();
    var axios = require('axios')
    
    this.state = {
      axios: axios.create({
        baseURL: 'http://frontendshowcase.azurewebsites.net/api/Suppliers',
        'header':'test'
      }),
      suppliers: [] 
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.state.axios
      .get(`http://frontendshowcase.azurewebsites.net/api/Suppliers`)
      .then(
        res => this.setState({ suppliers: res.data}),
      )
    .catch(err => console.log(err))
  }

  handleChange(event) {
    //console.log("EVENT:"+event)
    this.setState({value: event.target.value});
  }

  handleSubmit(event){
    console.log("EVENT:" + event)
    const body={
      "id": 123,
      "name": "ezra",
      "city": "ezraTown",
      "reference": "ezra_put_working"
    }
    this.state.axios
      .put(`http://frontendshowcase.azurewebsites.net/api/Suppliers`,body)
      .then(
        res => this.setState({ suppliers: res.data}),
        console.log("PUT: "+this.state.suppliers),
        alert(this.state.suppliers)
      )
    .catch(err => console.log(err))
  }

  render(api_request) {
    //if (api_request == 'suppliers'){
    //console.log("response: " +this.state.suppliers)
    //}

    return (
      <div className="comic-store">
        <div className="comic-store-header">
        <h2>Suppliers</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Supplier details:
            <input type='text' id='supplier_id' onChange={this.handleChange} />
            <input type='text' id='supplier_name' onChange={this.handleChange} />
            <input type='text' id='supplier_city' onChange={this.handleChange} />
            <input type='text' id='supplier_reference' onChange={this.handleChange} />
          </label>
          <input type="submit" value="Add Supplier" />
        </form>
        {
         this.state.suppliers.map((supplier) => {
                    return (
                      <div className='comic-store'>
                        <div>{supplier.id} {supplier.name} {supplier.city} {supplier.reference}</div>
                      </div>
                    )
                 })
        }
        </div>
      </div>
    );
  }
}

export default Supplier;
