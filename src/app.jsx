import { useEffect, useState } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Icons from './components/navigation/icons';

import NavigationContainer from './components/navigation/navigation-container';
import Home from './components/pages/home';
import Profile from './components/pages/profile';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Explore from './components/pages/explore';
import AlertManager from './components/pages/alert-manager';
import PlantManager from './components/pages/plant-manager';
import JournalManager from './components/pages/journal-manager';
import PlantDetails from './components/plants/plant-details';
import Login, { fetchToken, deleteToken } from './components/auth/login';
import CreateAccount from './components/auth/create-account';
import './style/main.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function App() {
  const [homeIsOpen, setHomeIsOpen] = useState(true);
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const [loggedInStatus, setloggedInStatus] = useState('NOT_LOGGED_IN');
  const [loggedUsername, setloggedUsername] = useState('');
  const [loggedUserId, setloggedUserId] = useState('');
  const [errorText, setErrorText] = useState(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [successText, setSuccessText] = useState(null);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const navigate = useNavigate();

  function handleSuccesfulLogin() {
    setloggedInStatus('LOGGED_IN');
    getUserData();
    navigate('/plants');
  }

  function handleSuccesfulAccount() {
    navigate('/login');
  }

  function handleUnsuccesfulAccount() {
    // navigate('/login');
  }

  function handleUnsuccesfulLogin() {
    deleteToken();
    setloggedInStatus('NOT_LOGGED_IN');
    setloggedUsername('');
    setloggedUserId('');
    navigate('/login');
  }

  function checkLoginStatus() {
    const validtoken = fetchToken();
    console.log('Validando estado', validtoken);
    if (validtoken) {
      handleSuccesfulLogin();
      console.log('todo bien');
    } else {
      handleUnsuccesfulLogin();
      console.log('borrar datos');
    }
  }

  function getUserData() {
    axios({
      method: 'get',
      url: `${FASTAPI_URL}/users/me`,
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
        handleUnsuccesfulLogin();
      });
  }

  function handleClickEnter() {
    setHomeIsOpen(false);
    if (loggedInStatus === 'NOT_LOGGED_IN') navigate('/login');
    else navigate('/plants');
  }

  function authorizedPages() {
    return [
      <Route
        key='plants'
        path='/plants'
        element={
          <PlantManager
            loggedUserId={loggedUserId}
            handleUnsuccesfulLogin={handleUnsuccesfulLogin}
            setErrorText={setErrorText}
            setSuccessText={setSuccessText}
          />
        }
      />,
      <Route
        key='alerts'
        path='/alerts'
        element={
          <AlertManager
            loggedUserId={loggedUserId}
            handleUnsuccesfulLogin={handleUnsuccesfulLogin}
            setErrorText={setErrorText}
            setSuccessText={setSuccessText}
          />
        }
      />,
      <Route
        key='journals'
        path='/journals'
        element={
          <JournalManager
            loggedUserId={loggedUserId}
            handleUnsuccesfulLogin={handleUnsuccesfulLogin}
            setErrorText={setErrorText}
            setSuccessText={setSuccessText}
          />
        }
      />,
      <Route
        key='details'
        path='/details'
        element={<PlantDetails loggedUserId={loggedUserId} />}
      />,
    ];
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);
  useEffect(() => {
    if (errorText) {
      setIsErrorVisible(true);
      setTimeout(() => {
        setIsErrorVisible(false);
        setErrorText(null);
      }, 3000);
    }
  }, [errorText]);
  useEffect(() => {
    if (successText) {
      setIsSuccessVisible(true);
      setTimeout(() => {
        setIsSuccessVisible(false);
        setSuccessText(null);
      }, 3000);
    }
  }, [successText]);

  if (homeIsOpen === false) {
    return (
      <div className='container'>
        <div className='header-container'>
          <FontAwesomeIcon
            style={{
              animationDuration: '10s',
              animationIterationCount: 1,
              paddingRight: '20px',
            }}
            icon='fa-brands fa-pagelines'
            beat
            fade
            size='3x'
          />
          <h1>Garden App</h1>
        </div>
        <NavigationContainer
          loggedInStatus={loggedInStatus}
          handleUnsuccesfulLogin={handleUnsuccesfulLogin}
          setHomeIsOpen={setHomeIsOpen}
        />
        {isErrorVisible && (
          <div className='message-container'>
            <div className='error-inner'>{errorText}</div>
          </div>
        )}
        {isSuccessVisible && (
          <div className='message-container'>
            <div className='success-inner'>{successText}</div>
          </div>
        )}
        <div className='main-container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/icons' element={<Icons />} />

            {loggedInStatus === 'LOGGED_IN' ? authorizedPages() : null}

            <Route
              path='/explore'
              element={
                <Explore
                  loggedUserId={loggedUserId}
                  loggedInStatus={loggedInStatus}
                  setErrorText={setErrorText}
                  setSuccessText={setSuccessText}
                />
              }
            />
            <Route
              path='/profile'
              element={<Profile username={loggedUsername} />}
              setErrorText={setErrorText}
            />
            <Route
              path='/login'
              element={
                <Login
                  handleSuccesfulLogin={handleSuccesfulLogin}
                  handleUnsuccesfulLogin={handleUnsuccesfulLogin}
                  setErrorText={setErrorText}
                />
              }
            />
            <Route
              path='/create-account'
              element={
                <CreateAccount
                  handleSuccesfulAccount={handleSuccesfulAccount}
                  handleUnsuccesfulAccount={handleUnsuccesfulAccount}
                  setErrorText={setErrorText}
                  setSuccessText={setSuccessText}
                />
              }
            />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </div>
    );
  } else {
    return (
      <div className='home-container'>
        <h1 onClick={handleClickEnter}>Garden App</h1>
        <FontAwesomeIcon
          className='home-icon'
          style={{
            animationDuration: '2s',
          }}
          icon='fa-brands fa-pagelines'
          beat
          onClick={handleClickEnter}
        />
      </div>
    );
  }
}
