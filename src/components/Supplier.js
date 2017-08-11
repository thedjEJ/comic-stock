import React, { Component } from 'react';
import '../ComicStore.css';
import { Button } from 'react-bootstrap';
let axios = require('axios');

class Supplier extends Component {
  constructor(){
    super();
    axios.create({
        baseURL: 'http://frontendshowcase.azurewebsites.net/api/Suppliers',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        'header':'test',
      }
    )
    
    this.state = {
      suppliers: [],
      supplier_response: [],
      response: [],
      response_class: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  parse_axios_error_response (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return(
        {
          response: error.response.data, 
          status: error.response.status, 
          class: 'info'
        }
      );
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return(
        {
          response: error.request, 
          status: 'No response from server',
          class: 'error'
        }
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      return(
        {
          response: error.message, 
          status: 'Error',
          class: 'error'
        }
      )
    }
  }

  parse_axios_response (response) {
    if (response.status == 200) {
      // The request was made and the server responded with an OK status code
      // 200 response
      return(
        {
          response: response.data,
          status: response.status,
          class: 'success'
        }
      );
    } else if (response.status < 500) {
      // The request was made, we received a response, but it was not successful
      // All responses except server errors
      return(
        {
          response: response.data,
          status: response.status, 
          class: 'warning'
        }
      );
    } else {
      // Server Errors
      return(
        {
          response: response.data, 
          status: response.status, 
          class: 'error'
        }
      )
    }
  }

  componentDidMount() {
    axios
      .get(`http://frontendshowcase.azurewebsites.net/api/Suppliers`)
      .then(
        response => {
          this.setState({ suppliers: response.data}),
          this.parsed_response = this.parse_axios_response(response)
          console.log(this.parsed_response)
        }
      )
    .catch(error => {
        this.error_response = this.parse_axios_error_response(error)
        this.setState({errors: this.error_response.response})
        console.log(this.error_response)
      }
    )
  }

  handleEdit(event) {
    this.setState(
      {
        'supplier_id':event.target.supplier_id.value,
        'supplier_name':event.target.supplier_name.value,
        'supplier_city':event.target.supplier_city.value,
        'supplier_reference':event.target.supplier_reference.value
      }
    )
  }

  handleDelete(event) {
    console.log("DELETE EVENT:"+event.target.id)
    axios
      .delete(`http://frontendshowcase.azurewebsites.net/api/Suppliers/`+event.target.id)
      .then(
        response => {
          this.axios_response = this.parse_axios_response(response)
          this.setState({ 
                          response: this.axios_response.response,
                          response_class: this.axios_response.class
                        })
          console.log(this.axios_response.response)
        }
      )
    .catch(error => {
      this.error_response = this.parse_axios_error_response(error)
      this.setState({errors: this.error_response.response})
      console.log(this.error_response)
    })
  }

  handleChange(event) {
    const name = event.target.id;

    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    const data_to_submit={
      id: event.target.supplier_id.value,
      name: event.target.supplier_name.value,
      city: event.target.supplier_city.value,
      reference: event.target.supplier_reference.value
    }
    if (data_to_submit.id != ''){
    axios
      .put('http://frontendshowcase.azurewebsites.net/api/Suppliers/', data_to_submit)
      .then(
        response => {
          this.axios_response = this.parse_axios_response(response)
          this.setState({ 
                          response: this.axios_response.response,
                          response_class: this.axios_response.class
                        })
          console.log(this.axios_response.response)
        }
      )
    .catch(error => {
      this.error_response = this.parse_axios_error_response(error)
      this.setState({errors: this.error_response.response})
      console.log(this.error_response)
    })
    } else 
    axios
      .post('http://frontendshowcase.azurewebsites.net/api/Suppliers/', data_to_submit)
      .then(
        response => {
          this.axios_response = this.parse_axios_response(response)
          this.setState({ 
                          response: this.axios_response.response,
                          response_class: this.axios_response.class
                        })
          console.log(this.axios_response.response)
        }
      )
    .catch(error => {
      this.error_response = this.parse_axios_error_response(error)
      this.setState({errors: this.error_response.response})
      console.log(this.error_response)
    })
  }

  render(api_request) {
    //if (api_request == 'suppliers'){
    //console.log("response: " +this.state.suppliers)
    //}

    return (
      <div className="comic-store">
        <div className="comic-store-header">
        <h2>Suppliers</h2>
        <h3><div>{this.state.supplier_response}</div></h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Supplier details:
            <input type='text' id='supplier_id' value={this.state.supplier_id} placeholder='id' onChange={this.handleChange} />
            <input type='text' id='supplier_name' value={this.state.supplier_name} placeholder='name' onChange={this.handleChange} />
            <input type='text' id='supplier_city' value={this.state.supplier_city} placeholder='city' onChange={this.handleChange} />
            <input type='text' id='supplier_reference' value={this.state.supplier_reference} placeholder='reference' onChange={this.handleChange} />
          </label>
          <input type="submit" value="Add Supplier" />
        </form>
        {
         this.state.suppliers.map((supplier) => {
                    return (
                      <div className='comic-store'>
                        <div>{supplier.id} {supplier.name} {supplier.city} {supplier.reference} 
                          <img src='Edit' id={supplier.id} name={supplier.name} alt='Edit' onClick={this.handleEdit}/> 
                          <img src='delete.jpg' id={supplier.id} alt='delete' onClick={this.handleDelete} /></div>
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
