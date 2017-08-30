import React from 'react';
import {
  Button,
  Carousel,
  FormControl,
  FormGroup,
  Navbar,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30,
    };

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
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
};

export default Modal;
