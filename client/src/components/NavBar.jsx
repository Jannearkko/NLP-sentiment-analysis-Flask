import React from 'react';
import { useDispatch } from 'react-redux';
import { setShowLoginModal, setShowRegisterModal } from '../redux/slices/AuthSlice';
import Button from './Button';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleShowLogin = () => {
    dispatch(setShowLoginModal(true));
  };

  const handleShowRegister = () => {
    dispatch(setShowRegisterModal(true));
  }

  return (
    <nav>
      {/* Other navbar content */}
      <Button onClick={handleShowLogin}>Login</Button>
      <Button onClick={handleShowRegister}>Register</Button>
    </nav>
  );
};

export default Navbar;
