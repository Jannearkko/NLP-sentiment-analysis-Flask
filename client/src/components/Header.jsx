import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/AuthSlice';
import Button from './Button';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(logout());
  }

  return (
    <div>
        <header>
        {isAuthenticated ? (
            <div>
            Welcome, {username}!
            <Button color='red' onClick={handleLogout}>Logout</Button>
            </div>
        ) : (
          <p>Sentiment analysis</p>
        )}
        </header>
    </div>
    
  );
};

export default Header;
