import React from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';

const RefinementListLinks = connectRefinementList(
  ({ items, refine, createURL }) => {
    const hitComponents = items.map(item => (
      <div className={item.isRefined ? ' active' : ''} key={item.label}>
        <a
          className="item"
          href={createURL(item.value)}
          onClick={e => {
            e.preventDefault();
            refine(item.value);
          }}
        >
          <span> {item.label}</span>
          <span className="badge pull-right">{item.count}</span>
        </a>
      </div>
    ));

    return <div className="nav nav-list">{hitComponents}</div>;
  }
);

export default RefinementListLinks;
