import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios';

import Layout from '../../components/Layout/Layout';
import Form from 'react-bootstrap/Form';
import Message from '../../components/Message/Message'

class ListMessage extends Component {
    state = {
        tags: null,
        posts: null,
        token: null
    }

    componentDidMount(){
        const tokenLocalStorage = localStorage.getItem('token');
        this.setState({
            ...this.state,
            token: tokenLocalStorage
        });
    }


    onInputChangeHandler = (event, target) => {
        this.setState({
            ...this.state,
            [target]: event.target.value
        });

        axios.post('http://localhost:5000/messages/search', {
            tags: event.target.value
        }).then(response => {
            this.setState({
                ...this.state,
                posts: response.data
            })
        });
    }

    render(){
        let messages = null
        const posts = this.state.posts;

        if(posts) {
            messages = (
                posts.map(post => (
                    <Message author={post.author} tags={post.tags.join(' ')} message={post.message} />
                ))
            );
        };

        
        let auth = <Redirect to="/" />;

        const tokenLocalStorage = localStorage.getItem('token');

        if(tokenLocalStorage !== null){
            auth = (
            <Form>
                <Form.Control className="m-3" type="tags" placeholder="Search using tags!" onChange={ (event) => this.onInputChangeHandler(event, "tags") } />
                {messages}
            </Form>)
        }

        return (
            <Layout>
                {auth}
            </Layout>
        );
    }
}

export default ListMessage;