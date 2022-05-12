import React, { useState } from 'react';
import { Highlight } from 'react-instantsearch-dom';
import Stars from './Stars';
import PaymentOptions from './PaymentOptions';
import Modal from './Modal';

const Hit = hit => {
  const {
    image_url,
    rounded_stars_count,
    dining_style,
    payment_options,
  } = hit.hit;
  const [editIsOpen, setEditIsOpen] = useState(false);

  const toggleEditModal = () => {
    setEditIsOpen(!editIsOpen);
    const classAction = editIsOpen ? 'remove' : 'add';
    document.body.classList[classAction]('modal-open');
  };

  return (
    <div className={`hit media`}>
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
          <button type="button" className="btn btn-default btn-xs" data-toggle="modal" onClick={toggleEditModal}>
            <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
          </button>
        </div>
        <div>
          <button type="button" className="btn btn-default btn-xs">
            <span className="glyphicon glyphicon-remove" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Modal open={editIsOpen} />
    </div>
  );
};

export default Hit;
