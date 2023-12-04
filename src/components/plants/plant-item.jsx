export default function PlantItem({
  plant,
  handleDeleteClick,
  handleEditClick,
  handleDetailClick,
}) {
  const imagePath = `http://localhost:8000/images/plants/${plant.owner_id}/${plant.id}/${plant.image_url}`;
  return (
    <div className='plant-item-wrapper'>
      <div className='plant-item-header'>
        <h1>{plant.name}</h1>
      </div>
      <div className='plant-item-card'>
        <button className='btn' onClick={() => handleEditClick(plant)}>
          Editar
        </button>
        <button className='btn' onClick={() => handleDeleteClick(plant)}>
          Eliminar
        </button>
        <button className='btn' onClick={() => handleDetailClick(plant)}>
          Detalles
        </button>
        <div className='image'>
          {plant.image_url !== null && <img src={imagePath} />}
        </div>
      </div>
    </div>
  );
}
