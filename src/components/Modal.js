import React, { useState, useEffect, useCallback } from 'react';

const Modal = ({
  className = '',
  open,
  onClose,
  onAccept,
  title,
  saveText = 'Save',
  saveType = 'button',
  isPending,
  renderContent,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    if (open !== isOpen) {
      setIsOpen(open);
    }
  }, [open]);

  const closeModal = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose();
    }
    setIsOpen(false);
  }, [onClose, setIsOpen]);

  const accept = useCallback(() => {
    if (typeof onAccept === 'function') {
      onAccept();
    }
  }, [onAccept]);

  return (
    <>
      <div
        id="exampleModalLive"
        className={`modal ${className} ${isOpen ? 'show' : 'fade'}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {title}
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </h5>
            </div>
            {renderContent(
              'modal-body',
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type={saveType}
                  className="btn btn-primary"
                  onClick={accept}
                  disabled={isPending}
                >
                  {saveText}
                  {isPending && (
                    <>
                      {' '}
                      <span
                        className="glyphicon spinner-border spinner-border-sm"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${isOpen ? 'show' : 'hide'}`} />
    </>
  );
};

export default Modal;
