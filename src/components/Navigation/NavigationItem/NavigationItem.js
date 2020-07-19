import React from 'react';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';


export const NavigationItem = (props) => {
    return (
        <NavItem>
            <NavLink href={props.link} eventKey={props.key}>{props.children}</NavLink>
        </NavItem>
    );
}

export default NavigationItem;