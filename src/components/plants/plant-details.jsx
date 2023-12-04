import PlantItem from './plant-item';
import { useLocation } from 'react-router-dom';

export default function PlantDetails() {
  const { state } = useLocation();
  const { plantItem } = state; // Read values passed on state

  console.log('PlantDetails', plantItem);
  const {
    id,
    name,
    description,
    irrigation_type,
    light_type,
    location,
    notes,
    image_url,
    created_at,
    owner_id,
    category_id,
    public: isPublic,
  } = plantItem;
  const imagePath = `http://localhost:8000/images/plants/${owner_id}/${id}/${image_url}`;
  const levels = {
    level1: 'Muy poca',
    level2: 'Poca',
    level3: 'Normal',
    level4: 'Bastante',
    level5: 'Mucha',
  };
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
          <>Riego: {levels[irrigation_type]}</>
        </div>
        <div className='light'>
          <>Luz: {levels[light_type]}</>
        </div>
        <div className='created'>
          <>Planta añadida en: {created_at}</>
        </div>

        <div className='image'>
          {image_url !== null && <img src={imagePath} />}
        </div>
      </div>
    </div>
  );
}
