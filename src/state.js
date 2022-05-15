import React, { useReducer } from 'react';
import algoliasearch from 'algoliasearch';
import { AppContext } from './context';

const searchClient = algoliasearch(
  'TEX0W26GEO',
  '29f4470676447569a28b8494bfed9f50'
);

const initialState = {
  searchClient,
  addEditModalData: undefined,
  deleteModalData: undefined,
  filtersOpen: false,
};

function AppReducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case 'OPEN_ADD_EDIT_MODAL':
      return {
        ...state,
        addEditModalData: payload,
      };
    case 'CLOSE_ADD_EDIT_MODAL':
      return {
        ...state,
        addEditModalData: undefined,
      };
    case 'OPEN_DELETE_MODAL':
      return {
        ...state,
        deleteModalData: payload,
      };
    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        deleteModalData: undefined,
      };
    case 'TOGGLE_FILTERS':
      return {
        ...state,
        filtersOpen: !state.filtersOpen,
      };
    default:
      return state;
  }
}

export default function AppState({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
