import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './register.css';

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    function onChangeU(event) {
        const value = event.target.value;
        setUsername(value);
        setUsernameError(value.length < 5 ? "Username must be at least 5 characters long" : "");
    }

    function onChangeE(event) {
        const value = event.target.value;
        setEmail(value);
        // Simple email validation with regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailRegex.test(value) ? "Invalid email address" : "");
    }

    function onChangeP(event) {
        const value = event.target.value;
        setPassword(value);
        setPasswordError(value.length < 8 ? "Password must be at least 8 characters long" : "");
    }

    function onSubmit() {
        if (username && email && password) {
            console.log("Submitted");
            // You can add your submission logic here
        } else {
            console.log("Please fill out all fields correctly");
        }
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    function navigateToLogin() {
        navigate('/');
    }

    return (
        <div className='registerContainer'>
            <div className='registerInnerContainer'>
                <h1 className='registerHeading'> Register </h1>
                <input className={`inputField first ${usernameError && 'error'}`} type="text" placeholder="Username" value={username} onChange={onChangeU} />
                {usernameError && <div className="errorMessage">{usernameError}</div>}
                <input className={`inputField first ${emailError && 'error'}`} type="text" placeholder="Email" value={email} onChange={onChangeE} />
                {emailError && <div className="errorMessage">{emailError}</div>}
                <input className={`inputField ${passwordError && 'error'}`} type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={onChangeP} />
                {passwordError && <div className="errorMessage">{passwordError}</div>}
                <label>
                    <input className="showPassword" type="checkbox" onChange={togglePasswordVisibility} /> Show Password
                </label>
                <div className='buttonContainer'>
                    <button className="first" onClick={onSubmit}>Create Account</button>
                    <button className="second" onClick={navigateToLogin}>Existing User</button>
                </div>
            </div>
        </div>
    );
}

export default Register;