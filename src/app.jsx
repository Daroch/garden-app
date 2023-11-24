import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import axios from 'https://cdn.skypack.dev/axios';

import NavigationContainer from './components/navigation/navigation-container';
import Home from './components/pages/home';
import Login from './components/auth/login';
import Profile from './components/pages/profile';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Explore from './components/pages/explore';
import AlertManager from './components/pages/alert-manager';
import PlantManager from './components/pages/plant-manager';
import { fetchToken } from './components/auth/login';

import './style/main.scss';

function getUserData() {
  axios({
    method: 'get',
    url: 'http://localhost:8000/users/me',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + fetchToken(),
    },
  })
    .then(response => {
      // handle success
      console.log(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
  return;
}

function authorizedPages({ loginData }) {
  return [<Route path='login' element={<Login />} />];
}

export default function App() {
  const [loggedInStatus, setloggedInStatus] = useState('NOT_LOGGED_IN');

  function handleSuccesfulLogin() {
    setloggedInStatus('LOGGED_IN');
  }

  function handleUnsuccesfulLogin() {
    setloggedInStatus('NOT_LOGGED_IN');
    console.log('handleUnsuccesfulLogin');
  }

  return (
    <div className='container'>
      <h1>Garden App</h1>
      <NavigationContainer loggedInStatus={loggedInStatus} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='alerts' element={<AlertManager />} />
        <Route path='plants' element={<PlantManager />} />
        <Route path='explore' element={<Explore />} />
        <Route path='profile' element={<Profile />} />
        <Route
          path='login'
          element={
            <Login
              handleSuccesfulLogin={handleSuccesfulLogin}
              handleUnsuccesfulLogin={handleUnsuccesfulLogin}
              var='hola'
            />
          }
        />
      </Routes>
    </div>
  );
}
