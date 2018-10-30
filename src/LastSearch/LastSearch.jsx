import React, { Component } from 'react';
import './LastSearch.scss';

class LastSearch extends Component {
  render() {
    return(
      <footer className="searches">
        <ul className='list'>
          <h3 className="pink">Last Searchs</h3>
          { this.props.searchs != null ? this.props.searchs.map(city => {
            return (
              <li><button onClick={()=>this.props.onClickCity(city)}>{city.name},{city['sys'].country}</button><button onClick={() => this.props.deleteSearch(city)}>X</button></li>
            )
          }) : null}
        </ul>
      </footer>
    )
  }
}

export default LastSearch;