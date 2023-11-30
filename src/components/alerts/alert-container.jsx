import AlertItem from './alert-item';

export default function AlertContainer({
  alerts,
  handleDeleteAlertClick,
  handleEditAlertClick,
}) {
  function alertItems() {
    return alerts.map(alert => {
      return (
        <AlertItem
          key={alert.id}
          alert={alert}
          handleDeleteAlertClick={handleDeleteAlertClick}
          handleEditAlertClick={handleEditAlertClick}
        />
      );
    });
  }

  return (
    <>
      <div className='alert-container-wrapper'>{alertItems()}</div>
    </>
  );
}
