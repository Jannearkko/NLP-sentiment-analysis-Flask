import React, { useState, useEffect } from 'react';
import Button from './Button';
import LogoContainer from './LogoContainer';

const RegisterModal = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [registerError, setRegisterError] = useState('');
    const registerUrl = process.env.REACT_APP_NLP_API_REGISTER;

    const handleRegister = async () => {
        try {
            const response = await fetch(registerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, firstname, lastname }),
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
                <LogoContainer />
                <h2 className="text-xl font-semibold mb-4 text-left mt-4 text-black">Create your account</h2>
                <input
                    className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                    type="text"
                    placeholder="Email Address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                    type="text"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <input
                    className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <input
                    className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline" color='green' onClick={handleRegister}>Sign up</Button>
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline" color='grey' onClick={onClose}>Close</Button>
                {registerError && <div className="text-red-500 text-sm mb-2">{registerError}</div>}
            </div>
        </div>
    );
};

export default RegisterModal;

