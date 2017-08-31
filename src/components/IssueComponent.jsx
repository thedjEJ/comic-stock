import AlertContainer from 'react-alert';
import PropTypes from 'proptypes';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../ComicStore.css';
import {
  parseAxiosErrorResponse,
  parseAxiosResponse,
  ALERT_OPTIONS,
} from './../helpers/HelperFunctions';
import {
  Button,
  Carousel,
  FormControl,
  FormGroup,
  Navbar,
} from 'react-bootstrap';
import { renderComic } from './../views/IssueView';
import OrderModal from './../components/OrderModal';

const axios = require('axios');
// var suppliers = Supplier.createClass();

class IssueComponent extends Component {
  constructor(props) {
    super(props);
    axios.create({
      baseURL: 'https://frontendshowcase.azurewebsites.net/api/Issues',
      header: 'test',
    });

    this.state = {
      issues: [],
      suppliers: [],
      response: '',
      response_class: '',
      response_status: '',
      orderModalIsOpen: false,
      issue_title: '',
      issue_images: [],
      issues_display: false,
    };

    this.history = props.history;
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
        this.axios_response = parseAxiosResponse(response);
        this.setState({
          issues: response.data,
          response: this.axios_response.response,
          response_class: this.axios_response.class,
        });
      })
      .catch(error => {
        this.error_response = parseAxiosResponse(error);
        this.setState({
          response: this.error_response.response,
          response_status: this.error_response.status,
          response_class: this.error_response.class,
        });
      });
    this.getFullSupplierList();
  }

  getFullSupplierList() {
    axios
      .get(`https://frontendshowcase.azurewebsites.net/api/Suppliers`)
      .then(response => {
        this.setState({ suppliers: response.data });
        this.parsed_response = parseAxiosResponse(response);
      })
      .catch(error => {
        this.error_response = parseAxiosErrorResponse(error);
        this.setState({
          response: this.error_response.response,
          response_status: this.error_response.status,
          response_class: this.error_response.class,
        });
      });
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
    const name = event.target.id;

    this.setState({
      [name]: event.target.value,
    });
  }

  handleOrder() {
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
      .then(res => this.setState({ issues: res.data }))
      .catch(errorRes => {
        this.error_response = parseAxiosResponse(errorRes);
        this.setState({
          response: this.error_response.response,
          response_status: this.error_response.status,
          response_class: this.error_response.class,
        });
        this.showAlert();
      });
  }

  toggleOrderModal(event) {
    console.log('toggleOrderModal 1');
    console.log(event.target.id);
    console.log(event);
    if (event.target.id) {
      const comic = this.state.issues[
        this.state.issues.findIndex(
          element => element.id === parseInt(event.target.id, 10),
        )
      ];
      console.log("USING ISSUE");
      console.log(comic);
      this.setState({
        orderModalIsOpen: !this.state.orderModalIsOpen,
        issue_title: comic.title,
        issue_description: comic.description,
        issue_images: comic.images,
      });
    }
  }

  render() {
    console.log(this.state.issues);
    return (
      <div className="comic-store">
        <div className="comic-store-header">
          <h2>Issues</h2>
          <AlertContainer
            ref={a => {
              this.msg = a;
            }}
            {...ALERT_OPTIONS}
          />
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
                {this.state.issues.map(issue => renderComic(issue))}
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>test1</th>
                </tr>
              </thead>
              <tbody>
                {this.state.issues.map(issue =>
                  <Button
                    type="submit"
                    bsStyle="primary"
                    id={issue.id}
                    alt="order"
                    onClick={this.toggleOrderModal}
                  >
                    {' '}Order{' '}
                  </Button>,
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <OrderModal
            orderModalIsOpen={false}
            issue_title={this.state.issue_title}
            issue_description={this.state.description}
            issue_images={this.state.issue_images}
            suppliers={this.state.suppliers}
            onClose={this.toggleOrderModal}
          />
        </div>
      </div>
    );
  }
}

IssueComponent.constructor.propTypes = {
  history: PropTypes.objectOf(BrowserRouter.history).isRequired,
};

export default IssueComponent;
