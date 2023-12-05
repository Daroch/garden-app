import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import JournalContainer from '../journals/journal-container';

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
    plant_public,
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
    <div className='plant-details-wrapper'>
      <div className='plant-details-info'>
        <div className='left-wrapper'>
          <div className='image'>
            {image_url !== null && <img src={imagePath} />}
          </div>
        </div>
        <div className='right-wrapper'>
          <div className='plant-title'>
            <h1>{name}</h1>
          </div>
          <div className='description'>
            <>{description}</>
          </div>
          <div className='category'>
            <>{category_id}</>
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
            <>Planta añadida en: {created_at}</>
          </div>
          <div>
            <FontAwesomeIcon icon='fa-regular fa-eye' />
            Visibilidad: {plant_public}
          </div>
          <div>
            <FontAwesomeIcon icon='fa-solid fa-sticky-note' />
            Notas: {notes}
          </div>
          <div>
            <FontAwesomeIcon icon='fa-solid fa-map-marker' />
            Ubicación: {location}
          </div>
          <div> id: {id}</div>
        </div>
      </div>
      <h3> Journals </h3>
      <div className='plant-details-journals'>
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
      <h3>Alerts</h3>
      <div className='plant-details-alerts'>
        {console.log(plantItem.alerts)}
        {plantItem.alerts.map(alert => (
          <div key={alert.id}>
            <div>{alert.title}</div>
            <div>{alert.alert_type_id}</div>
            <div>Próxima alerta:{alert.start_date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
