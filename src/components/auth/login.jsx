import React, { useState } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from './auth';

export default function Login(props) {
  const navigate = useNavigate();
  //const [token, setToken] = useState(null);
  const [errorText, setErrorText] = useState(null);
  //const loginData = props.loginData;
  const handleChange = event => {
    props.setLoginData({
      ...props.loginData,
      [event.target.name]: event.target.value,
    });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    if (props.loginData.username.length === 0) {
      setErrorText('Username has left Blank!');
      return;
    } else if (props.loginData.password.length === 0) {
      setErrorText('Password has left Blank!');
      return;
    }
    axios({
      method: 'post',
      url: 'http://localhost:8000/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: props.loginData,
    })
      .then(response => {
        console.log('response', response);
        if (response.status === 200) {
          setErrorText(' Great, Login correct!');
          //handleSuccesfulAuth();
          if (response.data.access_token) {
            setToken(response.data.access_token);
            
            navigate('/profile');
          }
        } else {
          setErrorText('Wrong username or password1');
          //handleUnsuccesfulAuth();
        }
        console.log('response', response);
      })
      .catch(error => {
        //console.log("some error ocurred", error);
        setErrorText('Wrong username or password2', error);
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
          value={props.loginData.username}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Your password'
          value={props.loginData.password}
          onChange={handleChange}
        />
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
}
