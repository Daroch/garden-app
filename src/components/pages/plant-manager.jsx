import { useState } from 'react';
import PlantContainer from '../plants/PlantContainer';
import PlantForm from '../plants/PlantForm';

export default function PlantManager() {
  const [showForm, setShowForm] = useState(false);

  function LoadForm() {
    if (showForm) {
      return <PlantForm />;
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
        <LoadForm />
      </div>
      <PlantContainer />
    </div>
  );
}
