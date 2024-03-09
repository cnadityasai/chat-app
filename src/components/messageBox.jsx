import React from 'react';

function MessageBox(props){
    return (
        <div className='box'>
            <div className='boxHeading'>
                <p>{props.name}</p>
            </div>
            <div className='messageBox'>
                <p>{props.message}</p>
            </div>
        </div>
    )
}

export default MessageBox;