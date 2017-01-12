import React from 'react';
import { Link } from 'react-router';
import { Search } from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Header extends React.Component {

    constructor(props) {
        super(props);

        // IMPLEMENT: CREATE A SEARCH STATUS

        this.state = {
            search: false
        };

        this.toggleSearch = this.toggleSearch.bind(this);
    }

    toggleSearch() {
        this.setState({
            search: !this.state.search
        });
    }

    render() {

        const loginButton = (
            <li>
                <Link to="/login"><i className="material-icons">vpn_key</i></Link>
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.props.onLogout}><i className="material-icons">lock_open</i></a>
            </li>
        );

        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue darken-1">
                        <Link to="/" className="brand-logo center">MEMOPAD</Link>

                        <ul>
                            <li><a onClick={this.toggleSearch}><i className="material-icons">search</i></a></li>
                        </ul>

                        <div className="right">
                            <ul>
                                { this.props.isLoggedIn ? logoutButton : loginButton }
                            </ul>
                        </div>
                    </div>
                </nav>
                    <ReactCSSTransitionGroup transitionName="search" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                        { /* IMPLEMENT: SHOW SEARCH WHEN SEARCH STATUS IS TRUE */}
                        {this.state.search ? <Search onClose={this.toggleSearch}
                        onSearch={this.props.onSearch}
                        usernames={this.props.usernames}/> : undefined }
                    </ReactCSSTransitionGroup>
            </div>
        );
    }
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func,
    usernames: React.PropTypes.array
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");},
    usernames: []
};

export default Header;
