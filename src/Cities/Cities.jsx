import React, { Component } from "react";
import "./Cities.scss";
class Cities extends Component {
  render() {
    return (
      <div>
        <ul className="surveys grid">
          {this.props.cities.map(city => {
            return (
              <a key={city.id} onClick={()=>this.props.onClickCity(city)}>
                <li  className="survey-item">
                  <span className="survey-country list-only">UK</span>

                  <span className="survey-name">{city.name}</span>

                  <span className="survey-country grid-only">{city['sys'].country}</span>

                  <div className="pull-right">
                    <span className="survey-progress">
                      <span className="survey-progress-labels">
                        <span className="survey-progress-label humidity">Humidity {city['main'].humidity}%</span>
                        <span className="survey-completes">Pressure {city['main'].pressure}</span>
                      </span>
                    </span>

                    <p className="survey-end-date temperature"><strong>Temperature {city['main'].temp}</strong></p>
                    <p className="survey-end-date">Max temperature {city['main'].temp_max}</p>
                    <p className="survey-end-date">Min temperature {city['main'].temp_min}</p>
                    <span className="survey-stage">
                      <span className="stage draft">Draft</span>
                      <span className="stage awarded">Awarded</span>
                      <span className="stage live">Live</span>
                    </span>
                  </div>
                </li>
              </a>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Cities;
