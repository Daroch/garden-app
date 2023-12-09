export default function DeleteConfirm({
  closeModalDeleteConfirm,
  handleDeleteConfirmClick,
  type,
  itemToDelete,
}) {
  return (
    <>
      <div className='modal-delete-wrapper'>
        <div className='modal-delete-content'>
          <div className='modal-delete-title'>
            <h1>¿Estás seguro de que quieres eliminar esta {type}?</h1>
          </div>
          <div className='modal-delete-buttons'>
            <button
              className='btn btn-primary'
              onClick={() => handleDeleteConfirmClick(itemToDelete)}
            >
              Eliminar
            </button>
            <button
              className='btn btn-secondary'
              onClick={closeModalDeleteConfirm}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
