import React, { useEffect, useContext } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { AppContext } from './context';
import Header from './components/Header';
import Facets from './components/Facets';
import Results from './components/Results';
import AddEditModal from './components/AddEditModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

export default function App() {
  const {
    state: { searchClient, refreshQuery },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    if (refreshQuery) {
      dispatch({ type: 'TOGGLE_REFRESH_QUERY' });
    }
  }, [refreshQuery]);

  return (
    <>
      <InstantSearch
        searchClient={searchClient}
        refresh={refreshQuery}
        indexName="dev_restaurants"
      >
        <Configure hitsPerPage={10} facets={['*']} maxValuesPerFacet={20} />
        <Header />
        <section>
          <Facets />
          <Results />
        </section>
      </InstantSearch>
      <AddEditModal />
      <DeleteConfirmModal />
    </>
  );
}
