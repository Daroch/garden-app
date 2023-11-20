import PlantContainer from './components/plants/PlantContainer';
import PlantForm from './components/plants/PlantForm';
import './style/main.scss';

function App() {
  return (
    <div className='container'>
      <h1>Garden App</h1>
      <p>Gestiona tus plantas!!</p>
      <div
        className='btn'
        onClick={() => {
          loadForm;
        }}
      >
        Añadir planta
      </div>
      <PlantForm />
      <PlantContainer />
    </div>
  );
}

export default App;
