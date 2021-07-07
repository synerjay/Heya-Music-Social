import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const guestLinks = (
  <ul className='font-bold'>
    <li>
      <Link to='/profiles'>Members</Link>
    </li>
    <li>
      <Link to='/register'>Register</Link>
    </li>
    <li>
      <Link to='/login'>Login</Link>
    </li>
  </ul>
);

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1 className='text-xl font-bold'>
        <Link to='/'>
          <i className='fas fa-code'></i> heya music social
        </Link>
      </h1>
      <Fragment>{guestLinks}</Fragment>
    </nav>
  );
};

export default Navbar;
