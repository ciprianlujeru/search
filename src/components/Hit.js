import React, { useContext, useCallback } from 'react';
import { Highlight } from 'react-instantsearch-dom';
import Stars from './Stars';
import PaymentOptions from './PaymentOptions';
import { AppContext } from '../context';

const Hit = hit => {
  const {
    image_url,
    rounded_stars_count,
    dining_style,
    payment_options,
  } = hit.hit;
  const { dispatch } = useContext(AppContext);

  const openEditModal = useCallback(() => {
    dispatch({ type: 'OPEN_ADD_EDIT_MODAL', payload: hit });
  }, [hit]);
  const openDeleteConfirmationModal = useCallback(() => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: hit });
  }, [hit]);

  return (
    <div className="hit media">
      <div className="media-left">
        <div
          className="media-object"
          style={{ backgroundImage: `url(${image_url})` }}
        />
      </div>
      <div className="media-body">
        <h4 className="media-heading">
          <Highlight attribute="name" hit={hit.hit} />
          <Stars rating={rounded_stars_count} />
        </h4>
        <p className="dining-style">{dining_style}</p>
        <PaymentOptions paymentOptions={payment_options} />
      </div>
      <div className="media-right">
        <div>
          <button
            type="button"
            className="btn btn-default btn-xs"
            onClick={openDeleteConfirmationModal}
            title="Delete restaurant"
          >
            <span className="glyphicon glyphicon-remove" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="btn btn-default btn-xs"
            data-toggle="modal"
            onClick={openEditModal}
            title="Edit restaurant"
          >
            <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hit;
