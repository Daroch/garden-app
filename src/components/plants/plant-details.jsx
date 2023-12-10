import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import AlertContainer from '../alerts/alert-container';
import JournalContainer from '../journals/journal-container';

export default function PlantDetails({ loggedUserId }) {
  const { state } = useLocation();
  const { plantItem, categories } = state; // Read values passed on state
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
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
    plant_public,
  } = plantItem;
  const categoriesList = categories.map(category => category.name);
  const imagePath = `${FASTAPI_URL}/images/plants/${owner_id}/${id}/${image_url}`;
  const openImageInNewTab = () => {
    window.open(imagePath, '_blank');
  };
  console.log(categories);
  const levels = {
    level1: 'Muy poca',
    level2: 'Poca',
    level3: 'Normal',
    level4: 'Bastante',
    level5: 'Mucha',
  };
  return (
    <div className='plant-details-wrapper'>
      <div className='plant-details-info'>
        <div className='left-wrapper'>
          <div className='image' onClick={openImageInNewTab}>
            {image_url !== null && <img title='Ampliar' src={imagePath} />}
          </div>
        </div>
        <div className='right-wrapper'>
          <div className='plant-title'>
            <h1>{name}</h1>
          </div>
          <div className='category'>
            <>Categoría: {categoriesList[category_id - 1]}</>
          </div>
          <div className='irrigarion'>
            <>
              <FontAwesomeIcon icon='fa-solid fa-faucet-drip' /> Riego:{' '}
              {levels[irrigation_type]}
            </>
          </div>

          <div className='light'>
            <>
              {' '}
              <FontAwesomeIcon icon='fa-solid fa-sun' /> Luz:{' '}
              {levels[light_type]}
            </>
          </div>
          <div className='created'>
            <>Planta añadida en: {Date(created_at)}</>
          </div>
          <div>
            <FontAwesomeIcon icon='fa-regular fa-eye' />
            Visibilidad: {plant_public}
          </div>
          {loggedUserId === owner_id && (
            <div>
              <FontAwesomeIcon icon='fa-solid fa-sticky-note' />
              Notas: {notes}
            </div>
          )}
          <div className='description'>
            <>{description}</>
          </div>
          <div>
            <FontAwesomeIcon icon='fa-solid fa-map-marker' />
            Ubicación: {location}
          </div>
        </div>
      </div>
      <div className='plant-details-journals'>
        <h2> Journals </h2>
        {console.log(plantItem.journals)}
        {plantItem.journals.map(journal => (
          <div key={journal.id}>
            <div>{journal.title}</div>
            <div>
              {journal.description !== 'undefined' && journal.description}
            </div>
            <div>{journal.created_at}</div>
            <div>{journal.image_url}</div>
          </div>
        ))}
      </div>
      {loggedUserId === owner_id && (
        <div className='plant-details-alerts'>
          <h2>Alerts</h2>
          {console.log(plantItem.alerts)}
          <AlertContainer alerts={plantItem.alerts} />
          {plantItem.alerts.map(alert => (
            <div key={alert.id}>
              <div>{alert.title}</div>
              <div>{alert.alert_type_id}</div>
              <div>Próxima alerta:{alert.start_date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
