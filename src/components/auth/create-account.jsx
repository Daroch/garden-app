/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'https://cdn.skypack.dev/axios';

export default function CreateAccount({
  handleSuccesfulAccount,
  setErrorText,
  setSuccessText,
}) {
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const [accountData, setAccountData] = useState({
    name: '',
    hashed_password: '',
    email: '',
  });

  const handleChange = event => {
    setAccountData({
      ...accountData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (accountData.name.length === 0) {
      setErrorText('No has escrito tu nombre!');
      return;
    } else if (accountData.hashed_password.length === 0) {
      setErrorText('No has escrito tu clave!');
      return;
    } else if (accountData.email.length === 0) {
      setErrorText('No has escrito tu email!');
      return;
    }
    axios({
      method: 'post',
      url: `${FASTAPI_URL}/users`,
      headers: { accept: 'application/json' },
      data: accountData,
    })
      .then(response => {
        if (response.status === 201) {
          setSuccessText('Cuenta creada correctamente');
          handleSuccesfulAccount();
        } else {
          console.log(response.data.detail);
          setErrorText(response.data.detail);
        }
      })
      .catch(error => {
        setErrorText(
          'No se pudo crear la cuenta. ' + error.response.data.detail,
        );
      });
  };

  return (
    <div className='accountform-container-wrapper'>
      <form onSubmit={handleSubmit} className='account-form-wrapper'>
        <h1>Account</h1>
        <input
          type='text'
          name='name'
          placeholder='Your name'
          value={accountData.username}
          onChange={handleChange}
        />
        <input
          type='password'
          name='hashed_password'
          placeholder='Your password'
          value={accountData.password}
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Your email'
          value={accountData.email}
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
