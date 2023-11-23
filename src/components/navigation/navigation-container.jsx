//import axios from 'axios';
//import { withRouter } from 'react-router';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink } from 'react-router-dom';

const NavigationContainer = () => {
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
        <div className='nav-link-wrapper'>
          <NavLink
            to='/plants'
            className={({ isActive }) => (isActive ? 'nav-link-active' : ' ')}
          >
            My Plants
          </NavLink>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink
            to='/alerts'
            className={({ isActive }) => (isActive ? 'nav-link-active' : ' ')}
          >
            Alerts
          </NavLink>
        </div>
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
        <div>Daroch</div>
        <div className='nav-link-wrapper'>
          <NavLink
            to='/login'
            className={({ isActive }) => (isActive ? 'nav-link-active' : ' ')}
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default NavigationContainer;
