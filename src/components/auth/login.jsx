/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'https://cdn.skypack.dev/axios';

function saveToken(token) {
  // save token in localStorage
  localStorage.setItem('gardenAppToken', token);
}

export function deleteToken() {
  // save token in localStorage
  localStorage.removeItem('gardenAppToken');
}

export function fetchToken() {
  // fetch the token
  return localStorage.getItem('gardenAppToken');
}

export default function Login({
  handleSuccesfulLogin,
  handleUnsuccesfulLogin,
  setErrorText,
  setIsErrorVisible,
}) {
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleChange = event => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (loginData.username.length === 0) {
      setErrorText('No has escrito el usuario!');
      return;
    } else if (loginData.password.length === 0) {
      setErrorText('No has escrito tu clave!');
      return;
    }
    axios({
      method: 'post',
      url: `${FASTAPI_URL}/token`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: loginData,
    })
      .then(response => {
        if (response.status === 200) {
          setErrorText();
          if (response.data.access_token) {
            saveToken(response.data.access_token);
            handleSuccesfulLogin();
          }
        } else {
          // setErrorText('Wrong username or password1');
          handleUnsuccesfulLogin();
        }
        // console.log('response', response);
      })
      .catch(error => {
        console.log('some error ocurred', error);
        setErrorText('Usuario o Password incorrectos');
        setIsErrorVisible(true);

        setTimeout(() => {
          setIsErrorVisible(false);
        }, 3000);
        handleUnsuccesfulLogin();
      });
    event.preventDefault();
  };

  return (
    <div className='loginform-container-wrapper'>
      <form onSubmit={handleSubmit} className='login-form-wrapper'>
        <h1>Login</h1>
        <input
          type='text'
          name='username'
          placeholder='Your name'
          value={loginData.username}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Your password'
          value={loginData.password}
          onChange={handleChange}
        />
        <div>
          <button className='btn' type='submit'>
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}
