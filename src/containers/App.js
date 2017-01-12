import React from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication';
import { searchRequest } from 'actions/search';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleLogout() {
        this.props.logoutRequest().then(
            () => {
                 Materialize.toast('Good Bye!', 2000);

                 // EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            }
        );
    }

    handleSearch(keyword) {
        this.props.searchRequest(keyword);
    }

    componentDidMount() {
        // get cookie by name
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        // get login data from cookie
        let loginData = getCookie('key');

        // if loginData is undefined, do nothing
        if(typeof loginData === "undefined") return;

        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));

        // if not logged in, do nothing
        if(!loginData.isLoggedIn) return;

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.getStatusRequest().then(
            () => {
                if(!this.props.status.valid) {
                    // if session is not valid
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    // and notify
                    let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast($toastContent, 4000);
                }
            }
        );

    }

    render(){
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
            <div>
                { isAuth ? undefined : <Header isLoggedIn={this.props.status.isLoggedIn}
                onLogout={this.handleLogout}
                onSearch={this.handleSearch}
                usernames={this.props.searchResults}/> }
                { this.props.children }
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
        searchResults: state.search.usernames
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        },
        searchRequest: (keyword) => {
            return dispatch(searchRequest(keyword));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
