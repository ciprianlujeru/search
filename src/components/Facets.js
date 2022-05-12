import React from 'react';
import { RatingMenu, ClearRefinements } from 'react-instantsearch-dom';
import Panel from './Panel';
import RefinementListLinks from './RefinementListLinks';

const Facets = () => (
  <aside>
    <ul className="nav nav-list panel">
      <li>
        <a href="./">
          <i className="fa fa-home" /> Home
        </a>
      </li>
      <li className="separator" />
    </ul>
    <Panel title="Dining Style" id="dining-styles">
      <RefinementListLinks attribute="dining_style" />
    </Panel>
    <Panel title="Rating" id="ratings">
      <RatingMenu attribute="rounded_stars_count" max={5} />
    </Panel>
    <ul className="nav nav-list panel">
      <li>
        <ClearRefinements
          clearsQuery
          translations={{ reset: 'Clear all filters' }}
        />
      </li>
    </ul>
  </aside>
);

export default Facets;
