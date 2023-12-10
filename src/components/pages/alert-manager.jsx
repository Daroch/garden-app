import { useState, useEffect } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import Modal from 'react-modal';

import AlertContainer from '../alerts/alert-container';
import AlertForm from '../alerts/alert-form';
import { fetchToken } from '../auth/login';
import DeleteConfirm from '../util/delete-confirm';

export default function AlertManager({
  loggedUserId,
  setErrorText,
  setSuccessText,
}) {
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const [alerts, setAlerts] = useState([]);
  const [alertTypes, setAlertTypes] = useState([]);
  const [plants, setPlants] = useState([]);
  const [modalAlertIsOpen, setModalAlertIsOpen] = useState(false);
  const [modalDeleteConfirmIsOpen, setModalDeleteConfirmIsOpen] =
    useState(false);
  const [alertToEdit, setAlertToEdit] = useState({});
  const [alertToDelete, setAlertToDelete] = useState({});

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, .75)',
    },
  };
  Modal.setAppElement('#root');

  function openModalAlert() {
    setModalAlertIsOpen(true);
  }

  function closeModalAlert() {
    setModalAlertIsOpen(false);
  }

  function closeModalDeleteConfirm() {
    setModalDeleteConfirmIsOpen(false);
    setAlertToDelete({});
  }

  function handleSuccessfulFormAlertSubmission(alertData) {
    setAlerts(alerts.concat(alertData));
    setModalAlertIsOpen(false);
    setSuccessText('Alerta creada correctamente');
  }

  function handleSuccessfulFormAlertEditSubmission(alertData) {
    getAlertItems();
    setModalAlertIsOpen(false);
    setSuccessText('Alerta editada correctamente');
  }

  function handleDeleteAlertClick(alertItem) {
    setModalDeleteConfirmIsOpen(true);
    setAlertToDelete(alertItem);
  }

  function handleDeleteConfirmClick(alertItem) {
    setModalDeleteConfirmIsOpen(false);
    axios({
      method: 'delete',
      url: `${FASTAPI_URL}/users/${loggedUserId}/plants/${alertItem.plant_id}/alerts/${alertItem.id}`,
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

        setSuccessText('Alerta borrada correctamente');
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
      });
  }

  function getPlantItems() {
    axios({
      method: 'get',
      url: `${FASTAPI_URL}/users/${loggedUserId}/plants`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        console.log(response);
        setPlants(response.data);
      })
      .catch(error => {
        console.log(error);
        setErrorText('Error getting plants');
      })
      .finally(function () {
        // always executed
      });
  }

  useEffect(() => {
    getAlertItems();
    getAlertTypes();
    getPlantItems();
  }, []);

  return (
    <div>
      <h1>Gestiona tus alertas!!</h1>
      <button className='btn' onClick={handleCreateNewAlertClick}>
        Añadir Alerta
      </button>
      <Modal
        isOpen={modalDeleteConfirmIsOpen}
        onRequestClose={closeModalDeleteConfirm}
        style={customStyles}
        contentLabel='Delete Modal'
      >
        <DeleteConfirm
          closeModalDeleteConfirm={closeModalDeleteConfirm}
          handleDeleteConfirmClick={handleDeleteConfirmClick}
          type='alert'
          itemToDelete={alertToDelete}
        />
      </Modal>
      <Modal
        isOpen={modalAlertIsOpen}
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
          closeModalAlert={closeModalAlert}
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
