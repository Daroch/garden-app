import PlantItem from './plant-item';

export default function PlantContainer({
  loggedUserId,
  plants,
  handleDeleteClick,
  handleEditClick,
  handleDetailClick,
  handleCloneClick,
  categories,
}) {
  function plantItems() {
    return plants.map(plant => {
      // console.log(plant);
      return (
        <PlantItem
          loggedUserId={loggedUserId}
          key={plant.id}
          plant={plant}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
          handleDetailClick={handleDetailClick}
          handleCloneClick={handleCloneClick}
          categories={categories}
        />
      );
    });
  }

  return (
    <>
      <div className='plant-container-wrapper'>{plantItems()}</div>
    </>
  );
}
