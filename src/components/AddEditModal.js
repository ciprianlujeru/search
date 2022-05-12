import React, { useContext } from 'react';
import { AppContext } from '../context';
import Modal from './Modal';

const AddEditModal = () => {
  const { state, dispatch } = useContext(AppContext);
  const { editModalData, editModalData: { hit, hit: { name } = {} } = {} } = state;
  const isOpen = Boolean(editModalData);
  const title = hit ? name : 'Add restaurant';

  const closeModal = () => {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
  };

  return (
    <Modal open={isOpen} title={title} onClose={closeModal}>
      <pre>{JSON.stringify(hit)}</pre>
    </Modal>
  );
};

export default AddEditModal;
