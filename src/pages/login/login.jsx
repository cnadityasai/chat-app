import React, {useState} from 'react';
import './styles.css';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState("");

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
            // You can add your submission logic here
        } else {
            console.log("Please fill out all fields correctly");
        }
    }

    function togglePassword() {
        setShowPassword(!showPassword);
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
                    <button onClick={onSubmit}>Create Account</button>
                    <button onClick={onSubmit}>Log In</button>
                </div>
            </div>
        </div>
    );
}

export default Login;