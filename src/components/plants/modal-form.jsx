import PlantForm from './plant-form';
export default function LoadForm({
  showForm,
  loggedUserId,
  handleSuccessfulFormSubmission,
}) {
  if (showForm) {
    return (
      <PlantForm
        loggedUserId={loggedUserId}
        handleSuccessfulFormSubmission={handleSuccessfulFormSubmission}
      />
    );
  }
}
