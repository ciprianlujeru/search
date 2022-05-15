import React, { useCallback } from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';

const RefinementListLinks = connectRefinementList(
  ({ items, refine, createURL }) => {
    const onSelect = useCallback(
      item => e => {
        e.preventDefault();
        refine(item.value);
      },
      [refine]
    );

    const renderItem = useCallback(
      item => (
        <div className={item.isRefined ? ' active' : ''} key={item.label}>
          <a
            className="item"
            href={createURL(item.value)}
            onClick={onSelect(item)}
          >
            <span> {item.label}</span>
            <span className="badge pull-right">{item.count}</span>
          </a>
        </div>
      ),
      []
    );

    return <div className="nav nav-list">{items.map(renderItem)}</div>;
  }
);

export default RefinementListLinks;
