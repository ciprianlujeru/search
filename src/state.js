import React, { useReducer } from 'react';
import { AppContext } from './context';

const initialState = {
  editModalData: undefined,
  deleteModalData: undefined,
};

function AppReducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case 'OPEN_EDIT_MODAL':
      return {
        ...state,
        editModalData: payload,
      };
    case 'CLOSE_EDIT_MODAL':
      return {
        ...state,
        editModalData: undefined,
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
