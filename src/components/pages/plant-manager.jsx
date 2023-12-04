import { useState, useEffect } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import Modal from 'react-modal';

import PlantContainer from '../plants/plant-container';
import PlantForm from '../plants/plant-form';
import { fetchToken } from '../auth/login';
import { useNavigate } from 'react-router-dom';

export default function PlantManager({
  loggedUserId,
  handleUnsuccesfulLogin,
  setErrorText,
}) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
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
  Modal.setAppElement('#root');

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleSuccessfulFormSubmission(plantData) {
    setPlants(plants.concat(plantData));
    setModalIsOpen(false);
  }

  function handleSuccessfulFormEditSubmission(plantData) {
    setModalIsOpen(false);
    getPlantItems();
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
        setErrorText('Error deleting item');
      });
  }

  function handleEditClick(plantItem) {
    console.log('handleEditClick', plantItem);
    // populate the form
    setPlantToEdit(plantItem);
    openModal();
  }

  function handleDetailClick(plantItem) {
    console.log('handleDetailClick', plantItem);
    navigate('/details', { state: { plantItem } });
  }

  function handleCreateNewClick() {
    console.log('handleCreateNewClick');
    // populate the form
    clearPlantToEdit();
    openModal();
  }

  function clearPlantToEdit() {
    setPlantToEdit({});
  }

  function getCategories() {
    axios({
      method: 'get',
      url: 'http://localhost:8000/categories',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        // handle success
        console.log(response);
        setCategories(response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
        setErrorText('Error getting alert types');
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
        setErrorText('Error getting plants');
        handleUnsuccesfulLogin();
      })
      .finally(function () {
        // always executed
      });
  }
  useEffect(getCategories, []);
  useEffect(getPlantItems, []);

  return (
    <div>
      <h1>Gestiona tus plantas!!</h1>
      <button className='btn' onClick={handleCreateNewClick}>
        Añadir planta
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Plant Modal'
      >
        <PlantForm
          loggedUserId={loggedUserId}
          handleSuccessfulFormSubmission={handleSuccessfulFormSubmission}
          handleSuccessfulFormEditSubmission={
            handleSuccessfulFormEditSubmission
          }
          handleUnsuccesfulLogin={handleUnsuccesfulLogin}
          clearPlantToEdit={clearPlantToEdit}
          plantToEdit={plantToEdit}
          categories={categories}
        />
      </Modal>
      <PlantContainer
        plants={plants}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleDetailClick={handleDetailClick}
      />
    </div>
  );
}
