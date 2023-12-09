import { useState, useEffect } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import Modal from 'react-modal';

import PlantContainer from '../plants/plant-container';
import PlantForm from '../plants/plant-form';
import { fetchToken } from '../auth/login';
import { useNavigate } from 'react-router-dom';
import Search from '../search/search';
import DeleteConfirm from '../util/delete-confirm';

export default function PlantManager({
  loggedUserId,
  handleUnsuccesfulLogin,
  setErrorText,
  setSuccessText,
}) {
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [plants, setPlants] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalDeleteConfirmIsOpen, setModalDeleteConfirmIsOpen] =
    useState(false);
  const [plantToEdit, setPlantToEdit] = useState({});
  const [plantToDelete, setPlantToDelete] = useState({});
  const [searchData, setSearchData] = useState({
    search_text: '',
    search_category_id: 0,
  });

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

  function closeModal() {
    setModalIsOpen(false);
  }

  function closeModalDeleteConfirm() {
    setModalDeleteConfirmIsOpen(false);
    setPlantToDelete({});
  }

  function handleSuccessfulFormSubmission(plantData) {
    setPlants(plants.concat(plantData));
    setSuccessText('Planta creada correctamente');
    setModalIsOpen(false);
  }

  function handleSuccessfulFormEditSubmission(plantData) {
    setModalIsOpen(false);
    setSuccessText('Planta editada correctamente');
    getPlantItems();
  }

  function handleSubmitSearch(event) {
    event.preventDefault();
    console.log('handleSubmitSearch', searchData);
    getPlantItems(searchData);
  }

  function handleDeleteClick(plantItem) {
    setModalDeleteConfirmIsOpen(true);
    setPlantToDelete(plantItem);
  }

  function handleDeleteConfirmClick(plantItem) {
    setModalDeleteConfirmIsOpen(false);
    axios({
      method: 'delete',
      url: `${FASTAPI_URL}/users/${loggedUserId}/plants/${plantItem.id}`,
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
        setSuccessText('Planta borrada correctamente');
        window.scrollTo(0, 0);
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
      url: `${FASTAPI_URL}/categories`,
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
        setErrorText('Error getting categories');
      });
  }

  function getPlantItems() {
    axios({
      method: 'get',
      url: `${FASTAPI_URL}/users/${loggedUserId}/plants/?search_text=${searchData.search_text}&search_category_id=${searchData.search_category_id}`,
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
        setErrorText('Error getting plants. ' + error.response.data.detail);
      })
      .finally(function () {
        // always executed
      });
  }
  useEffect(getCategories, []);
  useEffect(getPlantItems, []);

  return (
    <div>
      <Search
        categories={categories}
        setErrorText={setErrorText}
        handleSubmitSearch={handleSubmitSearch}
        searchData={searchData}
        setSearchData={setSearchData}
      />
      <h1>Gestiona tus plantas!!</h1>
      <button className='btn' onClick={handleCreateNewClick}>
        Añadir planta
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
          type='plant'
          itemToDelete={plantToDelete}
        />
      </Modal>
      <Modal
        isOpen={modalIsOpen}
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
          setErrorText={setErrorText}
          closeModal={closeModal}
        />
      </Modal>
      <PlantContainer
        loggedUserId={loggedUserId}
        plants={plants}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleDetailClick={handleDetailClick}
      />
    </div>
  );
}
