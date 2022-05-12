import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import Header from './components/Header';
import Facets from './components/Facets';
import Results from './components/Results';
import AddEditModal from './components/AddEditModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import './App.css';

const searchClient = algoliasearch(
  'TEX0W26GEO',
  '29f4470676447569a28b8494bfed9f50'
);

// add sort by?
export default function App() {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="dev_restaurants">
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
