import { useState } from 'react';
//import axios from 'axios';
import axios from 'https://cdn.skypack.dev/axios';

export default function PlantForm() {
  const [plantData, setPlantData] = useState({
    name: '',
    category: '1',
    irrigation_type: '1',
    light_type: '1',
    description: '',
  });

  const handleChange = event => {
    setPlantData({
      ...plantData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:8000/users/1/plants')
      .then(response => {
        // handle success
        console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

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
          name='category'
          placeholder='Categoría'
          value={plantData.category}
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
