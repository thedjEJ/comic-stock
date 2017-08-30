import AlertContainer from 'react-alert';
import Modal from 'react-modal';
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
const internalProperties = {
  orderModalIsOpen: false,
  issue_title: '',
  issue_images: [],
  issues_display: false,
};

function showAlert(props) {
  props.msg.show(props.response, {
    type: props.response_class,
    icon: (
      <img
        src="https://maxcdn.icons8.com/Share/icon/Cinema//batman_old1600.png"
        width="32px"
        height="32px"
        alt="icon"
      />
    ),
  });
}

function toggleOrderModal(event) {
  internalProperties.orderModalIsOpen = !internalProperties.orderModalIsOpen;
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

function renderComicModal(props) {
  return (
    <Modal
      show={props.modal.orderModalIsOpen}
      onRequestClose={toggleOrderModal}
      onHide={toggleOrderModal}
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
                <Button onClick={toggleOrderModal}>Close</Button>
              </FormGroup>
            </Navbar.Form>
          </form>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

function renderComic(issue) {
  console.log('renderComic');
  console.log(issue);
  return (
    <tr>
      <th scope="row" type="text">
        {issue.id}
      </th>
      <th scope="row">
        <button
          className="no-button-theme"
          type="button"
          onClick={toggleOrderModal}
        >
          <img
            id={issue.id}
            className="thumbnail"
            alt="thumbnail"
            src={issue.thumbnail.pathIncludingExtension}
            border="0"
          />
          {issue.images.length > 1 ? `${issue.images.length} Images` : ``}
        </button>
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
        onClick={toggleOrderModal}
      >
        {' '}Order{' '}
      </Button>
    </tr>
  );
}

function renderComicList(issues) {
  console.log('renderComicsList');
  console.log(issues);
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
        {issues.map(issue => renderComic(issue))}
      </tbody>
    </table>
  );
}

function render(props) {
  console.log('render');
  console.log(this.props);
  console.log(this);
  // if (api_request == 'issues'){
  // console.log("response: " +props.modal.issues)
  // }
  return (
    <div>Test2Test1Test0</div>
    /* <div className="comic-store">
        <div className="comic-store-header">
          <h2>Issues</h2>
          <AlertContainer
            ref={a => {
              this.msg = a;
            }}
            {...ALERT_OPTIONS}
          />
          <div>
            {this.renderComicList(props)}
          </div>
        </div>
        {this.renderComicModal(props)}
      </div> */
  );
}

export { renderComic, renderComicList };
