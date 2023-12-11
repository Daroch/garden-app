import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function PlantItem({
  loggedUserId,
  plant,
  handleDeleteClick,
  handleEditClick,
  handleDetailClick,
  handleCloneClick,
  categories,
}) {
  const [plantItemClass, setPlantItemClass] = useState('');
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const imagePath = `${FASTAPI_URL}/images/plants/${plant.owner_id}/${plant.id}/${plant.image_url}`;

  function handleMouseEnter() {
    setPlantItemClass('image-blur');
  }

  function handleMouseLeave() {
    setPlantItemClass('');
  }

  return (
    <div
      className='plant-item-wrapper'
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <div
        className={'plant-img-background ' + plantItemClass}
        style={{
          backgroundImage: 'url(' + imagePath + ')',
        }}
      />
      <div className='plant-item-card'>
        <div className='plant-item-card-title'>
          <h1>{plant.name}</h1>
        </div>
        <div className='plant-item-card-icons'>
          {loggedUserId === plant.owner_id && (
            <a
              title='Editar'
              className='icon-edit'
              onClick={() => handleEditClick(plant)}
            >
              <FontAwesomeIcon icon='fa-solid fa-pencil' />
            </a>
          )}
          {loggedUserId === plant.owner_id && (
            <a
              title='Eliminar'
              className='icon-delete'
              onClick={() => handleDeleteClick(plant)}
            >
              <FontAwesomeIcon icon='fa-solid fa-trash' />
            </a>
          )}
          {loggedUserId !== plant.owner_id && (
            <a
              title='Clonar'
              className='icon-view'
              onClick={() => handleCloneClick(plant)}
            >
              <FontAwesomeIcon icon='fa-solid fa-seedling' />
            </a>
          )}
          <a
            title='Ver detalles'
            className='icon-view'
            onClick={() => handleDetailClick(plant)}
          >
            <FontAwesomeIcon icon='fa-solid fa-eye' />
          </a>
        </div>
      </div>
    </div>
  );
}
