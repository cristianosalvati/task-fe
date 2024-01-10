import React from 'react';
import Button from '../components/atoms/clickable/Button';
import StringList from '../components/atoms/list/StringList';
import iconaLoading from '../images/loading.gif';
import {getFormattedStringFromDate} from './Utils';

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
                  Attendere il caricamento... &nbsp;
                  <img src={iconaLoading} 
                        alt="Attendere il caricamento"
                  />
                </div>
            )}
            {(modalDetail !== null && modalDetail !== undefined) && (
            <div className="modal-detail" style={{ overflow: 'auto', height: '200px' }}>
              <p>
                <b>Dettaglio:</b>
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
            {modalDetail && <Button onClick={() => downloadDetailAsFile(modalDetail, title, modalDownloadFilename)} value="Scarica Dettaglio" /> }
            {modalConfirmEnable && <Button onClick={onConfirm} value="CONFERMA"/>}
            <Button onClick={onClose} value="CHIUDI"/>
          </div>
        </div>
      </div>
    </div>
  );
};

function downloadDetailAsFile(detailArray, title, modalDownloadFilename) {
  const content = detailArray.join('\n'); // Converti l'array in una stringa con righe separate da "\n"
  const blob = new Blob([content], { type: 'text/plain' }); // Crea un oggetto Blob con il contenuto

  const url = window.URL.createObjectURL(blob); // Crea un URL per il blob
  const a = document.createElement('a');
  a.href = url;
  if (modalDownloadFilename) 
    a.download = modalDownloadFilename + "_" + getFormattedStringFromDate(new Date()) + '.csv';
  else 
    a.download = 'dettaglio_alert_' + title + "_" + getFormattedStringFromDate(new Date()) + '.csv'; 

  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url); // Rilascia l'URL del blob
  document.body.removeChild(a);
}

export default Modal;
