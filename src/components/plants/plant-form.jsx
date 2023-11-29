import { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from 'https://cdn.skypack.dev/axios';
import { fetchToken } from '../auth/login';
import Dropzone from 'react-dropzone';

export default function PlantForm({
  loggedUserId,
  handleSuccessfulFormSubmission,
  handleSuccessfulFormEditSubmission,
  handleUnsuccesfulLogin,
  clearPlantToEdit,
  plantToEdit,
}) {
  const [plantData, setPlantData] = useState({
    name: '',
    description: '',
    category_id: 1,
    irrigation_type: 'muypoca',
    light_type: 'muypoca',
    location: '',
    notes: '',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [plantPublic, setPlantPublic] = useState(true);
  const [formParameters, setFormParameters] = useState({
    editMode: false,
    apiUrl: 'http://localhost:8000/users/' + loggedUserId + '/addplant',
    apiAction: 'post',
  });

  function handleFileDrop(acceptedFiles, rejected) {
    console.log(acceptedFiles);
    setImageFile(acceptedFiles[0]);
    setPlantData({ ...plantData, image_url: acceptedFiles[0].name });
  }

  function handleChange(event) {
    setPlantData({
      ...plantData,
      [event.target.name]: event.target.value,
    });
  }

  function handleChangeCheckbox(event) {
    console.log(event.target.value);
    setPlantPublic(!plantPublic);
  }

  function handleDeleteImage() {
    console.log('handleDeleteImage');
    setImageFile(null);
    setPlantData({ ...plantData, image_url: '' });
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: formParameters.apiAction,
      url: formParameters.apiUrl,
      data: buildForm(),
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + fetchToken(),
      },
    })
      .then(response => {
        // handle success
        console.log(response);
        if (formParameters.editMode) {
          handleSuccessfulFormEditSubmission(response.data);
        } else {
          handleSuccessfulFormSubmission(response.data);
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
        if (error.message.includes('401')) {
          handleUnsuccesfulLogin();
        }
      })
      .finally(function () {
        // always executed
      });
  }

  function buildForm() {
    const formData = new FormData();

    formData.append('name', plantData.name);
    formData.append('category_id', plantData.category_id);
    formData.append('irrigation_type', plantData.irrigation_type);
    formData.append('light_type', plantData.light_type);
    formData.append('description', plantData.description);
    formData.append('public', plantPublic);
    if (imageFile) {
      formData.append('imagefile', imageFile);
    }
    console.log(formData);

    return formData;
  }

  useEffect(() => {
    if (Object.keys(plantToEdit).length > 0) {
      // console.log('editando planta', plantToEdit);
      setPlantData(plantToEdit);
      setPlantPublic(plantToEdit.public);
      clearPlantToEdit();
      setFormParameters({
        editMode: true,
        apiUrl: `http://localhost:8000/users/${loggedUserId}/updateplant/${plantToEdit.id}`,
        apiAction: 'patch',
      });
    }
  }, [plantToEdit, imageFile]);

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
          <option value='2'>Normal</option>
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
          <option value='2'>Normal</option>
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
      <div className='one-column'>
        <input
          type='checkbox'
          name='public'
          checked={plantPublic}
          onChange={handleChangeCheckbox}
        />
      </div>
      <div className='image-uploaders'>
        {formParameters.editMode && plantData.image_url ? (
          <div className='plant-manager-image-wrapper'>
            <img
              src={`http://localhost:8000/images/plants/${plantData.image_url}`}
            />
            <div className='image-removal-link'>
              <a onClick={() => handleDeleteImage('image_url')}>Remove image</a>
            </div>
          </div>
        ) : (
          <Dropzone onDrop={handleFileDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Arrastra tus archivos aquí o haz click</p>
                </div>
              </section>
            )}
          </Dropzone>
        )}
      </div>
      <div>
        <button className='btn' type='submit'>
          Save
        </button>
      </div>
    </form>
  );
}
