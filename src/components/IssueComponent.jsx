import PropTypes from 'proptypes';
import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../ComicStore.css';
import {
  parseAxiosErrorResponse,
  parseAxiosResponse,
} from './../helpers/HelperFunctions';

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
}

IssueComponent.constructor.propTypes = {
  history: PropTypes.objectOf(BrowserRouter.history).isRequired,
};

export default IssueComponent;
