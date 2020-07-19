import React from 'react'
import { Container } from 'react-bootstrap'
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'
import Aux from '../../hoc/AuxHOC'

export const Layout = (props) => (
    <Aux>
        <NavigationItems />
        <Container>
            {props.children}
        </Container>
    </Aux>
)

export default Layout;