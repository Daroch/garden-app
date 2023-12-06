export default function AlertItem({
  alert,
  handleDeleteAlertClick,
  handleEditAlertClick,
}) {
  return (
    <div className='alert-item-wrapper'>
      <div className='alert-item-header'>
        <h2>{alert.title}</h2>
        id: {alert.id}
      </div>
      <div className='alert-item-card'>
        <div className='created'>
          {console.log(alert)}
          <>Programada para el día: {alert.start_date.toString()}</>
        </div>
        <div className='notes'>
          <>Notas: {alert.notes}</>
        </div>
        <div className='status'>
          <>Estado: {alert.status ? 'Activa' : 'Inactiva'}</>
        </div>
        <div className='repeat'>
          <>Repetir: {alert.repeat ? 'Si' : 'No'}</>
        </div>
        <div className='frecuency'>
          <>Frecuencia: {alert.frecuency}</>
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
