import React, { useState, useRef, useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import './css/UserView.css';

const UserView = ({ onLogout }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [queries, setQueries] = useState([]);
    const menuRef = useRef();
    const toggleRef = useRef();
    const firstname = localStorage.getItem('firstname');
    const lastname = localStorage.getItem('lastname');
    const username = localStorage.getItem('username');

    const toggleMenu = () => setShowMenu(!showMenu);

    const fetchQueries = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/getQueries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });
            const data = await response.json();
            if (response.ok) {
                setQueries(data.queries);
            } else {
                setQueries("Your saved queries will appear here");
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchQueries();
    }, []);
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                toggleRef.current && !toggleRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
          {/* Toggle area */}
          <div ref={toggleRef} onClick={toggleMenu} className="cursor-pointer rounded hover:bg-gray-200 h-12 flex items-center justify-start pl-5">
            <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {/* Assuming `firstname` and `lastname` are fetched similarly */}
                {firstname[0]}{lastname[0]}
            </div>
            <h1 className='text-left ml-2'>{firstname} {lastname}</h1>
          </div>
    
          {/* Menu */}
          {showMenu && (
            <div ref={menuRef} className="bg-gray-300 shadow-md rounded ml-5 mt-2 p-4 w-3/4 text-left">
              <ul>
                <li className="p-2 hover:bg-blue-100 cursor-pointer rounded transition-colors duration-150" onClick={() => console.log('Settings clicked')}>
                  <SettingsIcon className='mr-2' />
                  Settings
                </li>
                <li className="p-2 hover:bg-red-100 cursor-pointer rounded transition-colors duration-150 mt-2" onClick={onLogout}>
                  <LogoutIcon className='mr-2'/>
                  Logout
                </li>
              </ul>
            </div>
          )}

          {/* Queries Section */}
          {queries && Array.isArray(queries) && queries.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Your Queries</h2>
              <ul>
                {queries.map((query) => (
                  <li key={query.id} className="pt-1.5 hover:bg-gray-500 rounded transition-colors duration-150 text-left ml-3 fade-out">
                    {query.text} {/* Render each query text */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
    );
};

export default UserView;