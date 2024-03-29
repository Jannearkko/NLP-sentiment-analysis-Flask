import React, { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { useSelector } from 'react-redux';

const AuthenticationModalManager = () => {
    const [modalState, setModalState] = useState('none'); // 'login', 'register', or 'none'
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        // Decide not to show any modals if a token is found or if the user is authenticated
        if (localStorage.getItem('token') || isAuthenticated) {
            setModalState('none');
        } else {
            // Default to showing the login modal if not authenticated and no token is present
            setModalState('login');
        }
    }, [isAuthenticated]);

    return (
        <div>
            {modalState === 'login' && <LoginModal onRegister={() => setModalState('register')} onClose={() => setModalState('none')} />}
            {modalState === 'register' && <RegisterModal onClose={() => setModalState('login')} />}
        </div>
    );
};

export default AuthenticationModalManager;
