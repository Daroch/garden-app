import { useState, useEffect } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import Modal from 'react-modal';

import JournalContainer from '../journals/journal-container';
import JournalForm from '../journals/journal-form';
import { fetchToken } from '../auth/login';

export default function JournalManager({
  loggedUserId,
  handleUnsuccesfulLogin,
  setErrorText,
}) {
  const [journals, setJournals] = useState([]);
  const [plants, setPlants] = useState([]);
  const [modalJournalIsOpen, setModalJournalIsOpen] = useState(false);
  const [journalToEdit, setJournalToEdit] = useState({});

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

  function openModalJournal() {
    setModalJournalIsOpen(true);
  }

  function afterOpenModalJournal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModalJournal() {
    setModalJournalIsOpen(false);
  }

  function handleSuccessfulFormJournalSubmission(journalData) {
    setJournals(journals.concat(journalData));
    setModalJournalIsOpen(false);
  }

  function handleSuccessfulFormJournalEditSubmission(journalData) {
    setModalJournalIsOpen(false);
    getJournalItems();
  }

  function handleDeleteJournalClick(journalItem) {
    axios({
      method: 'delete',
      url: `http://localhost:8000/users/${loggedUserId}/plants/${journalItem.id}/journals/${journalItem.id}`,
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
      url: `http://localhost:8000/users/${loggedUserId}/journals`,
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
        handleUnsuccesfulLogin();
      });
  }

  function getPlantItems() {
    axios({
      method: 'get',
      url: 'http://localhost:8000/users/me/plants',
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

  useEffect(getPlantItems, []);
  return (
    <div>
      <h1>Gestiona tus journals!!</h1>
      <button className='btn' onClick={handleCreateNewJournalClick}>
        Añadir Journal
      </button>
      <Modal
        isOpen={modalJournalIsOpen}
        onAfterOpen={afterOpenModalJournal}
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
        />
      </Modal>
      {plants.map(plant => (
        <div key={plant.id}>
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

      <JournalContainer
        loggedUserId={loggedUserId}
        journals={journals}
        handleDeleteJournalClick={handleDeleteJournalClick}
        handleEditJournalClick={handleEditJournalClick}
        setErrorText={setErrorText}
      />
    </div>
  );
}
