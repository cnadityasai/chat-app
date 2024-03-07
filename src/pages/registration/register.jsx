import React, {useState} from 'react';
import './styles.css';

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function onChangeU(events) {
        setUsername(events.target.value);
    }

    function onChangeP(events) {
        setPassword(events.target.value);
    }

    function onSubmit() {
        console.log("Submitted");
    }

    return(
        <div className='container'>
        <div className='innerContainer'>
            <h1 className='heading'> Register </h1>
            <input className="inputField first" type="text" placeholder="Username" />
            <input className="inputField first" type="text" placeholder="Email" />
            <input className="inputField" type={showPassword? "text" : "password"} placeholder="Password" />
            <label>
                <input className="showPassword" type="checkbox"  /> Show Password 
            </label>
            <div className='buttonContainer'>
                <button onClick={onSubmit}>Create Account</button>
                <button onClick={onSubmit}>Log In</button>
            </div>
        </div>
    </div>
    );
}

export default Register;