import React, { useState, useEffect } from 'react';
import Button from './Button'; // Make sure this is styled with TailwindCSS

const RegisterModal = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful');
                onClose(); // Close the modal on successful registration and return back to login modal
            } else {
                setRegisterError('Registration failed: ' + data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            setRegisterError('An error occurred during registration');
        }
    };
    useEffect(() => {
        setRegisterError('');
      }, [username, password]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Register</h2>
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
                <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleRegister}>Register</Button>
                <Button className="w-full mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onClose}>Close</Button>
                {registerError && <div className="text-red-500 text-sm mb-2">{registerError}</div>}
            </div>
        </div>
    );
};

export default RegisterModal;
