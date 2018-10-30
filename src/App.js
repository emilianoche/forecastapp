// @ components
import React, { Component } from 'react';
import Header from './Header/Header';
import Cities from './Cities/Cities';
import City from './City/City';
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
      cities: [],
      isClicked: false
    }
    this.getCities = this.getCities.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildCities = this.buildCities.bind(this);
    this.onClickCity = this.onClickCity.bind(this);
  }
  handleChange(e){
    console.log(e.target.value);
    this.setState({cityName: e.target.value})
  }

  getCities(name){
    axios
    .get(`http://api.openweathermap.org/data/2.5/find?q=${name}&units=metric&appid=4d52b5b750d5a63fb5093668768e7960`)
    .then(res => this.setState({cities: res.data, isFinded: true}))
    .catch(error => this.setState({error}))
  }

  handleSubmit(e){
    e.preventDefault();
    this.getCities(this.state.cityName)
  }

  onClickCity(city){
    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${city.name},${city['sys'].country}&units=metric&appid=4d52b5b750d5a63fb5093668768e7960`)
    .then(res => this.setState({isClicked: true, city: res.data, isFinded: false}))
    .catch(error => this.setState({error}))
    
  }

  staticMap(lng, lat) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=AIzaSyD9ycobB5RiavbXpJBo0Muz2komaqqvGv0&markers=${lat},${lng}&scale=2`;
  }


  buildCities(){
    if(this.state.isFinded){
    return <div><Cities cities={this.state.cities.list} onClickCity={this.onClickCity}/></div>;
    } else if(this.state.isClicked){
    return <div><City city={this.state.city} staticMap={this.staticMap}/></div>
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
