import { useState } from 'react';
import PlantContainer from '../plants/plant-container';
import axios from 'https://cdn.skypack.dev/axios';
import Modal from 'react-modal';
import PlantForm from '../plants/plant-form';

import { fetchToken } from '../auth/login';

export default function PlantManager({ loggedUserId, handleUnsuccesfulLogin }) {
  const [plants, setPlants] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState({});

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
  //Modal.setAppElement(App);
  function clearPlantToEdit() {
    setPlantToEdit({});
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleSuccessfulFormSubmission(plantData) {
    setPlants(plants.concat(plantData));
    setModalIsOpen(false);
  }

  function handleDeleteClick(plantItem) {
    axios({
      method: 'delete',
      url: `http://localhost:8000/users/${loggedUserId}/plants/${plantItem.id}`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        // handle success
        console.log('handleDeleteClick', plantItem);
        // Updated array of plants
        const plantsNew = plants.filter(item => {
          return item.id !== plantItem.id;
        });
        setPlants(plantsNew);
      })
      .catch(error => {
        // handle error
        console.log('Error deleting item', error);
      });
  }

  function handleEditClick(plantItem) {
    console.log('handleEditClick', plantItem);
    // populate the form
    setModalIsOpen(true);
    setPlantToEdit(plantItem);
  }

  function handleUpdateClick(plantItem) {
    axios({
      method: 'get',
      url: `http://localhost:8000/users/${loggedUserId}/plants/${plantItem.id}`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        // handle success
        console.log('handlUpdateClick', plantItem);
      })
      .catch(error => {
        // handle error
        console.log('Error updating item', error);
      });
  }

  return (
    <div>
      <h1>Gestiona tus plantas!!</h1>
      <button className='btn' onClick={openModal}>
        Añadir planta
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <PlantForm
          loggedUserId={loggedUserId}
          handleSuccessfulFormSubmission={handleSuccessfulFormSubmission}
          clearPlantToEdit={clearPlantToEdit}
          plantToEdit={plantToEdit}
        />
      </Modal>
      <PlantContainer
        plants={plants}
        setPlants={setPlants}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleUnsuccesfulLogin={handleUnsuccesfulLogin}
      />
    </div>
  );
}
