import AlertContainer from 'react-alert';
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
  /*props.msg.show(props.response, {
    type: props.response_class,
    icon: (
      <img
        src="https://maxcdn.icons8.com/Share/icon/Cinema//batman_old1600.png"
        width="32px"
        height="32px"
        alt="icon"
      />
    ),
  });*/
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
        <button className="no-button-theme" type="button" onClick={showAlert}>
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
