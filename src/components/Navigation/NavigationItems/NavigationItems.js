import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem'
import Navbar from 'react-bootstrap/Navbar'
import NavbarBrand from 'react-bootstrap/NavbarBrand'
import Nav from 'react-bootstrap/Nav'

export const NavigationItems = (props) => {
    const token = localStorage.getItem('token');
    let authNav = <NavigationItem link="/">Login</NavigationItem>;
    if(token !== null) {
        authNav = <NavigationItem link="/logout">Logout</NavigationItem>
    }
    return (
        <Navbar variant="dark" bg="primary" expand="lg">
            <NavbarBrand>Message Viewer</NavbarBrand>
            <Nav className="mr-auto">
                {authNav}
                <NavigationItem link="/postmessage">Post Message</NavigationItem>
                <NavigationItem link="/listmessage">Search Message</NavigationItem>
            </Nav>
        </Navbar>
    )
}

export default NavigationItems;