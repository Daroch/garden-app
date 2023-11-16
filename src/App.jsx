import PlantContainer from './components/plants/PlantContainer';
import './style/main.scss';

function App() {
  return (
    <div className='container'>
      <h1>Garden App</h1>
      <p>Gestiona tus plantas!!</p>
      <PlantContainer />
    </div>
  );
}

export default App;
