import React, { useState, useEffect } from 'react';

const Modal = ({ open, onClose, onAccept, children, title, saveText }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    if (open !== isOpen) {
      setIsOpen(open);
    }
  }, [open]);

  const closeModal = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
    setIsOpen(false);
  };

  const accept = () => {
    if (typeof onAccept === 'function') {
      onAccept();
    }
  };

  return (
    <>
      <div
        id="exampleModalLive"
        className={`modal ${isOpen ? 'show' : 'fade'}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLiveLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLiveLabel">{title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={accept}>{saveText || 'Save'}</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${isOpen ? 'show' : 'hide'}`} />
    </>
  );
};

export default Modal;
