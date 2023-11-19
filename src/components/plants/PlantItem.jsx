export default function PlantItem({
  id,
  name,
  description,
  irrigation_type,
  light_type,
  created_at,
  image,
}) {
  const image_path = 'http://localhost:8000/images/plants/' + { image };
  return (
    <div className='plant-item-wrapper'>
      <div className='plant-item-header'>
        <h1>{name}</h1>
        id: {id}
      </div>
      <div className='plant-item-card'>
        <div className='description'>
          <>{description}</>
        </div>
        <div className='irrigarion'>
          <>Riego: {irrigation_type}</>
        </div>
        <div className='light'>
          <>Luz: {light_type}</>
        </div>
        <div className='created'>
          <>Planta añadida en:{created_at}</>
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
