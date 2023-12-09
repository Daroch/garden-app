import { useState, useEffect } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import Modal from 'react-modal';

import PlantContainer from '../plants/plant-container';
import { fetchToken } from '../auth/login';
import { useNavigate } from 'react-router-dom';
import Search from '../search/search';

export default function Explore({
  loggedUserId,
  setErrorText,
  setSuccessText,
}) {
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [plants, setPlants] = useState([]);
  const [searchData, setSearchData] = useState({
    search_text: '',
    search_category_id: 0,
  });

  function handleSubmitSearch(event) {
    event.preventDefault();
    console.log('handleSubmitSearch', searchData);
    getPlantItems(searchData);
  }

  function handleDeleteClick(plantItem) {
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
      url: `${FASTAPI_URL}/plants/?search_text=${searchData.search_text}&search_category_id=${searchData.search_category_id}`,
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
      <h1>Explora otras plantas!!</h1>
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
