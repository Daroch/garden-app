import { useEffect } from 'react';

// import axios from 'axios';
import axios from 'https://cdn.skypack.dev/axios';

import PlantItem from './plant-item';
import { fetchToken } from '../auth/login';

export default function PlantContainer({
  plants,
  setPlants,
  handleDeleteClick,
  handleUpdateClick,
  handleUnsuccesfulLogin,
}) {
  function plantItems() {
    return plants.map(plant => {
      // console.log(plant);
      return (
        <PlantItem
          key={plant.id}
          plant={plant}
          handleDeleteClick={handleDeleteClick}
          handleUpdateClick={handleUpdateClick}
        />
      );
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
      })
      .finally(function () {
        // always executed
      });
  }
  useEffect(getPlantItems, []);
  return (
    <>
      <div className='plant-container-wrapper'>{plantItems()}</div>
    </>
  );
}
