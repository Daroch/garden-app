//import axios from 'axios';
//import { withRouter } from 'react-router';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink } from 'react-router-dom';

const NavigationContainer = () => {
  return (
    <div className='nav-wrapper'>
      <div className='left-side'>
        <div className='nav-link-wrapper'>
          <NavLink exact to='/' activeClassName='nav-link-active'>
            Home
          </NavLink>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink to='/plants' activeClassName='nav-link-active'>
            My Plants
          </NavLink>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink to='/alerts' activeClassName='nav-link-active'>
            Alerts
          </NavLink>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink to='/explore' activeClassName='nav-link-active'>
            Explore
          </NavLink>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink to='/about' activeClassName='nav-link-active'>
            About
          </NavLink>
        </div>
        <div className='nav-link-wrapper'>
          <NavLink to='/contact' activeClassName='nav-link-active'>
            Contact
          </NavLink>
        </div>
      </div>
      <div className='right-side'>
        <div>Daroch</div>
        <div className='nav-link-wrapper'>
          <NavLink to='/login' activeClassName='nav-link-active'>
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default NavigationContainer;
