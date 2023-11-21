import PlantContainer from './components/plants/PlantContainer';
import PlantForm from './components/plants/PlantForm';
import Login from './components/auth/login';

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
      <Login />
      <PlantForm />
      <PlantContainer />
    </div>
  );
}

export default App;
