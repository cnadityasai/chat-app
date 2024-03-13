import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './register.css';

function Register() {

    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [registerError, setRegisterError] = useState("");
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

    async function onSubmit() {
        if (name && email && pass) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/auth/register', {
                    username: name,
                    password: pass
                });
                const data = response.data;
                console.log(data)
                if (data.status === 'ok') {
                    console.log("Registration successful");
                    // You can perform additional actions here if needed
                    navigate('/');
                } else {
                    setRegisterError(data.message || "Registration Failed");
                }                
            } catch (error) {
                if(error.response && error.response.status == 409) {
                    setRegisterError("User already exists");
                }
                else {
                    console.error("Error registering users", error);
                    setRegisterError("An error occured while registering. Please try again.");
                }  
            }
        } else {
            console.log("Please fill out all fields correctly");
            setRegisterError("Please fill out all fields correctly");
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
                <input className={`inputField first ${usernameError && 'error'}`} type="text" placeholder="Username" value={name} onChange={onChangeU} />
                {usernameError && <div className="errorMessage">{usernameError}</div>}
                <input className={`inputField first ${emailError && 'error'}`} type="text" placeholder="Email" value={email} onChange={onChangeE} />
                {emailError && <div className="errorMessage">{emailError}</div>}
                <input className={`inputField ${passwordError && 'error'}`} type={showPassword ? "text" : "password"} placeholder="Password" value={pass} onChange={onChangeP} />
                {passwordError && <div className="errorMessage">{passwordError}</div>}
                <label>
                    <input className="showPassword" type="checkbox" onChange={togglePasswordVisibility} /> Show Password
                </label>
                <div className='buttonContainer'>
                    <button className="first" onClick={onSubmit}>Create Account</button>
                    <button className="second" onClick={navigateToLogin}>Existing User</button>
                </div>
                {registerError && <div className="errorMessage">{registerError}</div>}
            </div>
        </div>
    );
}

export default Register;