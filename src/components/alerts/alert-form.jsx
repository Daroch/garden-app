import { useEffect, useState } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import { fetchToken } from '../auth/login';

export default function AlertForm({
  loggedUserId,
  handleSuccessfulFormAlertSubmission,
  handleSuccessfulFormAlertEditSubmission,
  clearAlertToEdit,
  alertToEdit,
}) {
  const [alertData, setAlertData] = useState({
    start_date: '',
    status: true,
    repeat: true,
    frecuency: 3,
    created_at: '',
    plant_id: 1,
    alert_type_id: 1,
    notes: '',
    title: '',
  });
  const [formParameters, setFormParameters] = useState({
    editMode: false,
    apiUrl: 'http://localhost:8000/users/' + loggedUserId + '/addalert',
    apiAction: 'post',
  });

  function handleChange(event) {
    setAlertData({
      ...alertData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: formParameters.apiAction,
      url: formParameters.apiUrl,
      data: alertData,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        // handle success
        console.log(response);
        if (formParameters.editMode) {
          handleSuccessfulFormAlertEditSubmission(response.data);
        } else {
          handleSuccessfulFormAlertSubmission(response.data);
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  useEffect(() => {
    if (Object.keys(alertToEdit).length > 0) {
      setAlertData(alertToEdit);
      clearAlertToEdit();
      setFormParameters({
        editMode: true,
        apiUrl: `http://localhost:8000/users/${loggedUserId}/updatealert/${alertToEdit.id}`,
        apiAction: 'patch',
      });
    }
  }, [alertToEdit]);

  return (
    <form onSubmit={handleSubmit} className='plant-form-wrapper'>
      <div className='two-column'>
        <input
          type='text'
          name='start_date'
          id='start_date'
          placeholder='Start Date'
          value={alertData.start_date}
          onChange={handleChange}
        />
        <input
          type='checkbox'
          name='status'
          id='status'
          checked={alertData.status}
          onChange={handleChange}
        />
      </div>
      <div className='two-column'>
        <input
          type='checkbox'
          name='repeat'
          id='repeat'
          checked={alertData.repeat}
          onChange={handleChange}
        />
        <input
          type='text'
          name='frecuency'
          id='frecuency'
          placeholder='Frequency'
          value={alertData.frecuency}
          onChange={handleChange}
        />
      </div>
      <div className='two-column'>
        <input
          type='text'
          name='created_at'
          id='created_at'
          placeholder='Created At'
          value={alertData.created_at}
          onChange={handleChange}
        />
        <input
          type='number'
          name='alert_type_id'
          id='alert_type_id'
          placeholder='Alert Type ID'
          value={alertData.alert_type_id}
          onChange={handleChange}
        />
      </div>
      <div className='one-column'>
        <input
          type='text'
          name='notes'
          id='notes'
          placeholder='Notes'
          value={alertData.notes}
          onChange={handleChange}
        />
      </div>
      <button className='btn' type='submit'>
        Submit
      </button>
    </form>
  );
}
