import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setModalState } from '../redux/slices/AuthSlice';
import Button from './Button';
import Login from './Login';
import LogoContainer from './LogoContainer';
import UserView from './UserView';

const SideBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    dispatch(logout());
  };

  return (
    <div>

        <header>
        <div className='ml-2 mt-5'>
          <LogoContainer />
        </div>
        {isAuthenticated ? (
            <UserView onLogout={handleLogout} />
        ) : (
          <div>

            <Login />

          </div>

        )}
        </header>
    </div>
    
  );
};

export default SideBar;
