import JournalItem from './journal-item';

export default function JournalContainer({
  loggedUserId,
  journals,
  handleDeleteJournalClick,
  handleEditJournalClick,
  setErrorText,
}) {
  function journalItems() {
    return journals.map(journal => {
      return (
        <JournalItem
          loggedUserId={loggedUserId}
          key={journal.id}
          journal={journal}
          handleDeleteJournalClick={handleDeleteJournalClick}
          handleEditJournalClick={handleEditJournalClick}
          setErrorText={setErrorText}
        />
      );
    });
  }

  return (
    <>
      <div className='journal-container-wrapper'>{journalItems()}</div>
    </>
  );
}
