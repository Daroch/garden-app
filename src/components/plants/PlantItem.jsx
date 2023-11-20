export default function PlantItem({ plant }) {
  const [
    id,
    name,
    description,
    irrigation_type,
    light_type,
    created_at,
    image,
  ] = [plant];
  const image_path = 'http://localhost:8000/images/plants/' + plant.image;
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
        <div className='image'>
          <>
            <img src={image_path} />
          </>
        </div>
      </div>
    </div>
  );
}
