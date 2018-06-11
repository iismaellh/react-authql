import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import AuthForm from "./AuthForm";
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        }
    }
    onLogin({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query: query }]
        }).catch(res => { 
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors: errors });
        });
    }

    render() {
        return (
            <div className="container">
                <h3>Login</h3>
                <AuthForm 
                    onSubmit={this.onLogin.bind(this)} 
                    errors={this.state.errors} 
                />
            </div>
        )
    }
}

export default graphql(mutation)(LoginForm);
