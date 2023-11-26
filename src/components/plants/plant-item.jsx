export default function PlantItem({
  plant,
  handleDeleteClick,
  handleUpdateClick,
}) {
  const [
    id,
    name,
    description,
    irrigation_type,
    light_type,
    created_at,
    image_url,
  ] = [plant];

  const image_path = 'http://localhost:8000/images/plants/' + plant.image_url;

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
        <button className='btn' onClick={() => handleUpdateClick(plant)}>
          Editar
        </button>
        <button className='btn' onClick={() => handleDeleteClick(plant)}>
          Eliminar
        </button>
        <div className='image'>
          <>
            <img src={image_path} />
          </>
        </div>
      </div>
    </div>
  );
}
