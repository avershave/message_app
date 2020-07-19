import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/AuxHOC'
import axios from 'axios';

import Layout from '../../components/Layout/Layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class PostMessage extends Component {
    state = {
        author: "",
        message: "",
        tags: "",
        messageSuccess: ""
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId');        
        this.setState({
            ...this.state,
            author: userId
        })
    }

    onChangeInputFieldHandler = (event, target) => {
        this.setState({
            ...this.state,
            [target]: event.target.value
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/messages/add',{
            username: this.state.author,
            message: this.state.message,
            tags: this.state.tags
        }).then(response => {
            this.setState({
                ...this.state,
                messageSuccess: response.data
            })
        }).catch(err => {
            console.log(err);
        });

        this.setState({
            ...this.state,
            message: "",
            tags: ""
        })
    }

    render() {
        let message = null;

        if(this.state.messageSuccess) {
            message = (
            <p>{this.state.messageSuccess}</p>
            )
        }        

        let auth = <Redirect to="/" />;

        const tokenLocalStorage = localStorage.getItem('token');
     
        if(tokenLocalStorage !== null){
            auth = (
                <Aux>
                    <h1>Welcome!</h1>
                    <Form.Group className="p-3">
                        <Form.Label className="p-3"><h3>Post Message</h3></Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.state.message} onChange={ (event) => this.onChangeInputFieldHandler(event, "message")}  />
                        <Form.Label className="p-3" ></Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.state.tags} onChange={ (event) => this.onChangeInputFieldHandler(event, "tags")}  />
                        <Button className="m-3" variant="primary" size="lg" onClick={this.submitHandler}>Post</Button>
                        {message}
                    </Form.Group>
                </Aux>)
        }

        return (
            <Layout>
                {auth}
            </Layout>
        );
    }
}

export default PostMessage;