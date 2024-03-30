import React, { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { useSelector } from 'react-redux';

const AuthenticationModalManager = () => {
    const [modalState, setModalState] = useState('none'); // 'login', 'register', or 'none'
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLimitReached = useSelector((state) => state.auth.isLimitReached);

    useEffect(() => {
        if (localStorage.getItem('token') || isAuthenticated) {
            setModalState('none');
        } else if (isLimitReached) {
            setModalState('login');
        }
    }, [isAuthenticated, isLimitReached]);

    return (
        <div>
            {modalState === 'login' && <LoginModal onRegister={() => setModalState('register')} onClose={() => setModalState('none')} />}
            {modalState === 'register' && <RegisterModal onClose={() => setModalState('login')} />}
        </div>
    );
};

export default AuthenticationModalManager;
