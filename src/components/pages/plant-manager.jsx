import PlantContainer from '../plants/PlantContainer';
import PlantForm from '../plants/PlantForm';

export default function PlantManager() {
  return (
    <div>
      <h1>Gestiona tus plantas!!</h1>
      <div
        className='btn'
        onClick={() => {
          loadForm;
        }}
      >
        Añadir planta
      </div>
      <PlantForm />
      <PlantContainer />
    </div>
  );
}
