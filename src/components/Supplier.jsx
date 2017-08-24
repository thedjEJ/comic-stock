import React, { Component } from 'react';
import AlertContainer from 'react-alert';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/es/Modal';
import {
  parseAxiosErrorResponse,
  parseAxiosResponse,
  ALERT_OPTIONS,
} from './../helpers/HelperFunctions';
import '../ComicStore.css';

const axios = require('axios');

class Supplier extends Component {
  constructor(history) {
    super(history);
    axios.create({
      baseURL: 'https://frontendshowcase.azurewebsites.net/api/Suppliers',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      header: 'test',
    });

    this.state = {
      suppliers: [],
      filtered_suppliers: [],
      suppliers_current_page: [],
      supplier_search: '',
      supplier_response: [],
      response: [],
      response_class: [],
      response_status: [],
      suppliers_display: false,
      records_per_page: 5,
      current_page: 1,
      showDeleteModal: false,
    };

    this.history = history.history;
    if (this.history.state) {
      this.state = this.history.state;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
  }

  componentDidMount() {
    this.getFullSupplierList();
    if (this.history.state) {
      this.state = this.history.state;
    }
  }

  getFullSupplierList() {
    axios
      .get(`https://frontendshowcase.azurewebsites.net/api/Suppliers`)
      .then(response => {
        this.setState({ suppliers: response.data });
        this.changePage(this.state.current_page);
        this.parsed_response = parseAxiosResponse(response);
      })
      .catch(error => {
        this.error_response = parseAxiosErrorResponse(error);
        this.setState({
          response: this.error_response.response,
          response_status: this.error_response.status,
          response_class: this.error_response.class,
        });
        // this.setState({errors: this.error_response.response.name})
      });
    return this.state.suppliers;
  }

  showAlert = () => {
    this.msg.show(this.state.response, {
      time: ALERT_OPTIONS.time,
      type: this.state.response_class,
      position: ALERT_OPTIONS.position,
      transition: ALERT_OPTIONS.transition,
      theme: ALERT_OPTIONS.theme,
      icon: (
        <img
          src="https://maxcdn.icons8.com/Share/icon/Cinema//batman_old1600.png"
          width="32px"
          height="32px"
          alt="icon"
        />
      ),
    });
  };

  clearState() {
    this.setState({
      suppliers: [],
      filtered_suppliers: [],
      suppliers_current_page: [],
      supplier_response: [],
      supplier_search: '',
      response: [],
      response_class: [],
      response_status: [],
      supplier_id: '',
      supplier_name: '',
      supplier_city: '',
      supplier_reference: '',
      records_per_page: 5,
      current_page: 1,
    });
  }

  handleEdit(event) {
    this.edit_supplier_id = event.target.id;
    axios
      .get(
        `https://frontendshowcase.azurewebsites.net/api/Suppliers/${this
          .edit_supplier_id}`,
      )
      .then(response => {
        this.parsed_response = parseAxiosResponse(response);
        if (this.parsed_response.class === 'success') {
          this.setState({
            supplier_id: response.data.id,
            supplier_name: response.data.name,
            supplier_city: response.data.city,
            supplier_reference: response.data.reference,
            supplier_search: '',
          });
          this.getFullSupplierList();
        } else {
          this.setState({
            response: this.parsed_response.response,
            response_status: this.parsed_response.status,
            response_class: this.parsed_response.class,
          });
        }
      })
      .catch(error => {
        this.error_response = parseAxiosErrorResponse(error);
        this.setState({
          response: this.error_response.response,
          response_status: this.error_response.status,
          response_class: this.error_response.class,
        });
      });
    this.history.state = this.state;
  }

  handleClear() {
    this.clearState();
    this.getFullSupplierList();
  }

  handleDelete() {
    axios
      .delete(
        `https://frontendshowcase.azurewebsites.net/api/Suppliers/${this.state
          .delete_supplier_id}`,
      )
      .then(response => {
        this.axios_response = parseAxiosResponse(response);
        this.setState({
          response: this.axios_response.response,
          response_class: this.axios_response.class,
        });
        this.toggleDeleteModal();
        this.getFullSupplierList();
        this.showAlert();
      })
      .catch(error => {
        this.error_response = parseAxiosErrorResponse(error);
        this.setState({
          response: this.error_response.response,
          response_status: this.error_response.status,
          response_class: this.error_response.class,
        });
        this.showAlert();
      });
  }

  handleChange(event) {
    const NAME = event.target.id;
    if (event.target.id === 'supplier_search') {
      this.setState({ current_page: 1 });
      this.handleSearch(event);
    }

    this.setState({
      [NAME]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const DATA_TO_SUBMIT = {
      id: event.target.supplier_id.value,
      name: event.target.supplier_name.value,
      city: event.target.supplier_city.value,
      reference: event.target.supplier_reference.value,
    };
    if (
      DATA_TO_SUBMIT.id !== '' ||
      DATA_TO_SUBMIT.name !== '' ||
      DATA_TO_SUBMIT.city !== '' ||
      DATA_TO_SUBMIT.reference !== ''
    ) {
      if (DATA_TO_SUBMIT.id !== '') {
        axios
          .put(
            'https://frontendshowcase.azurewebsites.net/api/Suppliers/',
            DATA_TO_SUBMIT,
          )
          .then(response => {
            this.axios_response = parseAxiosResponse(response);
            this.setState({
              response: this.axios_response.response,
              response_class: this.axios_response.class,
            });
            this.showAlert();
            this.clearState();
          })
          .catch(error => {
            this.error_response = parseAxiosErrorResponse(error);
            this.setState({
              response: this.error_response.response,
              response_status: this.error_response.status,
              response_class: this.error_response.class,
            });
            this.showAlert();
          });
      } else
        axios
          .post(
            'https://frontendshowcase.azurewebsites.net/api/Suppliers/',
            DATA_TO_SUBMIT,
          )
          .then(response => {
            this.axios_response = parseAxiosResponse(response);
            this.setState({
              response: this.axios_response.response,
              response_class: this.axios_response.class,
            });
            this.showAlert();
          })
          .catch(error => {
            this.error_response = parseAxiosErrorResponse(error);
            this.setState({
              response: this.error_response.response,
              response_status: this.error_response.status,
              response_class: this.error_response.class,
            });
            this.showAlert();
          });
    }
    this.getFullSupplierList();
  }

  handleSearch(event) {
    const SEARCH_FILTERED_SUPPLIERS = this.state.suppliers.filter(
      element =>
        element.city.toLowerCase().indexOf(event.target.value) !== -1 ||
        element.name.toLowerCase().indexOf(event.target.value) !== -1 ||
        element.reference.toLowerCase().indexOf(event.target.value) !== -1,
    );
    this.setState({ filtered_suppliers: SEARCH_FILTERED_SUPPLIERS });
  }

  handlePrevPage() {
    if (this.state.current_page > 1) {
      this.setState({ current_page: this.state.current_page - 1 });
      this.changePage(this.state.current_page);
    }
  }

  handleNextPage() {
    if (this.state.current_page < this.numPages()) {
      this.setState({ current_page: this.state.current_page + 1 });
      this.changePage(this.state.current_page + 1);
    }
  }

  changePage(page) {
    let newPage = page;
    // Validate page
    if (newPage < 1) {
      newPage = 1;
    }

    if (newPage > this.numPages()) {
      newPage = this.numPages();
    }

    const SUPPLIERS_PAGE = this.state.suppliers;
    SUPPLIERS_PAGE.slice(
      (newPage - 1) * this.state.records_per_page,
      this.state.records_per_page,
    );

    this.setState({ suppliers_current_page: SUPPLIERS_PAGE });
    this.setState({ filtered_suppliers: SUPPLIERS_PAGE });
  }

  numPages() {
    return Math.ceil(
      this.state.filtered_suppliers.length / this.state.records_per_page,
    );
  }

  toggleDeleteModal(event) {
    this.supplier = [];
    if (event) {
      this.supplier = this.state.suppliers[
        this.state.suppliers.findIndex(
          element => element.id === parseInt(event.target.id, 10),
        )
      ];
      if (this.supplier) {
        this.setState({
          delete_supplier_id: this.supplier.id,
          delete_supplier_name: this.supplier.name,
          delete_supplier_city: this.supplier.city,
          delete_supplier_reference: this.supplier.reference,
        });
      }
    }

    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
    });
  }

  render() {
    return (
      <div className="comic-store">
        <div className="comic-store-header">
          <h2>Suppliers</h2>
          <div>
            <form onSubmit={this.handleSubmit}>
              <Navbar.Form pullLeft>
                <FormGroup>
                  Supplier details:
                  <FormControl
                    type="text"
                    id="supplier_id"
                    value={this.state.supplier_id}
                    placeholder="id"
                    onChange={this.handleChange}
                  />
                  <FormControl
                    type="text"
                    id="supplier_name"
                    value={this.state.supplier_name}
                    placeholder="name"
                    onChange={this.handleChange}
                  />
                  <FormControl
                    type="text"
                    id="supplier_city"
                    value={this.state.supplier_city}
                    placeholder="city"
                    onChange={this.handleChange}
                  />
                  <FormControl
                    type="text"
                    id="supplier_reference"
                    value={this.state.supplier_reference}
                    placeholder="reference"
                    onChange={this.handleChange}
                  />
                  <Button type="submit" bsStyle="primary">
                    Update Supplier
                  </Button>
                  <Button
                    type="button"
                    bsStyle="warning"
                    onClick={this.handleClear}
                  >
                    Clear
                  </Button>
                </FormGroup>
              </Navbar.Form>
            </form>
            <div>
              <Navbar.Form pullLeft>
                <FormGroup onSubmit={this.handleSearch}>
                  Search:
                  <FormControl
                    type="text"
                    id="supplier_search"
                    value={this.state.supplier_search}
                    placeholder="Search"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Navbar.Form>
            </div>
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
                {this.state.filtered_suppliers
                  .slice(
                    (this.state.current_page - 1) * this.state.records_per_page,
                    this.state.records_per_page * this.state.current_page,
                  )
                  .map(supplier =>
                    <tr>
                      <th scope="row" type="text">
                        {supplier.id}
                      </th>
                      <th type="text">
                        {supplier.name}
                      </th>
                      <td type="text">
                        {supplier.city}
                      </td>
                      <td type="text">
                        {supplier.reference}
                      </td>
                      <td>
                        <Button
                          type="submit"
                          bsStyle="primary"
                          id={supplier.id}
                          alt="Edit"
                          onClick={this.handleEdit}
                        >
                          {' '}Edit{' '}
                        </Button>
                        <Button
                          type="submit"
                          bsStyle="danger"
                          id={supplier.id}
                          alt="delete"
                          onClick={this.toggleDeleteModal}
                        >
                          {' '}Delete{' '}
                        </Button>
                      </td>
                    </tr>,
                  )}
              </tbody>
            </table>

            <div id="listingTable" />
            <FormGroup onSubmit={this.changePage}>
              <Button
                type="submit"
                id="btn_prev"
                bsStyle="primary"
                onClick={this.handlePrevPage}
              >
                Prev
              </Button>
              <Button
                type="submit"
                id="btn_next"
                bsStyle="primary"
                onClick={this.handleNextPage}
              >
                Next
              </Button>
              page: {this.state.current_page} of{' '}
              {Math.ceil(
                this.state.filtered_suppliers.length /
                  this.state.records_per_page,
              )}
            </FormGroup>
          </div>
        </div>
        <Modal show={this.state.showDeleteModal}>
          <Modal.Header>
            <Modal.Title>Delete Supplier</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={this.handleDelete}>
              <Navbar.Form>
                <FormGroup>
                  <table className="table table-inverse">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Reference</th>
                      </tr>
                      <tr>
                        <th>
                          {this.state.delete_supplier_name}
                        </th>
                        <th>
                          {this.state.delete_supplier_city}
                        </th>
                        <th>
                          {this.state.delete_supplier_reference}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <Button bsStyle="primary" onClick={this.handleDelete}>
                        Delete
                      </Button>
                    </tbody>
                  </table>
                </FormGroup>
              </Navbar.Form>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleDeleteModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
        <AlertContainer
          ref={a => {
            this.msg = a;
          }}
          {...this.ALERT_OPTIONS}
        />
      </div>
    );
  }
}

export default Supplier;
