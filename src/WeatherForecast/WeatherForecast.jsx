import React, { Component } from "react";
import "./WeatherForecast.scss";
// @ utilities
import axios from "axios";
import moment from 'moment';

export default class WeatherForecast extends Component {
  constructor() {
    super();
    this.state = {
      cityWeek: [],
      error: ""
    };
  }

  componentDidMount() {
    axios
      .get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.city.name},${this.props.city["sys"].country}&units=metric&appid=4d52b5b750d5a63fb5093668768e7960`)
      .then(res => {
        var days = [];
        for (var i = 1; i < res.data.list.length; i++) {
          var l = res.data.list[i].dt_txt.slice(0, 10);
          var g =
            typeof res.data.list[i + 1] !== "undefined"
              ? res.data.list[i + 1].dt_txt.slice(0, 10)
              : "";
          if (l !== g) {
            days.push(res.data.list[i]);
          }
        }
        console.log(days);
        this.setState({ cityWeek: days });
      })
      .catch(error => this.setState({ error: error }));
  }

  render() {
    return (
      <div class="forecast">
        {this.state.cityWeek.map(city => {
          let date = moment(city.dt_txt).format('dddd');
          return (
            <div class="forecast-day">
                <div>{date}</div>
                <div>
                  <img src={`https://openweathermap.org/img/w/${city.weather[0].icon}.png`} alt=""/>
                </div>
                <div>Max: {city['main'].temp_max}</div>
                <div>Min: {city['main'].temp_min}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
