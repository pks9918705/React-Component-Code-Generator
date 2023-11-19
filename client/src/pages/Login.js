// ... (imports)

import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
import axios from "axios";
import './Login.css'

const Login = () => {
  const { loginUser  } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


    
  useEffect(() => {
    if (localStorage.getItem('userName') && localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8000/login',
        { username, password }
      );
      const { userName, token } = response.data;

      loginUser({ username: userName, token });
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button id="login-btn" onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <h3 onClick={handleRegister}>Have Not Registered ?</h3>
    </div>
  );
};

export default Login;
