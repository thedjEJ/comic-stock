import React, { Component } from "react";
import "../ComicStore.css";
import displayConfirm from "./ConfirmModal";
import {
  Collapse,
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
      baseURL: "http://frontendshowcase.azurewebsites.net/api/Issues",
      header: "test"
    })

    this.state = {
      issues: [],
      issues_display: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleIssuesCollapse = this.toggleIssuesCollapse.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://frontendshowcase.azurewebsites.net/api/Issues`)
      .then(res => this.setState({ issues: res.data }))
      .catch(err => console.log(err));
  }

  handleChange(event) {
    //console.log("EVENT:"+event)
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
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
    this.state.axios
      .put(`http://frontendshowcase.azurewebsites.net/api/Issues`, body)
      .then(
        res => this.setState({ issues: res.data }),
        console.log("PUT: " + this.state.issues),
        alert(this.state.issues)
      )
      .catch(err => console.log(err));
  }

  handleDelete(event) {
    console.log("DELETE EVENT:" + event.target.id);
    axios
      .get(
        `http://frontendshowcase.azurewebsites.net/api/Issues/` +
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

  toggleIssuesCollapse(){
    this.setState({ issues_display: !this.state.issues_display });
  }

  render(api_request) {
    //if (api_request == 'issues'){
    //console.log("response: " +this.state.issues)
    //}

    return (
      <div className="comic-store">
        <div className="comic-store-header">
          <h2 onClick={this.toggleIssuesCollapse}>Issues</h2>
          <Collapse in={this.state.issues_display}>
            <div>
              <form onSubmit={this.handleSubmit}>
                <Navbar.Form pullLeft>
                  <FormGroup>
                  Issue details:
                  <FormControl
                    type="text"
                    id="issue_id"
                    onChange={this.handleChange}
                  />
                  <FormControl
                    type="text"
                    id="issue_name"
                    onChange={this.handleChange}
                  />
                  <FormControl
                    type="text"
                    id="issue_city"
                    onChange={this.handleChange}
                  />
                  <FormControl
                    type="text"
                    id="issue_reference"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                </Navbar.Form>
                <FormControl type="submit" value="Add Issue" />
              </form>
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
              {this.state.issues.map(issue => {
                return (
                  <tr>
                          <th scope="row" type="text">
                            {issue.id}
                          </th>
                          <th scope="row"><img
                            className="thumbnail"
                            alt="thumbnail"
                            src={
                              issue.thumbnail.path + "." + issue.thumbnail.extension
                            }
                            />{" "}
                          </th>
                          <th scope="row" type="text">
                            {issue.title}
                          </th>
                          <th scope="row" type="text">
                            {issue.seriesNumber}
                          </th>
                          <th scope="row" type="text">
                            {issue.publisherId}
                          </th>
                      <Button
                              type="submit"
                              bsStyle="danger"
                              id={issue.id}
                              alt="delete"
                              onClick={() => {
                                (displayConfirm('Delete Issue')
                                  .then(
                                    (proceed) =>{this.handleDelete},
                                    (cancel) =>{/*do nothing*/}
                                  ))
                                }
                              }
                            >
                              {" "}Delete{" "}
                            </Button>
                            </tr>
                );
              })}
              </tbody>
              </table>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default Issue;
