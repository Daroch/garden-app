import { useState, useEffect } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import JournalContainer from '../journals/journal-container';
import JournalForm from '../journals/journal-form';
import { fetchToken } from '../auth/login';
import DeleteConfirm from '../util/delete-confirm';

export default function JournalManager({
  loggedUserId,
  handleUnsuccesfulLogin,
  setErrorText,
  setSuccessText,
}) {
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [plants, setPlants] = useState([]);
  const [modalJournalIsOpen, setModalJournalIsOpen] = useState(false);
  const [modalDeleteConfirmIsOpen, setModalDeleteConfirmIsOpen] =
    useState(false);
  const [journalToEdit, setJournalToEdit] = useState({});
  const [journalToDelete, setJournalToDelete] = useState({});

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

  function openModalJournal() {
    setModalJournalIsOpen(true);
  }

  function closeModalJournal() {
    setModalJournalIsOpen(false);
  }

  function closeModalDeleteConfirm() {
    setModalDeleteConfirmIsOpen(false);
    setJournalToDelete({});
  }

  function handleSuccessfulFormJournalSubmission(journalData) {
    setJournals(journals.concat(journalData));
    setModalJournalIsOpen(false);
    setSuccessText('Journal creado correctamente');
  }

  function handleSuccessfulFormJournalEditSubmission(journalData) {
    setModalJournalIsOpen(false);
    getJournalItems();
    setSuccessText('Journal editado correctamente');
  }

  function handleDeleteJournalClick(journalItem) {
    setModalDeleteConfirmIsOpen(true);
    setJournalToDelete(journalItem);
  }

  function handleDeleteConfirmClick(journalItem) {
    setModalDeleteConfirmIsOpen(false);
    axios({
      method: 'delete',
      url: `${FASTAPI_URL}/users/${loggedUserId}/plants/${journalItem.plant_id}/journals/${journalItem.id}`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        // handle success
        console.log('handleDeleteClick', journalItem);
        // Updated array of journals
        const journalsNew = journals.filter(item => {
          return item.id !== journalItem.id;
        });
        setJournals(journalsNew);
        setSuccessText('Journal borrado correctamente');
      })
      .catch(error => {
        // handle error
        console.log('Error deleting item', error);
        setErrorText('Error deleting item');
      });
  }

  function handleEditJournalClick(journalItem) {
    console.log('handleEditJournalClick', journalItem);
    // populate the form
    setJournalToEdit(journalItem);
    openModalJournal();
  }

  function handleCreateNewJournalClick() {
    console.log('handleCreateNewJournalClick');
    // populate the form
    clearJournalToEdit();
    openModalJournal();
  }

  function clearJournalToEdit() {
    setJournalToEdit({});
  }

  function getJournalItems() {
    axios({
      method: 'get',
      url: `${FASTAPI_URL}/users/${loggedUserId}/journals`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        // handle success
        console.log(response);
        setJournals(response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
        setErrorText('Error getting journals');
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
        // handle success
        console.log(response);
        setPlants(response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
        if (error.response.status === 401) {
          setErrorText(
            'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión',
          );
          navigate('/login');
        }
      })
      .finally(function () {
        // always executed
      });
  }

  useEffect(getPlantItems, [journals]);
  return (
    <div>
      <h1>Gestiona tus journals!!</h1>
      <button className='btn' onClick={handleCreateNewJournalClick}>
        Añadir Journal
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
          type='journal'
          itemToDelete={journalToDelete}
        />
      </Modal>
      <Modal
        isOpen={modalJournalIsOpen}
        onRequestClose={closeModalJournal}
        style={customStyles}
        contentLabel='Journal Modal'
      >
        <JournalForm
          loggedUserId={loggedUserId}
          handleSuccessfulFormJournalSubmission={
            handleSuccessfulFormJournalSubmission
          }
          handleSuccessfulFormJournalEditSubmission={
            handleSuccessfulFormJournalEditSubmission
          }
          clearJournalToEdit={clearJournalToEdit}
          journalToEdit={journalToEdit}
          plants={plants}
          setErrorText={setErrorText}
          closeModalJournal={closeModalJournal}
        />
      </Modal>
      {plants.map(plant => (
        <div key={plant.id} className='journal-plant-wrapper'>
          <h2>{plant.name}</h2>
          <JournalContainer
            key={plant.id}
            loggedUserId={loggedUserId}
            journals={plant.journals}
            handleDeleteJournalClick={handleDeleteJournalClick}
            handleEditJournalClick={handleEditJournalClick}
            setErrorText={setErrorText}
          />
        </div>
      ))}
    </div>
  );
}
