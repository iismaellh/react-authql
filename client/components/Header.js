import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {
    onLogoutClick() {
        this.props.mutate({
            refetchQueries: [{ query: query }]
        }).then(() => hashHistory.push('/'));
    }

    renderButtons() {
        const { loading, user } = this.props.data;

        if (loading) { return <div />; }

        if (user) {
            return (
                <div>
                    <li><a href="#" onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
                </div>
            );
        } else {
            return (
                <div>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </div>
            );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <div className="container">
                        <Link to="/" className="brand-logo left">
                            Home
                        </Link>
                        <ul className="right">
                            {this.renderButtons()}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default graphql(mutation)(
    graphql(query)(Header)
);
