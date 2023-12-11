import { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from 'https://cdn.skypack.dev/axios';
import { fetchToken } from '../auth/login';
import { useDropzone } from 'react-dropzone';

export default function PlantForm({
  loggedUserId,
  handleSuccessfulFormSubmission,
  handleSuccessfulFormEditSubmission,
  clearPlantToEdit,
  clearPlantToClone,
  plantToEdit,
  plantToClone,
  categories,
  setErrorText,
  closeModal,
}) {
  const [errorFormText, setErrorFormText] = useState('');
  const [isErrorFormVisible, setIsErrorFormVisible] = useState(false);
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const [plantData, setPlantData] = useState({
    name: '',
    description: '',
    category_id: '',
    irrigation_type: 'level3',
    light_type: 'level3',
    location: '',
    notes: '',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [plantPublic, setPlantPublic] = useState(true);
  const [formParameters, setFormParameters] = useState({
    editMode: false,
    apiUrl: `${FASTAPI_URL}/users/${loggedUserId}/addplant`,
    apiAction: 'post',
  });

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      setImageFile(acceptedFiles[0]);
      setPlantData({ ...plantData, image_url: acceptedFiles[0].name });
    }
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  function handleChange(event) {
    setPlantData({
      ...plantData,
      [event.target.name]: event.target.value,
    });
  }

  function handlePublicChange(event) {
    console.log(event.target.value);
    setPlantPublic(!plantPublic);
  }

  function handleDeleteImage() {
    console.log('handleDeleteImage');
    setImageFile(null);
    setFiles([]);
    setPlantData({ ...plantData, image_url: '' });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (plantData.name === '') {
      setErrorFormText('Debes escribir un nombre');
      setIsErrorFormVisible(true);

      setTimeout(() => {
        setIsErrorFormVisible(false);
      }, 3000);
      return;
    }
    if (plantData.category_id === '') {
      setErrorFormText('Debes seleccionar una categoría');
      setIsErrorFormVisible(true);

      setTimeout(() => {
        setIsErrorFormVisible(false);
      }, 3000);
      return;
    }
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
        closeModal();
        setErrorText('Error submitting plant. ' + error.response.data.detail);
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
    formData.append('plant_public', plantPublic);
    formData.append('image_url', plantData.image_url);
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
      setPlantPublic(plantToEdit.plant_public);
      clearPlantToEdit();
      setFormParameters({
        editMode: true,
        apiUrl: `${FASTAPI_URL}/users/${loggedUserId}/updateplant/${plantToEdit.id}`,
        apiAction: 'patch',
      });
    }
    if (Object.keys(plantToClone).length > 0) {
      // console.log('editando planta', plantToEdit);
      setPlantData(plantToClone);
      setPlantPublic(plantToClone.plant_public);
      clearPlantToClone();
    }
  }, [plantToEdit, plantToClone, imageFile]);

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
          <option value=''>Select a Category</option>
          {categories.map(category => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className='two-column'>
        <div className='one-column'>Necesidad agua:<select
          name='irrigation_type'
          placeholder='Riego'
          value={plantData.irrigation_type}
          onChange={handleChange}
          className='select-element'
        >
          <option value='level1'>Muy poca</option>
          <option value='level2'>Poca</option>
          <option value='level3'>Normal</option>
          <option value='level4'>Bastante</option>
          <option value='level5'>Mucha</option>
        </select>
        </div>
        <div className='one-column'>Necesidad luz:<select
          name='light_type'
          placeholder='Luz'
          value={plantData.light_type}
          onChange={handleChange}
          className='select-element'
        >
          <option value='level1'>Muy poca</option>
          <option value='level2'>Poca</option>
          <option value='level3'>Normal</option>
          <option value='level4'>Bastante</option>
          <option value='level5'>Mucha</option>
        </select>
        </div>
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
      <div className='two-column'>
        <div>Pública:</div>
        <input
          type='checkbox'
          name='plant_public'
          checked={plantPublic}
          onChange={handlePublicChange}
        />
      </div>
      <div className='image-uploaders'>
        {plantData.image_url ? (
          <div className='plant-manager-image-wrapper'>
            {files[0] ? (<img
              src={files[0].preview}
              onLoad={() => { URL.revokeObjectURL(files[0].preview) }}
            />) : (<img
              src={`${FASTAPI_URL}/images/plants/${loggedUserId}/${plantData.id}/${plantData.image_url}`}
            />)}

            <div className='image-removal-link'>
              <a onClick={() => handleDeleteImage('image_url')}>Remove image</a>
            </div>
          </div>
        ) : (
          <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drag and  drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </div>
      <div>
        <button className='btn' type='submit'>
          Save
        </button>
      </div>
      {
        isErrorFormVisible && (
          <div className='message-container'>
            <div className='error-inner'>{errorFormText}</div>
          </div>
        )
      }
    </form >
  );
}
