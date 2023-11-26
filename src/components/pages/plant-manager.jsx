import { useState } from 'react';
import PlantContainer from '../plants/plant-container';
import LoadForm from '../plants/modal-form';
import axios from 'https://cdn.skypack.dev/axios';
import { fetchToken } from '../auth/login';

export default function PlantManager({ loggedUserId }) {
  const [showForm, setShowForm] = useState(false);
  const [plants, setPlants] = useState([]);

  function handleSuccessfulFormSubmission(plantData) {
    setPlants(plants.concat(plantData));
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
        console.log('handleDeleteClick', plantItem);
      })
      .catch(error => {
        // handle error
        console.log('Error deleting item', error);
      });
  }

  return (
    <div>
      <h1>Gestiona tus plantas!!</h1>
      <div
        className='btn'
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        Mostrar/Ocultar - Añadir planta
      </div>
      <LoadForm
        loggedUserId={loggedUserId}
        showForm={showForm}
        handleSuccessfulFormSubmission={handleSuccessfulFormSubmission}
      />
      <PlantContainer
        plants={plants}
        setPlants={setPlants}
        handleDeleteClick={handleDeleteClick}
        handleUpdateClick={handleUpdateClick}
      />
    </div>
  );
}
