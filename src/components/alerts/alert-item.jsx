export default function AlertItem({
  alert,
  handleDeleteClick,
  handleEditClick,
}) {
  return (
    <div className='alert-item-wrapper'>
      <div className='alert-item-header'>
        <h1>{alert.title}</h1>
        id: {alert.id}
      </div>
      <div className='alert-item-card'>
        <div className='description'>
          <>{alert.description}</>
        </div>
        <div className='created'>
          <>Alerta añadida en:{alert.created_at}</>
        </div>
        <button className='btn' onClick={() => handleEditClick(alert)}>
          Editar
        </button>
        <button className='btn' onClick={() => handleDeleteClick(alert)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
