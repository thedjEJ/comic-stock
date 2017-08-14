import React, { Component } from 'react';
import '../ComicStore.css';
import * as Bootstrap from 'react-bootstrap';
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
      suppliers_current_page: [],
      supplier_response: [],
      response: [],
      response_class: [],
      records_per_page: 5,
      current_page: 1
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  clearState(){
    this.setState({
      suppliers: [],
      suppliers_current_page: [],
      supplier_response: [],
      response: [],
      response_class: [],
      supplier_id: '',
      supplier_name: '',
      supplier_city: '',
      supplier_reference: '',
      records_per_page: 5,
      current_page: 1
    })
  }

  parseAxiosErrorResponse (error) {
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

  parseAxiosResponse (response) {
    if (response.status === 200) {
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

  getFullSupplierList(){
    axios
      .get(`http://frontendshowcase.azurewebsites.net/api/Suppliers`)
      .then(
        response => {
          console.log("RESPONSE AFTER MOUNT")
          console.log(response.data)
          this.setState({ suppliers: response.data})
          this.changePage(this.state.current_page)
          this.parsed_response = this.parseAxiosResponse(response)
          console.log(this.parsed_response)
        }
      )
    .catch(error => {
        this.error_response = this.parseAxiosErrorResponse(error)
        this.setState({errors: this.error_response.response})
        console.log(this.error_response)
      }
    )
  }

  componentDidMount() {
    this.getFullSupplierList()
  }

  handleEdit(event) {
    this.supplier_id = event.target.id
    axios
      .get(`http://frontendshowcase.azurewebsites.net/api/Suppliers/`+this.supplier_id)
      .then(
        response => {
          this.parsed_response = this.parseAxiosResponse(response)
          console.log("EDIT RESPONSE:")
          console.log(this.parsed_response)
          this.setState({ suppliers: [this.parsed_response]})
          console.log(this.parsed_response)
          if (this.parsed_response.class==='success')
          {
            this.setState({
              'supplier_id':this.parsed_response.response.id,
              'supplier_name':this.parsed_response.response.name,
              'supplier_city':this.parsed_response.response.city,
              'supplier_reference':this.parsed_response.response.reference
            })
          }
    })
    .catch(error => {
        this.error_response = this.parseAxiosErrorResponse(error)
        this.setState({errors: this.error_response.response})
        console.log(this.error_response)
      }
    )
    this.getFullSupplierList()
  }

  handleClear(event) {
    console.log("CLEAR EVENT:"+event.target.id)
    this.clearState()
    this.getFullSupplierList()
  }

  handleDelete(event) {
    console.log("DELETE EVENT:"+event.target.id)
    axios
      .delete(`http://frontendshowcase.azurewebsites.net/api/Suppliers/`+event.target.id)
      .then(
        response => {
          this.axios_response = this.parseAxiosResponse(response)
          this.setState({ 
                          response: this.axios_response.response,
                          response_class: this.axios_response.class
                        })
          console.log(this.axios_response.response)
        }
      )
    .catch(error => {
      this.error_response = this.parseAxiosErrorResponse(error)
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
    if (data_to_submit.id !== ''){
    axios
      .put('http://frontendshowcase.azurewebsites.net/api/Suppliers/', data_to_submit)
      .then(
        response => {
          this.axios_response = this.parseAxiosResponse(response)
          this.setState({ 
                          response: this.axios_response.response,
                          response_class: this.axios_response.class
                        })
          console.log(this.axios_response.response)
          this.clearState()
          this.getFullSupplierList()
        }
      )
    .catch(error => {
      this.error_response = this.parseAxiosErrorResponse(error)
      this.setState({errors: this.error_response.response})
      console.log(this.error_response)
    })
    } else 
    axios
      .post('http://frontendshowcase.azurewebsites.net/api/Suppliers/', data_to_submit)
      .then(
        response => {
          this.axios_response = this.parseAxiosResponse(response)
          this.setState({ 
                          response: this.axios_response.response,
                          response_class: this.axios_response.class
                        })
          console.log(this.axios_response.response)
        }
      )
    .catch(error => {
      this.error_response = this.parseAxiosErrorResponse(error)
      this.setState({errors: this.error_response.response})
      console.log(this.error_response)
    })
  }

  handlePrevPage(event)
  {
    console.log("Page Logging Prev")
    console.log(this.numPages())
    console.log(this.state.current_page)
    console.log(this.state.suppliers_current_page)
    console.log(this.state.suppliers)
    if (this.state.current_page > 1) {
        this.setState({current_page: this.state.current_page-1})
        this.changePage(this.state.current_page)
    }
  }

  handleNextPage(event)
  {
    console.log("Page Logging Next")
    console.log(this.numPages())
    console.log(this.state.current_page)
    console.log(this.state.suppliers_current_page)
    console.log(this.state.suppliers)
    if (this.state.current_page < this.numPages()) {
        this.setState({current_page: this.state.current_page+1})
        this.changePage(this.state.current_page+1)
    }
  }
      
  changePage(page)
  {
    // Validate page
    if (page < 1){ 
      page = 1;
    }

    if (page > this.numPages()){ 
      page = this.numPages();
    }
    
    var suppliers_page = this.state.suppliers;
    suppliers_page.slice((page-1) * this.state.records_per_page, this.state.records_per_page);

    this.setState({suppliers_current_page: suppliers_page})

    /*if (this.state.current_page === 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (this.state.current_page === this.numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }*/
}

numPages()
{
  console.log("NUMPAGES CALL")
  console.log(this.state.suppliers.length)
  console.log(this.state.records_per_page)
  return Math.ceil(this.state.suppliers.length / this.state.records_per_page);
}

  render(api_request) {
    //if (api_request == 'suppliers'){
    //console.log("response: " +this.state.suppliers)
    //}

    return (
      <div className="comic-store">
        <div className="comic-store-header">
        <h2>Suppliers</h2>
            <Bootstrap.Navbar.Form pullLeft>
              <Bootstrap.FormGroup onSubmit={this.handleSubmit}>
                  Supplier details:
                  <Bootstrap.FormControl type='text' id='supplier_id' value={this.state.supplier_id} placeholder='id' onChange={this.handleChange} />
                  <Bootstrap.FormControl type='text' id='supplier_name' value={this.state.supplier_name} placeholder='name' onChange={this.handleChange} />
                  <Bootstrap.FormControl type='text' id='supplier_city' value={this.state.supplier_city} placeholder='city' onChange={this.handleChange} />
                  <Bootstrap.FormControl type='text' id='supplier_reference' value={this.state.supplier_reference} placeholder='reference' onChange={this.handleChange} />
                <Bootstrap.Button type="submit" bsStyle="primary">Add Supplier</Bootstrap.Button>
                <Bootstrap.Button type="submit" bsStyle="warning" onClick={this.handleClear}>Clear</Bootstrap.Button>
              </Bootstrap.FormGroup>
            </Bootstrap.Navbar.Form>
          
        <table className="table table-inverse">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Reference</th>
                </tr>
              </thead>
              <tbody>
        {
         this.state.suppliers_current_page.slice((this.state.current_page-1) * this.state.records_per_page, this.state.records_per_page*this.state.current_page).map((supplier) => {
                    return (
                      <tr>
                        <th scope='row' type='text'>{supplier.id}</th>
                        <td type='text'>{supplier.name}</td>
                        <td type='text'>{supplier.city}</td>
                        <td type='text'>{supplier.reference}</td>
                        <td><Bootstrap.Button type="submit" bsStyle="primary" id={supplier.id} alt='Edit' onClick={this.handleEdit}> Edit </Bootstrap.Button> 
                        <Bootstrap.Button type="submit" bsStyle="danger" id={supplier.id} alt='delete' onClick={this.handleDelete}> Delete </Bootstrap.Button>
                        </td>
                        </tr>
                    )
                 })
        }
        </tbody>
        </table>
        
          <div id="listingTable"></div>
          <Bootstrap.FormGroup onSubmit={this.changePage}>
            <Bootstrap.Button type="submit" id="btn_prev" bsStyle="primary" onClick={this.handlePrevPage}>Prev</Bootstrap.Button>
            <Bootstrap.Button type="submit" id="btn_next" bsStyle="primary" onClick={this.handleNextPage}>Next</Bootstrap.Button>
            page: {this.state.current_page}
          </Bootstrap.FormGroup>
        </div>
      </div>
    );
  }
}

export default Supplier;
