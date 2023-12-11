import AlertItem from './alert-item';

export default function AlertContainer({
  ...props }) {
  function alertItems() {
    return props.alerts.map(alert => {
      return (
        <AlertItem
          key={alert.id}
          alert={alert}
          handleDeleteAlertClick={props.handleDeleteAlertClick}
          handleEditAlertClick={props.handleEditAlertClick}
          setErrorText={props.setErrorText}
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
