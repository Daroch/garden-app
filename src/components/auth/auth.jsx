import { Navigate, useNavigate, useLocation } from 'react-router-dom';

export const setToken = token => {
  // set token in localStorage
  localStorage.setItem('gardenAppToken', token);
};

export const fetchToken = token => {
  // fetch the token
  return localStorage.getItem('gardenAppToken');
};



export function RequireToken({ children }) {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to='/' state={{ from: location }} />;
  }

  return children;
}

export default function RequireLogin() {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}
