import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <div className="searchbox-container">
    <div className="input-group">
      <input
        type="text"
        value={currentRefinement}
        onChange={e => refine(e.target.value)}
        autoComplete="off"
        className="form-control"
      />
      <span className="input-group-btn">
        <button className="btn btn-default">
          <i className="fa fa-search" />
        </button>
      </span>
    </div>
  </div>
));

export default SearchBox;
