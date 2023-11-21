import React, { useState } from 'react';
import axios from 'https://cdn.skypack.dev/axios';

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [errorText, setErrorText] = useState('');

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
    } else if (loginData.password.length === 0) {
      setErrorText('Password has left Blank!');
    }
    axios({
      method: 'post',
      url: 'http://localhost:8000/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: loginData,
      withCredentials: true,
    })
      .then(response => {
        if (response.data.status === 'OK') {
          //handleSuccesfulAuth();
          if (response.data.access_token) {
            setToken(response.data.access_token);
            //navigate('/profile');
          }
        } else {
          setErrorText('Wrong username or password');
          //handleUnsuccesfulAuth();
        }
        console.log('response', response);
      })
      .catch(error => {
        //console.log("some error ocurred", error);
        setErrorText('Some error ocurred');
        //handleUnsuccesfulAuth();
      });
    event.preventDefault();
  };

  return (
    <div>
      <h1>Login to Access DashBoard</h1>
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
