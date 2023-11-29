export default function PlantItem({
  plant,
  handleDeleteClick,
  handleEditClick,
}) {
  const imagePath = `http://localhost:8000/images/plants/${plant.owner_id}/${plant.id}/${plant.image_url}`;

  return (
    <div className='plant-item-wrapper'>
      <div className='plant-item-header'>
        <h1>{plant.name}</h1>
        id: {plant.id}
      </div>
      <div className='plant-item-card'>
        <div className='description'>
          <>{plant.description}</>
        </div>
        <div className='irrigarion'>
          <>Riego: {plant.irrigation_type}</>
        </div>
        <div className='light'>
          <>Luz: {plant.light_type}</>
        </div>
        <div className='created'>
          <>Planta añadida en:{plant.created_at}</>
        </div>
        <div className='public'>
          <>Planta publica:{plant.public ? 'publica' : 'privada'}</>
        </div>
        <button className='btn' onClick={() => handleEditClick(plant)}>
          Editar
        </button>
        <button className='btn' onClick={() => handleDeleteClick(plant)}>
          Eliminar
        </button>
        <div className='image'>
          {plant.image_url !== null && <img src={imagePath} />}
        </div>
      </div>
    </div>
  );
}
