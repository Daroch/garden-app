import { useEffect, useState } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { fetchToken } from '../auth/login';

export default function AlertForm({
  loggedUserId,
  handleSuccessfulFormAlertSubmission,
  handleSuccessfulFormAlertEditSubmission,
  clearAlertToEdit,
  alertToEdit,
  alertTypes,
  plants,
  setErrorText,
}) {
  const [alertData, setAlertData] = useState({
    alert_type_id: 1,
    start_date: '',
    title: '',
    status: true,
    repeat: true,
    frecuency: 3,
    plant_id: '',
    notes: '',
  });
  const [status, setStatus] = useState(true);
  const [repeat, setRepeat] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [formParameters, setFormParameters] = useState({
    editMode: false,
    apiUrl: `http://localhost:8000/users/${loggedUserId}/plants/${alertData.plant_id}/addalert`,
    apiAction: 'post',
  });

  const handleStatusChange = () => {
    setStatus(!status);
    alertData.status = !status;
  };

  const handleRepeatChange = () => {
    setRepeat(!repeat);
    alertData.repeat = !repeat;
  };

  function handlePlantChange(event) {
    setAlertData({
      ...alertData,
      [event.target.name]: event.target.value,
    });
    if (formParameters.editMode) {
      setFormParameters({
        ...formParameters,
        apiUrl: `http://localhost:8000/users/${loggedUserId}/plants/${event.target.value}/updatealert/${alertData.id}`,
        apiAction: 'patch',
      });
    } else {
      setFormParameters({
        ...formParameters,
        apiUrl: `http://localhost:8000/users/${loggedUserId}/plants/${event.target.value}/addalert/`,
        apiAction: 'post',
      });
    }
  }

  function handleChange(event) {
    setAlertData({
      ...alertData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    alertData.repeat = repeat;
    alertData.status = status;
    alertData.start_date = startDate;
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
        setErrorText('Error submitting alert');
      })
      .finally(function () {
        // always executed
      });
  }

  useEffect(() => {
    if (Object.keys(alertToEdit).length > 0) {
      setAlertData(alertToEdit);
      setStatus(alertToEdit.status);
      setRepeat(alertToEdit.repeat);
      setStartDate(new Date(alertToEdit.start_date));
      setFormParameters({
        editMode: true,
        apiUrl: `http://localhost:8000/users/${loggedUserId}/plants/${alertToEdit.plant_id}/updatealert/${alertToEdit.id}`,
        apiAction: 'patch',
      });
      clearAlertToEdit();
    }
  }, [alertToEdit]);

  useEffect(() => {
    alertData.start_date = startDate;
  }, [startDate]);

  return (
    <form onSubmit={handleSubmit} className='plant-form-wrapper'>
      <div className='two-column'>
        <select
          name='alert_type_id'
          id='alert_type_id'
          placeholder='Tipo de Alerta'
          value={alertData.alert_type_id}
          onChange={handleChange}
          className='select-element'
        >
          <option value=''>Select an alert type</option>
          {alertTypes.map(alertType => {
            return (
              <option key={alertType.id} value={alertType.id}>
                {alertType.alert_name}
              </option>
            );
          })}
        </select>
        <DateTimePicker
          name='start_date'
          onChange={setStartDate}
          value={startDate}
        />
      </div>
      <div className='four-column'>
        Titulo
        <input
          type='text'
          name='title'
          id='title'
          placeholder='Alert title'
          value={alertData.title}
          onChange={handleChange}
        />
        Activada:
        <input
          type='checkbox'
          name='status'
          id='status'
          checked={status}
          onChange={handleStatusChange}
        />
      </div>
      <div className='four-column'>
        Repetir:
        <input
          type='checkbox'
          name='repeat'
          id='repeat'
          checked={repeat}
          onChange={handleRepeatChange}
        />
        Frecuencia:
        <input
          type='text'
          name='frecuency'
          id='frecuency'
          placeholder='Frequency'
          value={alertData.frecuency}
          onChange={handleChange}
        />
      </div>
      <div className='four-column'>
        Notas:
        <input
          type='text'
          name='notes'
          id='notes'
          placeholder='Notes'
          value={alertData.notes}
          onChange={handleChange}
        />
        Planta asociada:
        <select
          name='plant_id'
          placeholder='Planta'
          value={alertData.plant_id}
          onChange={handlePlantChange}
          className='select-element'
        >
          <option value=''>Select a plant</option>
          {plants.map(plant => {
            return (
              <option key={plant.id} value={plant.id}>
                {plant.name}
              </option>
            );
          })}
        </select>
      </div>
      <div></div>
      <button className='btn' type='submit'>
        Submit
      </button>
    </form>
  );
}
