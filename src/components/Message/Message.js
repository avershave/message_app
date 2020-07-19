import React from 'react'
import { Jumbotron } from 'react-bootstrap';

const Message = (props) => {
    return (
        <Jumbotron>
            <h1>{props.message}</h1>
            <p>{props.author}</p>
            <p>{props.tags}</p>
        </Jumbotron>
    );
}


export default Message;