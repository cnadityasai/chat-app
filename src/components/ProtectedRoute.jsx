import React from 'react';
import {Route, useNavigate} from 'react-router-dom';
import {useAuth} from '../Context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest}) => {
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();

    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? <Component {...props} /> : navigate('/')
        }
    />
    );
};

export default ProtectedRoute;
