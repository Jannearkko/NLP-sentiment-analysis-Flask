import React, { useState, useEffect } from "react";
import Button from "./Button";
import { loginSuccess } from "../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";

const LoginModal = ({ onClose, onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const dispatch = useDispatch()

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('username', data.username)
                dispatch(loginSuccess({ username:data.username }))
                onClose();
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
        // Modal backdrop
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm z-50 flex justify-center items-center">
            {/* Modal content */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Login</h2>
                <input
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="w-full" color="green" onClick={handleLogin}>Login</Button>
                <Button className="w-full" color="blue" onClick={onRegister}>Register</Button>
                <Button className="w-full" color="gray" onClick={onClose}>Close</Button>
                {loginError && <div className="text-red-500 text-sm mb-2">{loginError}</div>}
            </div>

        </div>
    );
}

export default LoginModal;
