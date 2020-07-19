import React from 'react'
import { Redirect } from 'react-router-dom';

export const Logout = (props) => {
    localStorage.clear();
    return (
        <Redirect to="/" />
    );
}

export default Logout;