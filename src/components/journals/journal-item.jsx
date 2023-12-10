import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function JournalItem({
  loggedUserId,
  journal,
  handleDeleteJournalClick,
  handleEditJournalClick,
}) {
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const imagePath = `${FASTAPI_URL}/images/plants/${loggedUserId}/${journal.plant_id}/${journal.id}/${journal.image_url}`;
  const openImageInNewTab = () => {
    window.open(imagePath, '_blank');
  };
  const date = new Date(journal.created_at);
  return (
    <div className='journal-item-wrapper'>
      <div className='journal-item-card'>
        <div className='image' onClick={openImageInNewTab}>
          {journal._url !== null && <img title='Ampliar' src={imagePath} />}
        </div>
        <div className='title'>{journal.title}</div>
        {journal.description !== 'undefined' &&
          journal.description !== 'null' && (
            <div className='description'>
              <>{journal.description}</>
            </div>
          )}
        <div className='date'>
          <>{date.toDateString()}</>
        </div>
        <a
          title='Editar'
          className='icon-edit'
          onClick={() => handleEditJournalClick(journal)}
        >
          <FontAwesomeIcon icon='fa-solid fa-pencil' />
        </a>
        <a
          title='Eliminar'
          className='icon-delete'
          onClick={() => handleDeleteJournalClick(journal)}
        >
          <FontAwesomeIcon icon='fa-solid fa-trash' />
        </a>
      </div>
    </div>
  );
}
