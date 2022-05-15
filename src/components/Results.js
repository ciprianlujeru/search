import React, { useContext, useCallback } from 'react';
import {
  Hits,
  Stats,
  Pagination,
  connectSearchBox,
} from 'react-instantsearch-dom';
import Hit from './Hit';
import { AppContext } from '../context';

const Results = connectSearchBox(() => {
  const { dispatch } = useContext(AppContext);
  const openAddModal = useCallback(() => {
    dispatch({ type: 'OPEN_ADD_EDIT_MODAL', payload: {} });
  }, [dispatch]);
  const openFilters = useCallback(() => {
    dispatch({ type: 'TOGGLE_FILTERS' });
  }, [dispatch]);

  return (
    <article>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-4">
            <button
              type="button"
              className="btn btn-default btn-xs toggle-filters"
              onClick={openFilters}
            >
              <span
                className="glyphicon glyphicon-menu-hamburger"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className="btn btn-default btn-xs"
              data-toggle="modal"
              onClick={openAddModal}
            >
              Add{' '}
              <span className="glyphicon glyphicon-plus" aria-hidden="true" />
            </button>
          </div>
          <div className="col-xs">
            <div id="stats" className="text-right text-muted">
              <Stats />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div id="hits">
        <Hits hitComponent={Hit} />
      </div>
      <div id="pagination" className="text-center">
        <Pagination />
      </div>
    </article>
  );
});

export default Results;
