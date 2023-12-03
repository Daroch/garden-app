import PlantItem from './plant-item';

export default function PlantContainer({
  plants,
  handleDeleteClick,
  handleEditClick,
  handleDetailClick,
}) {
  function plantItems() {
    return plants.map(plant => {
      // console.log(plant);
      return (
        <PlantItem
          key={plant.id}
          plant={plant}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
          handleDetailClick={handleDetailClick}
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
