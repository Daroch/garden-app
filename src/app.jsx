import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import { useNavigate } from 'react-router-dom';

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

export default function App() {
  const [loggedInStatus, setloggedInStatus] = useState('NOT_LOGGED_IN');
  const [loggedUsername, setloggedUsername] = useState('');
  const [loggedUserId, setloggedUserId] = useState('');
  const navigate = useNavigate();

  function handleSuccesfulLogin() {
    setloggedInStatus('LOGGED_IN');
    getUserData();
    navigate('/plants');
  }

  function handleUnsuccesfulLogin() {
    localStorage.removeItem('gardenAppToken');
    setloggedInStatus('NOT_LOGGED_IN');
    setloggedUsername('');
    setloggedUserId('');
    navigate('/');
  }

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
        setloggedUsername(response.data.name);
        setloggedUserId(response.data.id);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  function authorizedPages() {
    return [
      <Route
        key='plants'
        path='plants'
        element={
          <PlantManager
            loggedInStatus={loggedInStatus}
            loggedUserId={loggedUserId}
          />
        }
      />,
      <Route
        key='alerts'
        path='alerts'
        element={
          <AlertManager
            loggedInStatus={loggedInStatus}
            loggedUserId={loggedUserId}
          />
        }
      />,
    ];
  }

  return (
    <div className='container'>
      <h1>Garden App</h1>
      <NavigationContainer
        loggedInStatus={loggedInStatus}
        handleUnsuccesfulLogin={handleUnsuccesfulLogin}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />

        {loggedInStatus === 'LOGGED_IN' ? authorizedPages() : null}

        <Route path='explore' element={<Explore />} />
        <Route path='profile' element={<Profile username={loggedUsername} />} />
        <Route
          path='login'
          element={
            <Login
              handleSuccesfulLogin={handleSuccesfulLogin}
              handleUnsuccesfulLogin={handleUnsuccesfulLogin}
            />
          }
        />
      </Routes>
    </div>
  );
}
