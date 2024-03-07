import React, {useState} from 'react';
import './styles.css';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function onChangeU(events) {
        console.log(events.target.value);
        setUsername(events.target.value);
        
    }

    function onChangeP(events) {
        setPassword(events.target.value);
        console.log(password);
    }

    function onSubmit() {
        console.log("Submitted");
    }

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    return(
    <div className='container'>
        <div className='innerContainer'>
            <h1 className='heading'> Login </h1>
            <input onChange={onChangeU} className="inputField first" type="text" placeholder="Username" />
            <input onChange={onChangeP} className="inputField" type={showPassword? "text" : "password"} placeholder="Password" />
            <label>
                <input className="showPassword" type="checkbox" onChange={togglePassword} /> Show Password 
            </label>
            <button onClick={onSubmit}>Log In</button>
        </div>
    </div>);
}

export default Login;