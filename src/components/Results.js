import React from 'react';
import {
  Hits,
  Stats,
  Pagination,
  connectSearchBox,
} from 'react-instantsearch-dom';
import Hit from './Hit';

const Results = connectSearchBox(() => (
  <article>
    <div id="stats" className="text-right text-muted">
      <Stats />
    </div>
    <hr />
    <div id="hits">
      <Hits hitComponent={Hit} />
    </div>
    <div id="pagination" className="text-center">
      <Pagination />
    </div>
  </article>
));

export default Results;
