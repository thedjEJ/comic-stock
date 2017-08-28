import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Route } from 'react-router';
import IssueView, { renderComic } from './views/IssueView';
import IssueComponent from './components/IssueComponent';
import Supplier from './components/Supplier';
import './ComicStore.css';
const modalIsOpen = true;

const App = props =>
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#Home">Welcome to ACTION COMICS</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem align="left">
          <Link to="/comic-stock/suppliers"> Suppliers </Link>
        </NavItem>
        <NavItem>
          <Link to="/comic-stock/issues"> Issues </Link>
        </NavItem>
      </Nav>
      <div>
        <Route path="/comic-stock/Suppliers" component={Supplier} />
      </div>
      <div>
        <Route
          path="/comic-stock/issues"
          modal={modalIsOpen}
          issue_title="test"
          props={props}
          component={IssueView}
        />
      </div>
    </Navbar>
  </div>;

class ComicStore extends Component {
  render() {
    const props = this.props.children;
    return (
      <div className="comic-store">
        <BrowserRouter>
          <App props />
        </BrowserRouter>
      </div>
    );
  }
}

export default ComicStore;
