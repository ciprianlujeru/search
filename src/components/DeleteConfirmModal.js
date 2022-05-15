import React, { useContext, useState, useCallback } from 'react';
import { AppContext } from '../context';
import Modal from './Modal';

const DeleteConfirmModal = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { state, dispatch } = useContext(AppContext);
  const { deleteModalData: { hit, hit: { objectID, name } = {} } = {} } = state;
  const isOpen = Boolean(hit);

  const closeModal = useCallback(() => {
    setError(null);
    setIsPending(false);
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
  }, [setIsPending]);

  const acceptModal = useCallback(() => {
    setError(null);
    if (!isPending) {
      setIsPending(true);
    }

    fetch(`${window.location.origin}/restaurant/${objectID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (response.ok) {
          dispatch({ type: 'TOGGLE_REFRESH_QUERY' });
          closeModal();
        } else {
          throw response;
        }
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [isPending, hit]);

  return (
    <Modal
      open={isOpen}
      title={name}
      saveText="Delete"
      onClose={closeModal}
      onAccept={acceptModal}
      isPending={isPending}
    >
      <p>Are you sure yu want to delete this restaurant?</p>
      <div className="form-error">
        {error && 'A problem has occurred, please try again later.'}
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
