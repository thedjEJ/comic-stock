import React, { Component } from 'react';
import '../ComicStore.css';
import { Button } from 'react-bootstrap';

class Issue extends Component {
  constructor(){
    super();
    var axios = require('axios')
    
    this.state = {
      axios: axios.create({
        baseURL: 'http://frontendshowcase.azurewebsites.net/api/Issues',
        'header':'test'
      }),
      issues: [] 
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.state.axios
      .get(`http://frontendshowcase.azurewebsites.net/api/Issues`)
      .then(
        res => this.setState({ issues: res.data}),
      )
    .catch(err => console.log(err))
  }

  handleChange(event) {
    //console.log("EVENT:"+event)
    this.setState({value: event.target.value});
  }

  handleSubmit(event){
    console.log("EVENT:" + event)
    const body={
      "id": 777,
      "title": "Super Ezra",
      "description": "The Super adventures of SUPER EZRA! DA DA DA DAAAAAA!",
      "seriesNumber": 0,
      "publicationDate": "2017-08-08T06:59:43.547Z",
      "publisherId": 0,
      "publisher": "Dc",
    }
    this.state.axios
      .put(`http://frontendshowcase.azurewebsites.net/api/Issues`,body)
      .then(
        res => this.setState({ issues: res.data}),
        console.log("PUT: "+this.state.issues),
        alert(this.state.issues)
      )
    .catch(err => console.log(err))
  }

  render(api_request) {
    //if (api_request == 'issues'){
    //console.log("response: " +this.state.issues)
    //}

    return (
      <div className="comic-store">
        <div className="comic-store-header">
        <h2>Issues</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Issue details:
            <input type='text' id='issue_id' onChange={this.handleChange} />
            <input type='text' id='issue_name' onChange={this.handleChange} />
            <input type='text' id='issue_city' onChange={this.handleChange} />
            <input type='text' id='issue_reference' onChange={this.handleChange} />
          </label>
          <input type="submit" value="Add Issue" />
        </form>
        {
         this.state.issues.map((issue) => {
                    return (
                      <div className='comic-store'>
                        <div><img className='thumbnail' src={issue.thumbnail.path+'.'+issue.thumbnail.extension}/> {issue.id} {issue.title} {issue.description} {issue.seriesNumber} {issue.publicationDate} {issue.publisherId} {issue.publisher} </div>
                      </div>
                    )
                 })
        }
        </div>
      </div>
    );
  }
}

export default Issue;
