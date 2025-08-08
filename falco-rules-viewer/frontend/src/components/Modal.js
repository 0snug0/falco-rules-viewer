import React, { useEffect } from 'react';

const Modal = ({ show, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          <button onClick={onClose} className="button">
            Close
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
