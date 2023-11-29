import { useState, useEffect } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import Modal from 'react-modal';

import AlertContainer from '../alerts/alert-container';
import AlertForm from '../alerts/alert-form';
import { fetchToken } from '../auth/login';

export default function AlertManager({ loggedUserId, handleUnsuccesfulLogin }) {
  const [alerts, setAlerts] = useState([]);
  const [modalAlertIsOpen, setModalAlertIsOpen] = useState(false);
  const [alertToEdit, setAlertToEdit] = useState({});

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

  function openModalAlert() {
    setModalAlertIsOpen(true);
  }

  function afterOpenModalAlert() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModalAlert() {
    setModalAlertIsOpen(false);
  }

  function handleSuccessfulFormAlertSubmission(alertData) {
    setAlerts(alerts.concat(alertData));
    setModalAlertIsOpen(false);
  }

  function handleSuccessfulFormAlertEditSubmission(alertData) {
    setModalAlertIsOpen(false);
    getAlertItems();
  }

  function handleDeleteAlertClick(alertItem) {
    axios({
      method: 'delete',
      url: `http://localhost:8000/users/${loggedUserId}/alerts/${alertItem.id}`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        // handle success
        console.log('handleDeleteClick', alertItem);
        // Updated array of alerts
        const alertsNew = alerts.filter(item => {
          return item.id !== alertItem.id;
        });
        setAlerts(alertsNew);
      })
      .catch(error => {
        // handle error
        console.log('Error deleting item', error);
      });
  }

  function handleEditAlertClick(alertItem) {
    console.log('handleEditClick', alertItem);
    // populate the form
    setAlertToEdit(alertItem);
    openModalAlert();
  }

  function handleCreateNewAlertClick() {
    console.log('handleCreateNewClick');
    // populate the form
    clearAlertToEdit();
    openModalAlert();
  }

  function clearAlertToEdit() {
    setAlertToEdit({});
  }

  function getAlertItems() {
    axios({
      method: 'get',
      url: `http://localhost:8000/users/${loggedUserId}/alerts/`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        // handle success
        console.log(response);
        setAlerts(response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
        handleUnsuccesfulLogin();
      })
      .finally(function () {
        // always executed
      });
  }
  useEffect(getAlertItems, []);
  return (
    <div>
      <h1>Gestiona tus alertas!!</h1>
      <button className='btn' onClick={handleCreateNewAlertClick}>
        Añadir Alerta
      </button>
      <Modal
        isOpen={modalAlertIsOpen}
        onAfterOpen={afterOpenModalAlert}
        onRequestClose={closeModalAlert}
        style={customStyles}
        contentLabel='Alert Modal'
      >
        <AlertForm
          loggedUserId={loggedUserId}
          handleSuccessfulFormAlertSubmission={
            handleSuccessfulFormAlertSubmission
          }
          handleSuccessfulFormAlertEditSubmission={
            handleSuccessfulFormAlertEditSubmission
          }
          clearAlertToEdit={clearAlertToEdit}
          alertToEdit={alertToEdit}
        />
      </Modal>
      <AlertContainer
        alerts={alerts}
        setAlerts={setAlerts}
        handleDeleteAlertClick={handleDeleteAlertClick}
        handleEditAlertClick={handleEditAlertClick}
        handleUnsuccesfulLogin={handleUnsuccesfulLogin}
      />
    </div>
  );
}
