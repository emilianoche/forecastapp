// @ components
import React, { Component } from 'react';
import Header from './Header/Header';
import Cities from './Cities/Cities';
// @ utilities
import axios from 'axios';
// @ style
import './App.scss';

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildCities = this.buildCities.bind(this);
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

  handleSubmit(e){
    e.preventDefault();
    this.getCities(this.state.cityName)
  }

  buildCities(){
    if(this.state.isFinded){
      return <div><Cities cities={this.state.cities.list} /></div>;
    }
    return null;
  }

  render() {
    const cities = this.buildCities();
    return (
      <div className="App">
        <Header
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        />
        {cities}
      </div>
    );
  }
}

export default App;
