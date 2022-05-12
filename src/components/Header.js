import React from 'react';
import SearchBox from './SearchBox';

const Header = () => (
  <header>
    <a
      href="https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/"
      className="is-logo"
    >
      <img
        alt="React InstantSearch"
        src="https://res.cloudinary.com/hilnmyskv/image/upload/w_100,h_100,dpr_2.0//v1461180087/logo-instantsearchjs-avatar.png"
        width="40"
      />
    </a>
    <a href="./" className="logo">
      You
      <i className="fa fa-youtube-play" />
    </a>
    <SearchBox />
  </header>
);

export default Header;
