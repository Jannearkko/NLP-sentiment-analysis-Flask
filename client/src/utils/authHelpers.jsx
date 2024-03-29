import { loginSuccess } from "../redux/slices/AuthSlice";

const handleLogin = async ({username, password, dispatch, onClose, setLoginError}) => {

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
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user_id', data.id);
        dispatch(loginSuccess({ user_id: data.id }));
        onClose();
      } else {
        setLoginError('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError('An error occurred during login');
    }
  };
  
  export { handleLogin };