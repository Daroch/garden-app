export default function AlertItem({
  alert,
  handleDeleteAlertClick,
  handleEditAlertClick,
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
          <>Fecha: {alert.start_date}</>
        </div>
        <button className='btn' onClick={() => handleEditAlertClick(alert)}>
          Editar
        </button>
        <button className='btn' onClick={() => handleDeleteAlertClick(alert)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
