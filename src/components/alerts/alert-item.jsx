import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AlertItem({
  alert, ...props
}) {
  const date = new Date(alert.start_date);
  return (
    <div className='alert-item-wrapper'>
      <div className='alert-item-header'>
        <h2>{alert.title}</h2>
        id: {alert.id}
      </div>
      <div className='alert-item-card'>
        <div className='created'>
          {console.log(alert)}
          <>Proxima alerta: {date.toDateString()}</>
        </div>
        <div className='notes'>
          <>Notas: {alert.notes}</>
        </div>
        <div className='status'>
          <>Estado: {alert.status ? 'Activa' : 'Inactiva'}</>
        </div>
        <div className='repeat'>
          <>Alerta periódica: {alert.repeat ? 'Si' : 'No'}</>
        </div>
        <div className='frecuency'>
          <>Frecuencia: {alert.frecuency} días</>
        </div>
        {props.noIcons && (
          <>
            <a
              title='Editar'
              className='icon-edit'
              onClick={() => props.handleEditAlertClick(alert)}
            >
              <FontAwesomeIcon icon='fa-solid fa-pencil' />
            </a>
            <a
              title='Eliminar'
              className='icon-delete'
              onClick={() => props.handleDeleteAlertClick(alert)}
            >
              <FontAwesomeIcon icon='fa-solid fa-trash' />
            </a>
          </>
        )}
      </div>
    </div>
  );
}
