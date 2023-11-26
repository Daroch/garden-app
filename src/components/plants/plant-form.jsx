import { useState } from 'react';
//import axios from 'axios';
import axios from 'https://cdn.skypack.dev/axios';
import { fetchToken } from '../auth/login';

export default function PlantForm({
  loggedUserId,
  handleSuccessfulFormSubmission,
}) {
  const [plantData, setPlantData] = useState({
    name: '',
    category_id: 1,
    irrigation_type: 'muypoca',
    light_type: 'muypoca',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);

  function handleChange(event) {
    setPlantData({
      ...plantData,
      [event.target.name]: event.target.value,
    });
  }

  function handleFileChange(event) {
    console.log(event.target.files);
    setImageFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:8000/users/' + loggedUserId + '/addplant',
      data: buildForm(),
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        // handle success
        console.log(response);
        handleSuccessfulFormSubmission(response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  function buildForm() {
    let formData = new FormData();

    formData.append('name', plantData.name);
    formData.append('category_id', plantData.category_id);
    formData.append('irrigation_type', plantData.irrigation_type);
    formData.append('light_type', plantData.light_type);
    formData.append('description', plantData.description);
    if (imageFile) {
      formData.append('imagefile', imageFile);
    }
    console.log(formData);
    return formData;
  }

  return (
    <form onSubmit={handleSubmit} className='plant-form-wrapper'>
      <div className='two-column'>
        <input
          type='text'
          name='name'
          placeholder='Plant Name'
          value={plantData.name}
          onChange={handleChange}
        />
        <select
          name='category_id'
          placeholder='Categoría'
          value={plantData.category_id}
          onChange={handleChange}
          className='select-element'
        >
          <option value='1'>Ornamentales</option>
          <option value='2'>Huerto</option>
          <option value='3'>Árboles</option>
          <option value='4'>Setas</option>
        </select>
      </div>
      <div className='two-column'>
        <select
          name='irrigation_type'
          placeholder='Riego'
          value={plantData.irrigation_type}
          onChange={handleChange}
          className='select-element'
        >
          <option value='1'>Muy poca</option>
          <option value='2'>Poca</option>
          <option value='3'>Bastante</option>
          <option value='4'>Mucha</option>
        </select>
        <select
          name='light_type'
          placeholder='Luz'
          value={plantData.light_type}
          onChange={handleChange}
          className='select-element'
        >
          <option value='1'>Muy poca</option>
          <option value='2'>Poca</option>
          <option value='3'>Bastante</option>
          <option value='4'>Mucha</option>
        </select>
        <input
          type='file'
          name='imagefile'
          encType='multipart/form-data'
          onChange={handleFileChange}
        />
      </div>
      <div className='one-column'>
        <textarea
          type='text'
          name='description'
          placeholder='Descripción'
          value={plantData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <button className='btn' type='submit'>
          Save
        </button>
      </div>
    </form>
  );
}
