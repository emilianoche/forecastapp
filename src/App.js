// @ components
import React, { Component } from 'react';
import Header from './Header/Header';
import Cities from './Cities/Cities';
// @ utilities
import axios from 'axios';
// @ style
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state ={
      isFinded:false,
      city: {},
      cityName: '',
      error: '',
      cities: []
    }
    this.getCities = this.getCities.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e){
    console.log(e.target.value);
    this.setState({cityName: e.target.value})
  }

  getCities(name){
    axios
    .get(`http://api.openweathermap.org/data/2.5/find?q=${name}&appid=4d52b5b750d5a63fb5093668768e7960`)
    .then(res => this.setState({cities: res.data, isFinded: true}))
    .catch(error => this.setState({error}))
  }

  handleSubmit(){
    this.getCities(this.state.cityName)
  }
  render() {
    return (
      <div className="App">
        <Header
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        />
        {this.state.cities.length ? <Cities />}
      </div>
    );
  }
}

export default App;
