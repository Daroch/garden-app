import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function NavigationContainer({
  loggedInStatus,
  handleUnsuccesfulLogin,
  setHomeIsOpen,
}) {
  const navigate = useNavigate();
  function dinamycLink(route, Linktext) {
    return (
      <div className='nav-link-wrapper'>
        <NavLink
          to={route}
          className={({ isActive }) => (isActive ? 'nav-link-active' : ' ')}
        >
          {Linktext}
        </NavLink>
      </div>
    );
  }

  return (
    <div className='nav-wrapper'>
      <div className='left-side'>
        <div className='nav-link-wrapper'>
          <NavLink
            onClick={() => setHomeIsOpen(true)}
            to='/'
            className={({ isActive }) => (isActive ? 'nav-link-active' : ' ')}
          >
            Home
          </NavLink>
        </div>
        {loggedInStatus === 'LOGGED_IN'
          ? dinamycLink('/plants', 'My Plants')
          : null}
        {loggedInStatus === 'LOGGED_IN'
          ? dinamycLink('/alerts', 'Alerts')
          : null}
        {loggedInStatus === 'LOGGED_IN'
          ? dinamycLink('/journals', 'Journals')
          : null}

        <div className='nav-link-wrapper'>
          <NavLink
            to='/explore'
            className={({ isActive }) => (isActive ? 'nav-link-active' : ' ')}
          >
            Explore
          </NavLink>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink
            to='/icons'
            className={({ isActive }) => (isActive ? 'nav-link-active' : ' ')}
          >
            Test Icons
          </NavLink>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink
            to='/about'
            className={({ isActive }) => (isActive ? 'nav-link-active' : ' ')}
          >
            About
          </NavLink>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink
            to='/contact'
            className={({ isActive }) => (isActive ? 'nav-link-active' : ' ')}
          >
            Contact
          </NavLink>
        </div>
      </div>
      <div className='right-side'>
        {loggedInStatus === 'LOGGED_IN' ? (
          <a
            title='Logout'
            className='icon-sign-out'
            onClick={() => handleUnsuccesfulLogin()}
          >
            <FontAwesomeIcon icon='fa-solid fa-sign-out' />
          </a>
        ) : null}
        {loggedInStatus !== 'LOGGED_IN' ? (
          <a
            title='Login'
            className='icon-login'
            onClick={() => navigate('/login')}
          >
            <FontAwesomeIcon icon='fa-solid fa-user' />
          </a>
        ) : null}
      </div>
    </div>
  );
}
