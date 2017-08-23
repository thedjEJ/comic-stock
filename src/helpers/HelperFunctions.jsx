const axios = require('axios');
const ALERT_OPTIONS = {
  offset: 14,
  position: 'top right',
  theme: 'dark',
  time: 5000,
  transition: 'scale',
};

function parseAxiosErrorResponse(error) {
  console.log('PARSE ERROR');
  console.log(error);
  console.log(error.response);
  console.log(error.request);
  console.log(error);
  if (error.response) {
    try {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        response: error.response.request.statusText,
        status: error.response.request.status,
        class: 'error',
      };
    } catch (e) {
      return {
        response: 'Unknown error parsing response',
        status: '500',
        class: 'error',
      };
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return {
      response: error.request,
      status: 'No response from server',
      class: 'error',
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      response: error.message,
      status: 'Error',
      class: 'error',
    };
  }
}

function parseAxiosResponse(response) {
  console.log('AXIOS PARSE');
  console.log(response.response);
  console.log(response.request);
  console.log(response);
  if (response.status < 300) {
    // The request was made and the server responded with an OK status code
    // 200 response
    return {
      response: response.statusText,
      status: response.status,
      class: 'success',
    };
  } else if (response.status < 500) {
    // The request was made, we received a response, but it was not successful
    // All responses except server errors
    return {
      response: response.statusText,
      status: response.status,
      class: 'warning',
    };
  }
  // Server Errors
  return {
    response: response.statusText,
    status: response.status,
    class: 'error',
  };
}

function getSuppliers() {
  const supplier_response = {
    suppliers: {},
    returned_response: {
      response: {},
      status: '',
      class: 'failed',
    },
  };
  axios
    .get(`https://frontendshowcase.azurewebsites.net/api/Suppliers/`)
    .then(response => {
      console.log('SUCCESS GOTTED SUPPLIER');
      supplier_response.returned_response = parseAxiosResponse(response);
      console.log('SUCCESS GOTTED THEM ALL');
      console.log(supplier_response.returned_response);
      if (supplier_response.returned_response.class === 'success') {
        supplier_response.suppliers = response.data;
      }
      return supplier_response;
    })
    .catch(error => {
      this.error_response = parseAxiosErrorResponse(error);
      this.setState({ errors: this.error_response.response });
      console.log(this.error_response);
    });
}

export {
  parseAxiosErrorResponse,
  parseAxiosResponse,
  getSuppliers,
  ALERT_OPTIONS,
};
