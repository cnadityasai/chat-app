import React from 'react';

function MessageBox(props){

    const {name, message, currentUser} = props;
    const fromCurrentUser = name === currentUser;
    const className = `box ${fromCurrentUser ? 'fromCurrentUser' : ''}`; 
    const heading = `${fromCurrentUser? 'boxHeading' : ''}`;

    return (
        <div className={className}>
            <div className={heading}>
                <p>{name}</p>
            </div>
            <div className='messageBox'>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default MessageBox;