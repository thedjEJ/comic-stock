import React, { Component } from 'react';
import '../ComicStore.css';

class Creator extends Component {
  constructor(){
    super();
    var axios = require('axios')
    
    this.state = {
      axios: axios.create({
        baseURL: 'http://frontendshowcase.azurewebsites.net/api/Creators',
        'header':'test'
      }),
      creators: [] 
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.state.axios
      .get(`http://frontendshowcase.azurewebsites.net/api/Creators`)
      .then(
        res => this.setState({ creators: res.data}),
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
      "id": 123,
      "name": "ezra",
      "city": "ezraTown",
      "reference": "ezra_put_working"
    }
    this.state.axios
      .put(`http://frontendshowcase.azurewebsites.net/api/Creators`,body)
      .then(
        res => this.setState({ creators: res.data}),
        console.log("PUT: "+this.state.creators),
        alert(this.state.creators)
      )
    .catch(err => console.log(err))
  }

  render(api_request) {
    //if (api_request == 'creators'){
    //console.log("response: " +this.state.creators)
    //}

    return (
      <div className="comic-store">
        <div className="comic-store-header">
        <h2>Creators</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Creator details:
            <input type='text' id='creator_id' onChange={this.handleChange} />
            <input type='text' id='creator_name' onChange={this.handleChange} />
            <input type='text' id='creator_country_of_residence' onChange={this.handleChange} />
            <input type='text' id='creator_tax_reference_number' onChange={this.handleChange} />
            <input type='text' id='creator_email_address' onChange={this.handleChange} />
          </label>
          <input type="submit" value="Add Creator" />
        </form>
        {
         this.state.creators.map((creator) => {
                    return (
                      <div className='comic-store'>
                        <div>{creator.id} {creator.name} {creator.countryOfResidence} {creator.taxReferenceNumber} {creator.emailAddress}</div>
                      </div>
                    )
                 })
        }
        </div>
      </div>
    );
  }
}

export default Creator;
