import { useState } from 'react';
import PlantContainer from '../plants/plant-container';
import PlantForm from '../plants/plant-form';

export default function PlantManager(props) {
  const [showForm, setShowForm] = useState(false);

  function LoadForm(props) {
    if (showForm) {
      return <PlantForm loggedUserId={props.loggedUserId} />;
    }
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
      <LoadForm loggedUserId={props.loggedUserId} />
      <PlantContainer />
    </div>
  );
}
