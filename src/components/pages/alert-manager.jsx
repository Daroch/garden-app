import { useState, useEffect } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import Modal from 'react-modal';

import AlertContainer from '../alerts/alert-container';
import AlertForm from '../alerts/alert-form';
import { fetchToken } from '../auth/login';

export default function AlertManager({
  loggedUserId,
  handleUnsuccesfulLogin,
  setErrorText,
}) {
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const [alerts, setAlerts] = useState([]);
  const [alertTypes, setAlertTypes] = useState([]);
  const [plants, setPlants] = useState([]);
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
      url: `${FASTAPI_URL}/users/${loggedUserId}/plants/${alertItem.id}/alerts/${alertItem.id}`,
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
        setErrorText('Error deleting item');
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

  function getAlertTypes() {
    axios({
      method: 'get',
      url: `${FASTAPI_URL}/alert_types`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        // handle success
        console.log(response);
        setAlertTypes(response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
        setErrorText('Error getting alert types');
      });
  }

  function getAlertItems() {
    axios({
      method: 'get',
      url: `${FASTAPI_URL}/users/${loggedUserId}/alerts`,
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
        setErrorText('Error getting alerts');
        handleUnsuccesfulLogin();
      });
  }

  function getPlantItems() {
    axios({
      method: 'get',
      url: `${FASTAPI_URL}/users/me/plants`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        // handle success
        console.log(response);
        setPlants(response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
        handleUnsuccesfulLogin();
        setErrorText('Error getting plants');
      })
      .finally(function () {
        // always executed
      });
  }

  useEffect(getAlertItems, []);
  useEffect(getAlertTypes, []);
  useEffect(getPlantItems, []);
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
          alertTypes={alertTypes}
          plants={plants}
          setErrorText={setErrorText}
        />
      </Modal>
      <AlertContainer
        alerts={alerts}
        handleDeleteAlertClick={handleDeleteAlertClick}
        handleEditAlertClick={handleEditAlertClick}
        setErrorText={setErrorText}
      />
    </div>
  );
}
