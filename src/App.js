// @ components
import React, { Component } from 'react';
import Header from './Header/Header';
import Cities from './Cities/Cities';
import City from './City/City';
import LastSearch from './LastSearch/LastSearch';
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
      isClicked: false,
      searches: [],
    }
    this.getCities = this.getCities.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildCities = this.buildCities.bind(this);
    this.onClickCity = this.onClickCity.bind(this);
    this.deleteSearch = this.deleteSearch.bind(this);
    this.goHome = this.goHome.bind(this);
  }
  handleChange(e){
    console.log(e.target.value);
    this.setState({cityName: e.target.value})
  }

  componentDidMount() {
    if(!localStorage.getItem("searchs")){
      var searchs = [];
      localStorage.setItem('searchs', JSON.stringify(searchs))
    }
  }

  getCities(name){
    axios
    .get(`http://api.openweathermap.org/data/2.5/find?q=${name}&units=metric&appid=4d52b5b750d5a63fb5093668768e7960`)
    .then(res => {
      if(res.data['list'].length === 0) {
        this.setState({isClicked: false, cities: res.data, isFinded: false});
        return;
      }
      this.setState({cities: res.data, isFinded: true})
    })
    .catch(error => this.setState({error}))
  }

  handleSubmit(e){
    e.preventDefault();
    this.getCities(this.state.cityName)
  }

  goHome() {
    this.setState({isFinded: false, isClicked: false });
  }

  onClickCity(city){
    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${city.name},${city['sys'].country}&units=metric&appid=4d52b5b750d5a63fb5093668768e7960`)
    .then(res => {
      let searchs = JSON.parse(localStorage.getItem("searchs"));
      if(searchs.length < 5){
        searchs.push(res.data);
        localStorage.setItem('searchs', JSON.stringify(searchs));
      } else {
        searchs.shift();
        searchs.push(res.data);
        localStorage.setItem('searchs', JSON.stringify(searchs));
      }
      
      this.setState({isClicked: true, city: res.data, isFinded: false})
    })
    .catch(error => this.setState({error}))
    
  }

  staticMap(lng, lat) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=AIzaSyD9ycobB5RiavbXpJBo0Muz2komaqqvGv0&markers=${lat},${lng}&scale=2`;
  }


  buildCities(){
    if(this.state.isFinded){
    return <div className={'city-block'}><Cities cities={this.state.cities.list} onClickCity={this.onClickCity}/></div>;
    } else if(this.state.isClicked){
    return <div className={'city-block'}><City city={this.state.city} staticMap={this.staticMap}/></div>
    } else if(this.state.cities.length === 0) {
      return (
        <div className="waiting">
          ...Waiting Search
        </div> 
    );
    }
    return (
      <div className="waiting">
      ...We didn't find the city.
      </div> 
  );
  }

  deleteSearch(city){
    let searchs = JSON.parse(localStorage.getItem("searchs"));
    for (let index = 0; index < searchs.length; index++) {
      if(searchs[index].id === city.id){
        searchs.splice(index, 1);
      }
    }
    localStorage.setItem('searchs', JSON.stringify(searchs));
    this.setState({searches: searchs});
  }

  render() {
    const cities = this.buildCities();
    let searchs = JSON.parse(localStorage.getItem("searchs")).sort();
    return (
      <div className="App">
        <Header
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        goHome={this.goHome}
        />
        {cities}
        <LastSearch searchs={searchs} deleteSearch={this.deleteSearch} onClickCity={this.onClickCity}/>
      </div>
    );
  }
}

export default App;
