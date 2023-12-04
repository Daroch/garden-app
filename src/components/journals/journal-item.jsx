export default function JournalItem({
  loggedUserId,
  journal,
  handleDeleteJournalClick,
  handleEditJournalClick,
}) {
  const imagePath = `http://localhost:8000/images/plants/${loggedUserId}/${journal.plant_id}/${journal.id}/${journal.image_url}`;
  return (
    <div className='journal-item-wrapper'>
      <div className='journal-item-header'>
        <h1>{journal.title}</h1>
        id: {journal.id}
      </div>
      <div className='journal-item-card'>
        <div className='description'>
          <>{journal.description}</>
        </div>
        <button className='btn' onClick={() => handleEditJournalClick(journal)}>
          Editar
        </button>
        <button
          className='btn'
          onClick={() => handleDeleteJournalClick(journal)}
        >
          Eliminar
        </button>
        <div className='image'>
          {journal.image_url !== null && <img src={imagePath} />}
        </div>
      </div>
    </div>
  );
}
