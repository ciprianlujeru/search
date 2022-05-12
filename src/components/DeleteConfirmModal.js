import React, { useContext } from 'react';
import { AppContext } from '../context';
import Modal from './Modal';

const DeleteConfirmModal = () => {
  const { state, dispatch } = useContext(AppContext);
  const { deleteModalData: { hit, hit: { name } = {} } = {} } = state;
  const isOpen = Boolean(hit);

  const closeModal = () => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
  };

  return (
    <Modal open={isOpen} title={name} saveText="Delete" onClose={closeModal}>
      <div>
        aaaaaaa
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
