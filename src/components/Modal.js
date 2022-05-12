import React from 'react';

const Modal = ({ open }) => {
  console.log('====open', open);
  return (
    <>
      <div
        id="exampleModalLive"
        className={`modal ${open ? 'show' : 'fade'}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLiveLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLiveLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Woohoo, you're reading this text in a modal!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${open ? 'show' : 'hide'}`} />
    </>
  );
};

export default Modal;
