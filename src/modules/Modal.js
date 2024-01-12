import React from 'react';
import StringList from '../components/atoms/list/StringList';
import Button from '../components/atoms/clickable/Button';
import iconaLoading from '../images/loading.gif';

// modal component based on bootstrap 

const Modal = ({ modalDisplayed, onClose, onConfirm,  title, message, modalConfirmEnable, modalDetail, modalDetailLimit, modalContent, modalIsLoading, modalDownloadFilename}) => {
  return (
    <div className={`modal ${modalDisplayed ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalDisplayed ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            {message}
            {modalIsLoading && (
               <div className="loading-animation">
                  Loading... &nbsp;
                  <img src={iconaLoading} 
                        alt="Attendere il caricamento"
                  />
                </div>
            )}
            {(modalDetail !== null && modalDetail !== undefined) && (
            <div className="modal-detail" style={{ overflow: 'auto', height: '200px' }}>
              <p>
                <b>Details:</b>
                <StringList strings={modalDetail} limit={modalDetailLimit}/>
              </p>
            </div>
            )}

            {(modalContent !== null && modalContent !== undefined) && (
              
              <div className="modal-input" style={{height: 'auto'}}>
                <p>
                  {modalContent}
                </p>
              </div>
            
            )}
          </div>
          <div className="modal-footer">
            {modalConfirmEnable && <Button onClick={onConfirm} value="CONFIRM"/>}
            <Button onClick={onClose} value="CLOSE"/>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Modal;
