import { useEffect, useState } from 'react';

//import axios from 'axios';
import axios from 'https://cdn.skypack.dev/axios';

import PlantItem from './PlantItem';

export default function PlantContainer() {
  const [plants, setPlants] = useState([]);

  function plantItems() {
    console.log('Plantas:', plants);
    return plants.map(plant => {
      //debugger;
      console.log(plant);
      return <PlantItem key={plant.id} plant={plant} />;
    });
  }

  function getPlantItems() {
    axios
      .get('http://localhost:8000/plants')
      .then(response => {
        // handle success
        console.log(response);
        setPlants(response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
  useEffect(getPlantItems, []);
  return (
    <>
      <div className='plant-container-wrapper'>{plantItems()}</div>;
    </>
  );
}
