import React from 'react';
import SearchBox from './SearchBox';

const Header = () => (
  <header>
    <a href="/" className="is-logo">
      <img alt="Restaurants" src="/logo2.png" />
      <img alt="Restaurants" src="/favicon.png" />
    </a>
    <SearchBox />
  </header>
);

export default Header;
