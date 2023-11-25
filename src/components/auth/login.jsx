import React, { useState } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import { useNavigate } from 'react-router-dom';

function saveToken(token) {
  // seave token in localStorage
  localStorage.setItem('gardenAppToken', token);
}

function deleteToken() {
  // seave token in localStorage
  localStorage.removeItem('gardenAppToken');
}

export function fetchToken() {
  // fetch the token
  return localStorage.getItem('gardenAppToken');
}

export default function Login(props) {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState(null);
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
      setErrorText('Username has left Blank!');
      return;
    } else if (loginData.password.length === 0) {
      setErrorText('Password has left Blank!');
      return;
    }
    axios({
      method: 'post',
      url: 'http://localhost:8000/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: loginData,
    })
      .then(response => {
        console.log('response', response);
        if (response.status === 200) {
          setErrorText(' Great, Login correct!');
          if (response.data.access_token) {
            saveToken(response.data.access_token);
            props.handleSuccesfulLogin();
          }
        } else {
          //setErrorText('Wrong username or password1');
          //props.handleUnsuccesfulLogin();
        }
        //console.log('response', response);
      })
      .catch(error => {
        //console.log("some error ocurred", error);
        setErrorText('Wrong username or password2');
        props.handleUnsuccesfulLogin();
      });
    event.preventDefault();
  };

  return (
    <div>
      <h1>Login to Access DashBoard {props.var}</h1>
      <div>{errorText}</div>
      <form onSubmit={handleSubmit}>
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
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
}
