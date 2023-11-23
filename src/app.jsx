import { Routes, Route } from 'react-router-dom';

import NavigationContainer from './components/navigation/navigation-container';
import Home from './components/pages/home';
import Login from './components/auth/login';
import Profile from './components/pages/profile';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Explore from './components/pages/explore';
import AlertManager from './components/pages/alert-manager';
import PlantManager from './components/pages/plant-manager';

import './style/main.scss';

function App() {
  return (
    <div className='container'>
      <h1>Garden App</h1>
      <NavigationContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='alerts' element={<AlertManager />} />
        <Route path='plants' element={<PlantManager />} />
        <Route path='explore' element={<Explore />} />
        <Route path='profile' element={<Profile />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
