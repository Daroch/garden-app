import PlantItem from './plant-item';

export default function PlantContainer({
  plants,
  handleDeleteClick,
  handleEditClick,
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
