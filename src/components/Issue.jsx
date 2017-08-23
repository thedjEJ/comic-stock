import React, { Component } from 'react';
import '../ComicStore.css';
import Modal from 'react-bootstrap/es/Modal';
import AlertContainer from 'react-alert';
import { Button, FormControl, FormGroup, Navbar } from 'react-bootstrap';
import {
  parseAxiosErrorResponse,
  parseAxiosResponse,
  ALERT_OPTIONS,
} from './../helpers/HelperFunctions';
const axios = require('axios');
// var suppliers = Supplier.createClass();

class Issue extends Component {
  constructor(history) {
    super(history);
    axios.create({
      baseURL: 'https://frontendshowcase.azurewebsites.net/api/Issues',
      header: 'test',
    });

    console.log('GETTING SUPPLIERS IN ISSUES');
    console.log('GOT SUPPLIERS IN ISSUES');

    this.state = {
      issues: [],
      suppliers: [],
      response: '',
      response_class: '',
      response_status: '',
      orderModalIsOpen: false,
      issue_title: '',
      issue_thumbnail_extension: '',
      issue_thumbnail_path: '',
      issues_display: false,
    };

    this.history = history.history;
    if (this.history.state) {
      this.state = this.history.state;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.toggleOrderModal = this.toggleOrderModal.bind(this);
  }

  componentDidMount() {
    axios
      .get(`https://frontendshowcase.azurewebsites.net/api/Issues`)
      .then(response => {
        console.log('BEFORE BREAK');
        console.log(response);
        this.axios_response = parseAxiosResponse(response);
        this.setState({
          issues: response.data,
          response: this.axios_response.response,
          response_class: this.axios_response.class,
        });
      })
      .catch(error => {
        console.log('THIS BREAKS!!!');
        console.log(error);
        this.error_response = parseAxiosResponse(error);
        this.setState({
          response: this.error_response.response,
          response_status: this.error_response.status,
          response_class: this.error_response.class,
        });
      });
    this.getFullSupplierList();
  }

  showAlert = () => {
    this.msg.show(this.state.response, {
      type: this.state.response_class,
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

  handleChange(event) {
    console.log(event);
    const name = event.target.id;

    this.setState({
      [name]: event.target.value,
    });
    console.log(this.state);
  }

  getFullSupplierList() {
    axios
      .get(`https://frontendshowcase.azurewebsites.net/api/Suppliers`)
      .then(response => {
        console.log('RESPONSE AFTER MOUNT');
        console.log(response.data);
        this.setState({ suppliers: response.data });
        this.parsed_response = parseAxiosResponse(response);
        console.log('PARSED RESPONSE');
        console.log(this.parsed_response);
      })
      .catch(error => {
        this.error_response = parseAxiosErrorResponse(error);
        console.log('ERROR RESPONSE');
        console.log(this.error_response.response);
        console.log('ABOUT TO SET STATE');
        console.log(this.state);
        this.setState({
          response: this.error_response.response,
          response_status: this.error_response.status,
          response_class: this.error_response.class,
        });
      });
    console.log('getFullSupplierList DONE');
  }

  handleOrder(event) {
    console.log(`EVENT:${event}`);
    const body = {
      id: 777,
      title: 'Super Ezra',
      description: 'The Super adventures of SUPER EZRA! DA DA DA DAAAAAA!',
      seriesNumber: 0,
      publicationDate: '2017-08-08T06:59:43.547Z',
      publisherId: 0,
      publisher: 'Dc',
    };
    axios
      .put(`https://frontendshowcase.azurewebsites.net/api/Issues`, body)
      .then(
        res => this.setState({ issues: res.data }),
        console.log(`PUT: ${this.state.issues}`),
      )
      .catch(error_res => {
        this.error_response = parseAxiosResponse(error_res);
        this.setState({
          response: this.error_response.response,
          response_status: this.error_response.status,
          response_class: this.error_response.class,
        });
        this.showAlert();
        console.log(this.error_response);
      });
  }

  toggleOrderModal(event) {
    this.setState({ orderModalIsOpen: !this.state.orderModalIsOpen });

    if (event.target.id) {
      const comic = this.state.issues[
        this.state.issues.findIndex(element => element.id == event.target.id)
      ];

      this.setState({
        issue_title: comic.title,
        issue_description: comic.description,
        issue_thumbnail_path: comic.thumbnail.path,
        issue_thumbnail_extension: comic.thumbnail.extension,
      });
      console.log(comic);
    }
  }

  render(api_request) {
    // if (api_request == 'issues'){
    // console.log("response: " +this.state.issues)
    // }
    return (
      <div className="comic-store">
        <div className="comic-store-header">
          <h2>Issues</h2>
          <AlertContainer ref={a => (this.msg = a)} {...this.ALERT_OPTIONS} />
          <div>
            <table className="table table-inverse">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Publisher</th>
                </tr>
              </thead>
              <tbody>
                {this.state.issues.map(issue =>
                  <tr>
                    <th scope="row" type="text">
                      {issue.id}
                    </th>
                    <th scope="row">
                      <img
                        id={issue.id}
                        className="thumbnail"
                        alt="thumbnail"
                        src={`${issue.thumbnail.path}.${issue.thumbnail
                          .extension}`}
                        onClick={this.toggleOrderModal}
                      />
                    </th>
                    <th scope="row" type="text">
                      {issue.title}
                    </th>
                    <th scope="row" type="text">
                      {issue.description}
                    </th>
                    <th scope="row" type="text">
                      {issue.publisher}
                    </th>
                    <Button
                      type="submit"
                      bsStyle="primary"
                      id={issue.id}
                      alt="order"
                      onClick={this.toggleOrderModal}
                    >
                      {' '}Order{' '}
                    </Button>
                  </tr>,
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Modal show={this.state.orderModalIsOpen}>
          <Modal.Header>
            <Modal.Title>
              {this.state.issue_title}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <table>
              <thead>
                <tr>
                  <th>
                    <img
                      className="thumbnail-large"
                      alt="thumbnail"
                      src={`${this.state.issue_thumbnail_path}.${this.state
                        .issue_thumbnail_extension}`}
                      onClick={this.toggleOrderModal}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    {this.state.issue_description}
                  </th>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <form onSubmit={this.handleOrder}>
                <Navbar.Form pullLeft>
                  <FormGroup>
                    <table>
                      <thead>
                        <tr>
                          <th>Supplier</th>
                          <th>Condition</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                              <select
                                className="form-control"
                                title="Supplier"
                                id="supplier_dropdown_mint"
                                value={this.state.supplier_dropdown_mint}
                              >
                                {this.state.suppliers.map(supplier =>
                                  <option value={supplier.id}>
                                    {supplier.name}
                                  </option>,
                                )}
                              </select>
                            </div>
                          </th>
                          <th>Mint</th>
                          <th>
                            <FormControl
                              type="number"
                              min="0"
                              max="100"
                              id="order_mint"
                              value={this.state.order_mint}
                              placeholder="0"
                              onChange={this.handleChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                              <select
                                className="form-control"
                                title="Supplier"
                                id="supplier_dropdown_fine"
                                value={this.state.supplier_dropdown_fine}
                              >
                                {this.state.suppliers.map(supplier =>
                                  <option value={supplier.id}>
                                    {supplier.name}
                                  </option>,
                                )}
                              </select>
                            </div>
                          </th>
                          <th>Fine</th>
                          <th>
                            <FormControl
                              type="number"
                              min="0"
                              max="100"
                              id="order_fine"
                              value={this.state.order_fine}
                              placeholder="0"
                              onChange={this.handleChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                              <select
                                className="form-control"
                                title="Supplier"
                                id="supplier_dropdown_good"
                                value={this.state.supplier_dropdown_good}
                              >
                                {this.state.suppliers.map(supplier =>
                                  <option value={supplier.id}>
                                    {supplier.name}
                                  </option>,
                                )}
                              </select>
                            </div>
                          </th>
                          <th>Good</th>
                          <th>
                            <FormControl
                              type="number"
                              min="0"
                              max="100"
                              id="order_good"
                              value={this.state.order_good}
                              placeholder="0"
                              onChange={this.handleChange}
                            />
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                              <select
                                className="form-control"
                                title="Supplier"
                                id="supplier_dropdown_poor"
                                value={this.state.supplier_dropdown_poor}
                              >
                                {this.state.suppliers.map(supplier =>
                                  <option value={supplier.id}>
                                    {supplier.name}
                                  </option>,
                                )}
                              </select>
                            </div>
                          </th>
                          <th>Poor</th>
                          <th>
                            <FormControl
                              type="number"
                              min="0"
                              max="100"
                              id="order_poor"
                              value={this.state.order_poor}
                              placeholder="0"
                              onChange={this.handleChange}
                            />
                          </th>
                        </tr>
                      </tbody>
                    </table>
                    <Button bsStyle="primary" onClick={this.handleOrder}>
                      Order Now
                    </Button>
                    <Button onClick={this.toggleOrderModal}>Close</Button>
                  </FormGroup>
                </Navbar.Form>
              </form>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Issue;
