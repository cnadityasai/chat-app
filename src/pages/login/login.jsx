import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import { ChatState } from '../../Context/ChatProvider';
import { useAuth } from '../../Context/AuthContext';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const {user, setUser} = ChatState();

    function onChangeU(event) {
        const value = event.target.value;
        setUsername(value);
        setUsernameError(value.length < 5 ? "Username must be at least 5 characters long" : "");
    }

    function onChangeP(event) {
        setPassword(event.target.value);
    }

    async function onSubmit() {
        if (username && password) {
            console.log("Submitted");
            setIsLoading(true);

            const authHeader = 'Basic ' + btoa(username + ':' + password);
            
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/auth/login', null, {
                    headers: {
                        Authorization: authHeader
                    }
                });
                const data = response.data;
                console.log(data);
                if(data.status === 'error'){
                    setLoginError(data.message);
                }
                else if (data.status === 'ok') {
                    const token = data.token;
                    const profileResponse = await axios.get('http://127.0.0.1:5000/api/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const profileData = profileResponse.data;
                    if(profileData.status === 'ok' && profileData.user) {
                        setUser(profileData.user);
                       // console.log(user); to check the logged user
                        setIsLoggedIn(true);
                        navigate('/chat');
                    } else {
                        setLoginError("Invalid response from server");
                    }
                }
            } catch(error) {
                if (error.response && error.response.status === 401) {
                    setLoginError("Invalid username or password");
                } else {
                    setLoginError("An error occurred while logging in. Please try again.");
                }
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setLoginError("Please fill out all field correctly");
        }
    }

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    function navigateToRegistration() {
        navigate('/registration');
    }

    return (
        <div className='container'>
            <div className='innerContainer'>
                <h1 className='heading'> Login </h1>
                <input onChange={onChangeU} className={`inputField first ${usernameError && 'error'}`} type="text" placeholder="Username" />
                {usernameError && <div className="errorMessage">{usernameError}</div>}
                <input onChange={onChangeP} className="inputField" type={showPassword ? "text" : "password"} placeholder="Password" />
                <label>
                    <input className="showPassword" type="checkbox" onChange={togglePassword} /> Show Password
                </label>
                <div className='buttonContainer'>
                    <button onClick={navigateToRegistration}>Register</button>
                    <button onClick={onSubmit} disabled={isLoading}>{isLoading ? 'Logging in...' : 'Log In'} </button>
                </div>
                {loginError && <div className="errorMessage">{loginError}</div>}
            </div>
        </div>
    );
}

export default Login;