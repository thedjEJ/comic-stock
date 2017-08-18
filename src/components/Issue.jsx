import React, { Component } from "react";
import "../ComicStore.css";
import displayConfirm from "./ConfirmModal";
import Supplier from "./Supplier";
import Modal from "react-bootstrap/es/Modal";
import {
  Navbar,
  FormGroup,
  FormControl,
  Button
} from "react-bootstrap";
import {
  parseAxiosErrorResponse,
  parseAxiosResponse
} from "./../helpers/HelperFunctions";
let axios = require("axios");

class Issue extends Component {
  constructor() {
    super();
    var axios = require("axios");
    axios: axios.create({
      baseURL: "https://frontendshowcase.azurewebsites.net/api/Issues",
      header: "test"
    });

    this.state = {
      issues: [],
      orderModalIsOpen: false,
      issue_title: "",
      issue_thumbnail_extension: "",
      issue_thumbnail_path: "",
      issues_display: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleOrderModal = this.toggleOrderModal.bind(this);
  }

  componentDidMount() {
    axios
      .get(`https://frontendshowcase.azurewebsites.net/api/Issues`)
      .then(response => {
        this.axios_response = parseAxiosResponse(response) 
        this.setState({
          issues: response.data,
          response: this.axios_response.response,
          response_class: this.axios_response.class 
        })
      })
      .catch(error => {
        this.error_response = parseAxiosErrorResponse(error);
        this.setState({ errors: this.error_response.response });
        console.log(this.error_response);
      });
  }

  handleChange(event) {
    console.log("EVENT TARGET VALUE:"+event.target.value)
    //this.setState({ value: event.target.value });
  }

  handleOrder(event) {
    console.log("EVENT:" + event);
    const body = {
      id: 777,
      title: "Super Ezra",
      description: "The Super adventures of SUPER EZRA! DA DA DA DAAAAAA!",
      seriesNumber: 0,
      publicationDate: "2017-08-08T06:59:43.547Z",
      publisherId: 0,
      publisher: "Dc"
    };
    axios
      .put(`https://frontendshowcase.azurewebsites.net/api/Issues`, body)
      .then(
        res => this.setState({ issues: res.data }),
        console.log("PUT: " + this.state.issues),
        alert(this.state.issues)
      )
      .catch(error => {
        this.error_response = parseAxiosErrorResponse(error);
        this.setState({ errors: this.error_response.response });
        console.log(this.error_response);
      });
      alert('Try harder')
  }

  handleDelete(event) {
    console.log("DELETE EVENT:" + event.target.id);
    axios
      .get(
        `https://frontendshowcase.azurewebsites.net/api/Issues/` +
          event.target.id
      )
      .then(response => {
        this.axios_response = parseAxiosResponse(response);
        this.setState({
          response: this.axios_response.response,
          response_class: this.axios_response.class
        });
        console.log(this.axios_response.response);
      })
      .catch(error => {
        this.error_response = parseAxiosErrorResponse(error);
        this.setState({ errors: this.error_response.response });
        console.log(this.error_response);
      });
  }

  toggleOrderModal(event) {
    this.setState({ orderModalIsOpen: !this.state.orderModalIsOpen });

    if (event.target.id) {
      const comic = this.state.issues[
        this.state.issues.findIndex(function(element) {
          return element.id == event.target.id;
        })
      ];

      this.setState({
        issue_title: comic.title,
        issue_description: comic.description,
        issue_thumbnail_path: comic.thumbnail.path,
        issue_thumbnail_extension: comic.thumbnail.extension
      });
      console.log(comic);
    }
  }

  render(api_request) {
    //if (api_request == 'issues'){
    //console.log("response: " +this.state.issues)
    //}
    console.log("SUPPLIERS BLECH")
    console.log(Supplier.getFullSupplierList)
    
    
    console.log("SUPPLIERS BLECH DONE")
    return (
      <div className="comic-store">
        <div className="comic-store-header">
          <h2>Issues</h2>
            <div>
              <table className="table table-inverse">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Series Number</th>
                    <th>Publisher Id</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.issues.map(issue => {
                    return (
                      <tr>
                        <th scope="row" type="text">
                          {issue.id}
                        </th>
                        <th scope="row">
                          <img
                            className="thumbnail"
                            alt="thumbnail"
                            src={
                              issue.thumbnail.path +
                              "." +
                              issue.thumbnail.extension
                            }
                          />
                        </th>
                        <th scope="row" type="text">
                            {issue.title}
                        </th>
                        <th scope="row" type="text">
                            {issue.description}
                        </th>
                        <th scope="row" type="text">
                          {issue.seriesNumber}
                        </th>
                        <th scope="row" type="text">
                          {issue.publisherId}
                        </th>
                        <Button
                          type="submit"
                          bsStyle="primary"
                          id={issue.id}
                          alt="order"
                          onClick={this.toggleOrderModal}
                        >
                          {" "}Order{" "}
                        </Button>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
        </div>
        <Modal show={this.state.orderModalIsOpen}>
          <Modal.Header>
            <Modal.Title>Order Comic</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <tr>
                    <th>
                      {this.state.issue_title}
                    </th>
                    <th>
                      <img
                        className="thumbnail-large"
                        alt="thumbnail"
                        src={
                          this.state.issue_thumbnail_path +
                          "." +
                          this.state.issue_thumbnail_extension
                        }
                      />
                    </th>
                  </tr>
                  <th>
                    {this.state.issue_description}
                  </th>
                </tr>
              </tbody>
            </table>
            <div>
              <form onSubmit={this.handleOrder}>
              <Navbar.Form pullLeft>
                <FormGroup>
                <table>
                  <thead>
                    <tr>
                      <th>
                        Supplier
                      </th>
                    </tr>
                    <tr>
                      <th>
                        Condition
                      </th>
                      <th>
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <FormControl
                          type="number"
                          min="0"
                          max="100"
                          id="order_very_fine"
                          value={Supplier.getFullSupplierList}
                          placeholder="0"
                          onChange={this.handleChange}
                        />
                      </th>
                      <th>
                        Mint
                      </th>
                      <th>
                        <FormControl
                          type="number"
                          min="0"
                          max="100"
                          id="order_very_fine"
                          value={this.state.order_very_fine}
                          placeholder="0"
                          onChange={this.handleChange}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>
                        Fine
                      </th>
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
                        Good
                      </th>
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
                        Poor
                      </th>
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
                </FormGroup>
              </Navbar.Form>
            </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleOrderModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Issue;
