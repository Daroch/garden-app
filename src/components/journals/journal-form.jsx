import { useEffect, useState } from 'react';
import axios from 'https://cdn.skypack.dev/axios';
import Dropzone from 'react-dropzone';

import { fetchToken } from '../auth/login';

export default function JournalForm({
  loggedUserId,
  handleSuccessfulFormJournalSubmission,
  handleSuccessfulFormJournalEditSubmission,
  clearJournalToEdit,
  journalToEdit,
  plants,
  setErrorText,
  closeModalJournal,
}) {
  const [errorFormText, setErrorFormText] = useState('');
  const [isErrorFormVisible, setIsErrorFormVisible] = useState(false);
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;
  const [journalData, setJournalData] = useState({
    title: '',
    description: '',
    plant_id: '',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [formParameters, setFormParameters] = useState({
    editMode: false,
    apiUrl: `${FASTAPI_URL}/users/${loggedUserId}/plants/${journalData.plant_id}/addjournal`,
    apiAction: 'post',
  });

  function handleFileDrop(acceptedFiles, rejected) {
    console.log(acceptedFiles);
    setImageFile(acceptedFiles[0]);
    setJournalData({ ...journalData, image_url: acceptedFiles[0].name });
  }

  function handleDeleteImage() {
    console.log('handleDeleteImage');
    setImageFile(null);
    setJournalData({ ...journalData, image_url: '' });
  }

  function handlePlantChange(event) {
    setJournalData({
      ...journalData,
      [event.target.name]: event.target.value,
    });
    if (formParameters.editMode) {
      setFormParameters({
        ...formParameters,
        apiUrl: `${FASTAPI_URL}/users/${loggedUserId}/plants/${event.target.value}/updatejournal/${journalData.id}`,
        apiAction: 'patch',
      });
    } else {
      setFormParameters({
        ...formParameters,
        apiUrl: `${FASTAPI_URL}/users/${loggedUserId}/plants/${event.target.value}/addjournal/`,
        apiAction: 'post',
      });
    }
  }

  function handleChange(event) {
    setJournalData({
      ...journalData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (journalData.plant_id === '') {
      setErrorFormText('Debes seleccionar una planta');
      setIsErrorFormVisible(true);

      setTimeout(() => {
        setIsErrorFormVisible(false);
      }, 3000);
      return;
    }
    if (journalData.title === '') {
      setErrorFormText('Debes escribir un  título');
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
          handleSuccessfulFormJournalEditSubmission(response.data);
        } else {
          handleSuccessfulFormJournalSubmission(response.data);
        }
      })
      .catch(error => {
        // handle error
        console.log('Error submitting journal', error);
        closeModalJournal();
        setErrorText('Error submitting alert. ' + error.response.data.detail);
      })
      .finally(function () {
        // always executed
      });
  }

  function buildForm() {
    const formData = new FormData();

    formData.append('title', journalData.title);
    formData.append('description', journalData.description);
    formData.append('image_url', journalData.image_url);
    if (imageFile) {
      formData.append('imagefile', imageFile);
    }
    console.log(formData);

    return formData;
  }

  useEffect(() => {
    if (Object.keys(journalToEdit).length > 0) {
      setJournalData(journalToEdit);
      setFormParameters({
        editMode: true,
        apiUrl: `${FASTAPI_URL}/users/${loggedUserId}/plants/${journalToEdit.plant_id}/updatejournal/${journalToEdit.id}`,
        apiAction: 'patch',
      });
      clearJournalToEdit();
    }
  }, [journalToEdit, imageFile]);

  return (
    <form onSubmit={handleSubmit} className='plant-form-wrapper'>
      <div className='four-column'>
        Titulo
        <input
          type='text'
          name='title'
          id='title'
          placeholder='Journal title'
          value={journalData.title}
          onChange={handleChange}
        />
        Planta asociada:
        <select
          name='plant_id'
          placeholder='Planta'
          value={journalData.plant_id}
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
      <div className='one-column'>
        <input
          type='text'
          name='description'
          id='description'
          placeholder='Journal description'
          value={journalData.description}
          onChange={handleChange}
        />
      </div>
      <div className='image-uploaders'>
        {formParameters.editMode && journalData.image_url ? (
          <div className='plant-manager-image-wrapper'>
            <img
              src={`${FASTAPI_URL}/images/plants/${loggedUserId}/${journalData.plant_id}/${journalData.id}/${journalData.image_url}`}
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
      <div></div>
      <button className='btn' type='submit'>
        Submit
      </button>
      {isErrorFormVisible && (
        <div className='message-container'>
          <div className='error-inner'>{errorFormText}</div>
        </div>
      )}
    </form>
  );
}
