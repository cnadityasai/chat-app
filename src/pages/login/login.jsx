import React from 'react';
import './styles.css';

function Login() {
    return(
    <div className='container'>
        <div className='innerContainer'>
            <h1 className='heading'> Login </h1>
            <input className="inputField" type="text" placeholder="Username" />
            <input className="inputField" type="password" placeholder="Password" />
        </div>
    </div>);
}

export default Login;