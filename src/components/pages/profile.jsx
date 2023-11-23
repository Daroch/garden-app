import axios from 'https://cdn.skypack.dev/axios';
import { fetchToken } from '../auth/auth';

function GetUserId() {
  axios({
    method: 'get',
    url: 'http://localhost:8000/users/me',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + fetchToken(),
    },
  })
    .then(response => {
      // handle success
      console.log(response);
      let id = response.data;
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
  return id;
}
export default function Profile(props) {
  return (
    <div>
      <h1>Bienvenido {props.loginData.username}</h1>
    </div>
  );
}
