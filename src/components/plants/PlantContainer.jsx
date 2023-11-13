import { Plant } from './PlantItem';

export function PlantContainer() {
  return (
    <div className='plant-container-wrapper'>
      Este es el contenedor principal'
      <div className='plant-item-wrapper'>
        <Plant />
      </div>
      <div className='plant-item-wrapper'>
        <Plant />
      </div>
      <div className='plant-item-wrapper'>
        <Plant />
      </div>
    </div>
  );
}
