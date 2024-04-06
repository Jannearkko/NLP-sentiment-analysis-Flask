import React, { useState, useEffect } from "react";
import Button from "./Button";
import { loginSuccess, setModalState } from "../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const dispatch = useDispatch();
    const loginUrl = process.env.REACT_APP_NLP_API_LOGIN;

    const handleOpenRegisterModal = () => {
        dispatch(setModalState('register'));
    };

    const handleLogin = async () => {
        try {

            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('firstname', data.firstname);
                localStorage.setItem('lastname', data.lastname);
                dispatch(loginSuccess({ 
                    username: data.username,
                    firstname: data.firstname,
                    lastname: data.lastname
                 }));
            } else {
                setLoginError('Login failed: ' + data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginError('An error occurred during login');
        }
    };

    useEffect(() => {
        setLoginError('');
    }, [username, password]);

    return (
        <div className="w-full max-w-xs mx-auto pt-8">
            <h2 className="text-xl font-semibold mb-4 text-left">Log in to your account</h2>
            <input
                className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                type="text"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="w-full" color="green" onClick={handleLogin}>Login</Button>
            <div className="flex items-center justify-center gap-0 mb-2">
                <span className="flex-1 h-px bg-gray-300"></span>
                <span className="px-2 text-gray-300 text-sm">Don't have an account?</span>
                <span className="flex-1 h-px bg-gray-300"></span>
            </div>
            <Button className="w-full" color="blue" onClick={handleOpenRegisterModal}>Sign up</Button>
            {loginError && <div className="text-red-500 text-sm mt-2">{loginError}</div>}
        </div>
    );
}

export default Login;
