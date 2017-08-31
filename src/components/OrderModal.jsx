import React from 'react';
import {
  Button,
  Carousel,
  FormControl,
  FormGroup,
  Navbar,
} from 'react-bootstrap';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

class OrderModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.orderModalIsOpen) {
      return null;
    }

    return (
      <Modal isOpen={this.props.orderModalIsOpen}>
        <h1 id="heading">
          {this.props.issue_title}
        </h1>
        <div id="full_description">
          {this.props.issue_description}
        </div>
        <table className="table table-inverse">
          <thead>
            <tr>
              <th>
                <button className="no-button-theme" type="button">
                  <Carousel>
                    {this.props.issue_images.map(image =>
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
                {this.props.issue_description}
              </th>
            </tr>
          </tbody>
        </table>
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
                            value={this.props.supplier_dropdown_mint}
                          >
                            {this.props.suppliers.map(supplier =>
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
                          value={this.props.order_mint}
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
                            value={this.props.supplier_dropdown_fine}
                          >
                            {this.props.suppliers.map(supplier =>
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
                          value={this.props.order_fine}
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
                            value={this.props.supplier_dropdown_good}
                          >
                            {this.props.suppliers.map(supplier =>
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
                          value={this.props.order_good}
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
                            value={this.props.supplier_dropdown_poor}
                          >
                            {this.props.suppliers.map(supplier =>
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
                          value={this.props.order_poor}
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
      </Modal>
    );
  }
}

function toggleOrderModal(event) {
  this.props.orderModalIsOpen = !this.props.orderModalIsOpen;
  if (event.target.id) {
    const comic = this.props.issues[
      this.props.issues.findIndex(
        element => element.id === parseInt(event.target.id, 10),
      )
    ];
    this.props.issue_title = comic.title;
    this.props.issue_description = comic.description;
    this.props.issue_images = comic.images;
  }
}

OrderModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  orderModalIsOpen: PropTypes.bool,
  children: PropTypes.node,
  issue_title: PropTypes.string,
  issue_description: PropTypes.string,
  issue_images: PropTypes.any,
  suppliers: PropTypes.any,
  issues: PropTypes.any,
};

export default OrderModal;
