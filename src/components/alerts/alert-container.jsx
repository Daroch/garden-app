import AlertItem from './alert-item';

export default function AlertContainer({
  alerts,
  handleDeleteClick,
  handleEditClick,
}) {
  function alertItems() {
    return alerts.map(alert => {
      return (
        <AlertItem
          key={alert.id}
          alert={alert}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
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
