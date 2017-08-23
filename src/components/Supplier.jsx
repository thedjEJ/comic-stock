import React, { Component } from "react";
import "../ComicStore.css";
import AlertContainer from "react-alert";
import { Navbar, FormGroup, FormControl, Button } from "react-bootstrap";
import Modal from "react-bootstrap/es/Modal";
import {
  parseAxiosErrorResponse,
  parseAxiosResponse,
  getSupplier,
  ALERT_OPTIONS
} from "./../helpers/HelperFunctions";
let axios = require("axios");

class Supplier extends Component {
  constructor(history) {
    super(history);
    axios.create({
      baseURL: "https://frontendshowcase.azurewebsites.net/api/Suppliers",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      header: "test"
    });

    this.state = {
      suppliers: [],
      filtered_suppliers: [],
      suppliers_current_page: [],
      supplier_search: "",
      supplier_response: [],
      response: [],
      response_class: [],
      response_status: [],
      suppliers_display: false,
      records_per_page: 5,
      current_page: 1,
      showDeleteModal: false
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

  showAlert = () => {
    console.log("ALERT TYPE");
    console.log(this.state.response_class);
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
      )
    });
  };

  clearState() {
    this.setState({
      suppliers: [],
      filtered_suppliers: [],
      suppliers_current_page: [],
      supplier_response: [],
      supplier_search: "",
      response: [],
      response_class: [],
      response_status: [],
      supplier_id: "",
      supplier_name: "",
      supplier_city: "",
      supplier_reference: "",
      records_per_page: 5,
      current_page: 1
    });
  }

  getFullSupplierList() {
    axios
      .get(`https://frontendshowcase.azurewebsites.net/api/Suppliers`)
      .then(response => {
        console.log("RESPONSE AFTER MOUNT");
        console.log(response.data);
        this.setState({ suppliers: response.data });
        this.changePage(this.state.current_page);
        this.parsed_response = parseAxiosResponse(response);
        console.log("PARSED RESPONSE");
        console.log(this.parsed_response);
      })
      .catch(error => {
        this.error_response = parseAxiosErrorResponse(error);
        this.setState({
          response: this.error_response.response,
          response_status: this.error_response.status,
          response_class: this.error_response.class
        });
        //this.setState({errors: this.error_response.response.name})
        console.log(this.error_response);
      });
    console.log("getFullSupplierList DONE");
    return this.state.suppliers;
  }

  componentDidMount() {
    this.getFullSupplierList();
    if (this.history.state) {
      this.state = this.history.state;
    }
  }

  handleEdit(event) {
    console.log("handleEdit");
    console.log(event.target.id);
    this.edit_supplier_id = event.target.id;
    axios
      .get(
        `https://frontendshowcase.azurewebsites.net/api/Suppliers/` +
          this.edit_supplier_id
      )
      .then(response => {
        console.log("SUCCESS EDIT");
        this.parsed_response = parseAxiosResponse(response);
        console.log(this.parsed_response);
        if (this.parsed_response.class === "success") {
          this.setState({
            supplier_id: response.data.id,
            supplier_name: response.data.name,
            supplier_city: response.data.city,
            supplier_reference: response.data.reference,
            supplier_search: ""
          });
          this.getFullSupplierList();
        } else {
          this.setState({
            response: this.parsed_response.response,
            response_status: this.parsed_response.status,
            response_class: this.parsed_response.class
          });
        }
      })
      .catch(error => {
        this.error_response = parseAxiosErrorResponse(error);
        this.setState({
          response: this.error_response.response,
          response_status: this.error_response.status,
          response_class: this.error_response.class
        });
        console.log(this.error_response);
      });
    this.history.state = this.state;
  }

  handleClear(event) {
    console.log("CLEAR EVENT:" + event.target.id);
    this.clearState();
    this.getFullSupplierList();
  }

  handleDelete(event) {
    console.log("DELETE EVENT:" + this.state.delete_supplier_id);
    axios
      .delete(
        `https://frontendshowcase.azurewebsites.net/api/Suppliers/` +
          this.state.delete_supplier_id
      )
      .then(response => {
        this.axios_response = parseAxiosResponse(response);
        this.setState({
          response: this.axios_response.response,
          response_class: this.axios_response.class
        });
        console.log(this.axios_response.response);
        this.toggleDeleteModal();
        this.getFullSupplierList();
        this.showAlert();
      })
      .catch(error => {
        this.error_response = parseAxiosErrorResponse(error);
        this.setState({
          response: this.error_response.response,
          response_status: this.error_response.status,
          response_class: this.error_response.class
        });
        console.log(this.error_response);
        this.showAlert();
      });
  }

  handleChange(event) {
    const name = event.target.id;
    if (event.target.id === "supplier_search") {
      this.setState({ current_page: 1 });
      this.handleSearch(event);
    }

    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("HANDLE SUBMIT");
    console.log(event.target.supplier_city);
    const data_to_submit = {
      id: event.target.supplier_id.value,
      name: event.target.supplier_name.value,
      city: event.target.supplier_city.value,
      reference: event.target.supplier_reference.value
    };
    if (
      data_to_submit.id !== "" ||
      data_to_submit.name !== "" ||
      data_to_submit.city !== "" ||
      data_to_submit.reference !== ""
    ) {
      if (data_to_submit.id !== "") {
        axios
          .put(
            "https://frontendshowcase.azurewebsites.net/api/Suppliers/",
            data_to_submit
          )
          .then(response => {
            this.axios_response = parseAxiosResponse(response);
            this.setState({
              response: this.axios_response.response,
              response_class: this.axios_response.class
            });
            console.log(this.axios_response.response);
            this.showAlert();
            this.clearState();
          })
          .catch(error => {
            this.error_response = parseAxiosErrorResponse(error);
            this.setState({
              response: this.error_response.response,
              response_status: this.error_response.status,
              response_class: this.error_response.class
            });
            this.showAlert();
            console.log(this.error_response);
          });
      } else
        axios
          .post(
            "https://frontendshowcase.azurewebsites.net/api/Suppliers/",
            data_to_submit
          )
          .then(response => {
            this.axios_response = parseAxiosResponse(response);
            this.setState({
              response: this.axios_response.response,
              response_class: this.axios_response.class
            });
            this.showAlert();
            console.log(this.axios_response.response);
          })
          .catch(error => {
            this.error_response = parseAxiosErrorResponse(error);
            this.setState({
              response: this.error_response.response,
              response_status: this.error_response.status,
              response_class: this.error_response.class
            });
            this.showAlert();
          });
    }
    this.getFullSupplierList();
  }

  handleSearch(event) {
    console.log("SEARCH");
    console.log(event.target.value);
    const search_filtered_suppliers = this.state.suppliers.filter(function(
      element
    ) {
      return (
        element.city.toLowerCase().indexOf(event.target.value) !== -1 ||
        element.name.toLowerCase().indexOf(event.target.value) !== -1 ||
        element.reference.toLowerCase().indexOf(event.target.value) !== -1
      );
    });
    console.log("search_filtered_suppliers");
    console.log(search_filtered_suppliers);
    this.setState({ filtered_suppliers: search_filtered_suppliers });
  }

  handlePrevPage(event) {
    console.log("Page Logging Prev");
    console.log(this.numPages());
    console.log(this.state.current_page);
    console.log(this.state.suppliers_current_page);
    console.log(this.state.suppliers);
    if (this.state.current_page > 1) {
      this.setState({ current_page: this.state.current_page - 1 });
      this.changePage(this.state.current_page);
    }
  }

  handleNextPage(event) {
    console.log("Page Logging Next");
    console.log(this.numPages());
    console.log(this.state.current_page);
    console.log(this.state.suppliers_current_page);
    console.log(this.state.suppliers);
    if (this.state.current_page < this.numPages()) {
      this.setState({ current_page: this.state.current_page + 1 });
      this.changePage(this.state.current_page + 1);
    }
  }

  changePage(page) {
    // Validate page
    if (page < 1) {
      page = 1;
    }

    if (page > this.numPages()) {
      page = this.numPages();
    }

    var suppliers_page = this.state.suppliers;
    suppliers_page.slice(
      (page - 1) * this.state.records_per_page,
      this.state.records_per_page
    );

    this.setState({ suppliers_current_page: suppliers_page });
    this.setState({ filtered_suppliers: suppliers_page });
  }

  numPages() {
    console.log("NUMPAGES CALL");
    console.log(this.state.suppliers.length);
    console.log(this.state.records_per_page);
    return Math.ceil(
      this.state.filtered_suppliers.length / this.state.records_per_page
    );
  }

  toggleDeleteModal(event) {
    console.log("TOGGLE DELETE");
    this.supplier = [];
    if (event) {
      this.supplier = this.state.suppliers[
        this.state.suppliers.findIndex(function(element) {
          return element.id == event.target.id;
        })
      ];
      this.setState({
        delete_supplier_id: this.supplier.id,
        delete_supplier_name: this.supplier.name,
        delete_supplier_city: this.supplier.city,
        delete_supplier_reference: this.supplier.reference
      });
    }

    this.setState({
      showDeleteModal: !this.state.showDeleteModal
    });
  }

  render(api_request) {
    //if (api_request == 'suppliers'){
    //console.log("response: " +this.state.suppliers)
    //}
    var error_class = "alert-" + this.state.response_class;
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
                    this.state.records_per_page * this.state.current_page
                  )
                  .map(supplier => {
                    return (
                      <tr>
                        <th scope="row" type="text">
                          {supplier.id}
                        </th>
                        <td type="text">
                          {supplier.name}
                        </td>
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
                            {" "}Edit{" "}
                          </Button>
                          <Button
                            type="submit"
                            bsStyle="danger"
                            id={supplier.id}
                            alt="delete"
                            onClick={this.toggleDeleteModal}
                          >
                            {" "}Delete{" "}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
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
              page: {this.state.current_page} of{" "}
              {Math.ceil(
                this.state.filtered_suppliers.length /
                  this.state.records_per_page
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
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <tr>
                          <th>
                            {this.state.delete_supplier_name}
                          </th>
                          <th>
                            {this.state.delete_supplier_city}
                          </th>
                        </tr>
                        <th>
                          {this.state.delete_supplier_reference}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <Button bsStyle="primary" onClick={this.handleDelete}>
                    Delete
                  </Button>
                </FormGroup>
              </Navbar.Form>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleDeleteModal}>sCancel</Button>
          </Modal.Footer>
        </Modal>
        <AlertContainer ref={a => (this.msg = a)} {...this.ALERT_OPTIONS} />
      </div>
    );
  }
}

export default Supplier;
