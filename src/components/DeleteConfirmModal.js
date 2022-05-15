import React, { useContext, useState, useCallback } from 'react';
import { AppContext } from '../context';
import Modal from './Modal';

const DeleteConfirmModal = () => {
  const [isPending, setIsPending] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const { deleteModalData: { hit, hit: { objectID, name } = {} } = {} } = state;
  const isOpen = Boolean(hit);

  const closeModal = useCallback(() => {
    setIsPending(false);
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
  }, [setIsPending]);

  const acceptModal = useCallback(() => {
    if (!isPending) {
      setIsPending(true);
    }

    fetch(`${window.location.origin}/restaurant/${objectID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (response.ok) {
          console.log('====response', response);
          closeModal();
        } else {
          throw response;
        }
      })
      .catch(e => {
        console.log('====e', e);
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
    >
      <p>Are you sure yu want to delete this restaurant?</p>
    </Modal>
  );
};

export default DeleteConfirmModal;
