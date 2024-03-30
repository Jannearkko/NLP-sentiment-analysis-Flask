import React, { useEffect } from 'react';
import RegisterModal from './RegisterModal';
import { useSelector, useDispatch } from 'react-redux';
import { setModalState } from '../redux/slices/AuthSlice';

const AuthenticationModalManager = () => {
    const modalState = useSelector((state) => state.auth.modalState); // 'login', 'register', or 'none'
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLimitReached = useSelector((state) => state.auth.isLimitReached);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token') || isAuthenticated) {
            dispatch(setModalState('none'));
        } else if (isLimitReached) {
            dispatch(setModalState('login'));
        }
    }, [isAuthenticated, isLimitReached, dispatch]);

    return (
        <div>
            {modalState === 'register' && <RegisterModal onClose={() => dispatch(setModalState('none'))} />}
        </div>
    );
};

export default AuthenticationModalManager;
