import React, { useContext, useCallback } from 'react';
import { RatingMenu, ClearRefinements } from 'react-instantsearch-dom';
import Panel from './Panel';
import RefinementListLinks from './RefinementListLinks';
import { AppContext } from '../context';

const Facets = () => {
  const {
    state: { filtersOpen },
    dispatch,
  } = useContext(AppContext);
  const asideStyle = {};

  if (filtersOpen) {
    asideStyle.display = 'block';
  }

  const closeFilters = useCallback(() => {
    dispatch({ type: 'TOGGLE_FILTERS' });
  }, [dispatch]);

  return (
    <>
      <aside style={asideStyle}>
        <ul className="nav nav-list panel">
          <li>
            <div className="container-fluid no-margin">
              <div className="row no-gutter">
                <div className="col-xs-10">
                  <ClearRefinements
                    clearsQuery
                    translations={{ reset: 'Clear all filters' }}
                  />
                </div>
                <div className="col-xs-2">
                  <button
                    type="button"
                    className="close"
                    onClick={closeFilters}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li className="separator" />
        </ul>
        <Panel title="Dining Style" id="dining-styles">
          <RefinementListLinks attribute="dining_style" />
        </Panel>
        <Panel title="Rating" id="ratings">
          <RatingMenu attribute="rounded_stars_count" max={5} />
        </Panel>
      </aside>
      <div
        className="modal-backdrop aside-backdrop"
        style={asideStyle}
        onClick={closeFilters}
      />
    </>
  );
};

export default Facets;
