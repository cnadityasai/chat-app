import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios'

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function onChangeU(event) {
        const value = event.target.value;
        setUsername(value);
        setUsernameError(value.length < 5 ? "Username must be at least 5 characters long" : "");
    }

    function onChangeP(event) {
        setPassword(event.target.value);
    }

    function onSubmit() {
        if (username && password) {
            console.log("Submitted");
            setIsLoading(true);

            const authHeader = 'Basic ' + btoa(username + ':' + password);
            
            axios.post('url/auth/login', null, { // must add the url here
                headers: {
                    Authorization: authHeader
                }
            })
            .then(response => {
                const data = response.data;
                if(data.status === 'error'){
                    setLoginError(data.message);
                }
                else if (data.status === 'ok'){
                    console.log('Token:', data.token);
                    navigate('/chat');
                }
            })
            .catch (error => {
                setLoginError("An error occurred. Please try again later.");
                console.error('Error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            })
        } else {
            console.log("Please fill out all fields correctly");
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