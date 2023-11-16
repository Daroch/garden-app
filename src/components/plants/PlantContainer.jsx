import { useEffect, useState } from 'react';
import PlantItem from './PlantItem';
//import axios from 'axios';
import axios from 'https://cdn.skypack.dev/axios';

export default function PlantContainer() {
  const [plants, setPlants] = useState([]);

  function plantItems() {
    console.log('Plantas:', plants);
    return plants.map(plant => {
      //debugger;
      return (
        <div key={plant.id} className='plant-item-wrapper'>
          <PlantItem
            id={plant.id}
            name={plant.name}
            description={plant.description}
            irrigation_type={plant.irrigation_type}
            light_type={plant.light_type}
            created_at={plant.created_at}
          />
        </div>
      );
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
    <div className='plant-container-wrapper'>
      Este es el contenedor principal
      {plantItems()}
    </div>
  );
}
