import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from 'axios';


class Auth extends Component {
    state = {
        username: "",
        password: ""
    }

    onChangeInputFieldHandler = (event, target) => {
        this.setState({
            ...this.state,
            [target]: event.target.value
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/users/login',{
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('Expiration', response.data.Expiration);
            this.props.history.push('/postmessage');
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return(
            <Layout>
                <Jumbotron>
                    <h1>Login</h1>
                    <Form className="p-3">
                        <Form.Group controlId="formBasicUsername">
                            <Form.Control type="username" placeholder="Enter Username" onChange={ (event) => this.onChangeInputFieldHandler(event, "username")}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Enter Password" onChange={ (event) => this.onChangeInputFieldHandler(event, "password")}></Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={this.submitHandler}>Submit</Button>
                    </Form>
                </Jumbotron>
            </Layout>
        );
    }
}

export default Auth;