import AlertItem from './alert-item';

export default function AlertContainer({
  alerts,
  setAlerts,
  handleDeleteClick,
  handleEditClick,
  handleUnsuccesfulLogin,
}) {
  function alertItems() {
    return alerts.map(alert => {
      return <AlertItem key={alert.id} alert={alert} />;
    });
  }

  return <div>{alertItems()}</div>;
}
