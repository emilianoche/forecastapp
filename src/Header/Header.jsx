import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="nav">
          <div className="nav__section--search">
            <form onSubmit={this.props.handleSubmit}>
              <input type="search" placeholder="Cities..." className="search__input" onChange={this.props.handleChange}/>
              <button type="submit">Search</button>
            </form>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;