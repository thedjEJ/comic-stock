import AlertContainer from 'react-alert';
import Modal from 'react-bootstrap/es/Modal';
import PropTypes from 'proptypes';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Button,
  Carousel,
  FormControl,
  FormGroup,
  Navbar,
} from 'react-bootstrap';
import '../ComicStore.css';
import { ALERT_OPTIONS } from './../helpers/HelperFunctions';

class IssueView extends Component {
  showAlert = () => {
    this.msg.show(this.props.response, {
      type: this.props.response_class,
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

  toggleOrderModal(event) {
    this.setState({ orderModalIsOpen: !this.state.orderModalIsOpen });
    if (event.target.id) {
      const comic = this.props.issues[
        this.props.issues.findIndex(
          element => element.id === parseInt(event.target.id, 10),
        )
      ];
      this.setState({
        issue_title: comic.title,
        issue_description: comic.description,
        issue_images: comic.images,
      });
    }
  }

  renderComicModal(props) {
    return (
      <Modal
        show={props.modal.orderModalIsOpen}
        onRequestClose={this.toggleOrderModal}
        onHide={this.toggleOrderModal}
      >
        <Modal.Header>
          <Modal.Title>
            {props.modal.issue_title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <table className="table table-inverse">
            <thead>
              <tr>
                <th>
                  <button className="no-button-theme" type="button">
                    <Carousel>
                      {props.modal.issue_images.map(image =>
                        <Carousel.Item>
                          <img src={image.pathIncludingExtension} alt="" />
                        </Carousel.Item>,
                      )}
                    </Carousel>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  {props.modal.issue_description}
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
                  <table className="table table-inverse">
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
                              value={props.modal.supplier_dropdown_mint}
                            >
                              {props.modal.suppliers.map(supplier =>
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
                            value={props.modal.order_mint}
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
                              value={props.modal.supplier_dropdown_fine}
                            >
                              {props.modal.suppliers.map(supplier =>
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
                            value={props.modal.order_fine}
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
                              value={props.modal.supplier_dropdown_good}
                            >
                              {props.modal.suppliers.map(supplier =>
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
                            value={props.modal.order_good}
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
                              value={props.modal.supplier_dropdown_poor}
                            >
                              {props.modal.suppliers.map(supplier =>
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
                            value={props.modal.order_poor}
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
    );
  }

  renderComic(props) {
    return (
      <tr>
        <th scope="row" type="text">
          {props.props.issue.id}
        </th>
        <th scope="row">
          <button
            className="no-button-theme"
            type="button"
            onClick={this.toggleOrderModal}
          >
            <img
              id={props.issue.id}
              className="thumbnail"
              alt="thumbnail"
              src={props.issue.thumbnail.pathIncludingExtension}
              border="0"
            />
            {props.issue.images.length > 1
              ? `${props.issue.images.length} Images`
              : ``}
          </button>
        </th>
        <th scope="row" type="text">
          {props.issue.title}
        </th>
        <th scope="row" type="text">
          {props.issue.description}
        </th>
        <th scope="row" type="text">
          {props.issue.publisher}
        </th>
        <Button
          type="submit"
          bsStyle="primary"
          id={props.issue.id}
          alt="order"
          onClick={this.toggleOrderModal}
        >
          {' '}Order{' '}
        </Button>
      </tr>
    );
  }

  renderComicList(props) {
    return (
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
          {props.issues.map(issue => this.renderComic(issue))}
        </tbody>
      </table>
    );
  }

  render() {
    // if (api_request == 'issues'){
    // console.log("response: " +props.modal.issues)
    // }
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
            {this.renderComicList(this.props)}
          </div>
        </div>
        {this.renderComicModal(this.props)}
      </div>
    );
  }
}

IssueView.constructor.propTypes = {
  history: PropTypes.objectOf(BrowserRouter.history).isRequired,
};

export default IssueView;
