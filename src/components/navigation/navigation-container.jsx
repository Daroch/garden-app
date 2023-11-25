//import axios from 'axios';
//import { withRouter } from 'react-router';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NavigationContainer(props) {
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
            to='/'
            className={({ isActive }) => (isActive ? 'nav-link-active' : ' ')}
          >
            Home
          </NavLink>
        </div>
        {props.loggedInStatus === 'LOGGED_IN'
          ? dinamycLink('/plants', 'My Plants')
          : null}
        {props.loggedInStatus === 'LOGGED_IN'
          ? dinamycLink('/alerts', 'Alerts')
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
        {props.loggedInStatus === 'LOGGED_IN'
          ? dinamycLink('/profile', 'Profile')
          : null}
        {props.loggedInStatus === 'LOGGED_IN' ? (
          <button className='btn' onClick={props.handleUnsuccesfulLogin}>
            Logout
          </button>
        ) : null}
        {props.loggedInStatus !== 'LOGGED_IN'
          ? dinamycLink('/login', 'Login')
          : null}
      </div>
    </div>
  );
}
