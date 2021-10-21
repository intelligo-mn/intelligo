import React, {Component} from 'react';
import Facebook from './facebook/facebook.js';
import Uno from './facebook/uno';
import 'bulma/css/bulma.css';
import './Uno.css';
// import config from './config';
import {CSSTransitionGroup} from 'react-transition-group';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fbInit: null,
            username: null,
            fbAuthStatus: null,
            fbLoginStatus: null,
            hasError: false,
            error: {title: null, message: null},
            logs: [],
            debug: false,
            user: {},
            hasPagesPerms: false
        };

        this.FB = null;
        this.loginStatusChange = this.loginStatusChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.fbLogin = this.fbLogin.bind(this);
        this.fbLogout = this.fbLogout.bind(this);
        this.getPermissions = this.getPermissions.bind(this);

        this.showError = this.showError.bind(this);
        this.removeError = this.removeError.bind(this);
        this.log = this.log.bind(this);
    }

    log(line) {
        console.log(line);
        const logs = this.state.logs;
        logs.push(line);
        this.setState({logs: logs});
    }

    componentWillMount() {
        this.log("Begin!");
        this.getFbConfig();
    }

    getFbConfig() {
        this.setState({fbLoginStatus: null, loading: true});
        Uno.api("/facebook/config",
            function (response, status, xhr) {
                if (response.readyState === 0) {
                    this.setState({
                        fbLoginStatus: false,
                        loading: false
                    });
                    this.showError("Connection failed", "Could not reach the server. Please check your network.");
                }
                console.log(response, "FB config");
                if (status === 'success' && response.success) {
                    console.log(response.data.appId, 'appID');
                    this.appId = response.data.appId;
                    this.version = response.data.version;
                    (function (d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) return;
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//connect.facebook.net/en_US/sdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));

                    window.fbAsyncInit = function () {
                        this.FB = window.FB;
                        window.FB.init({
                            appId: this.appId,
                            cookie: true,
                            xfbml: true,
                            version: this.version
                        });
                        window.FB.AppEvents.logPageView();
                        window.FB.Event.subscribe('auth.logout', this.onLogout.bind(this));
                        window.FB.Event.subscribe('auth.statusChange', this.onStatusChange);

                        this.setState({fbInit: true, loading: false});
                        this.log(`Initialised FB sdk for app ID ${this.appId}`);
                        this.FB.getLoginStatus(this.onStatusChange);
                    }.bind(this);
                } else {
                    this.setState({fbInit: false});
                    this.log('Failed to load config.');
                    this.showError("Failed to load config", "Server returned error. Failed to load config.");
                }
            }.bind(this));
    }

    loginStatusChange(response) {
        this.log("Got FB.loginStatus");
        this.onStatusChange(response);
    }

    onStatusChange(response) {
        console.log(response, `FB auth status changed [previously ${this.state.fbAuthStatus}`);
        if (this.state.fbAuthStatus === response.status) return;

        this.setState({
            fbAuthStatus: response.status,
            loading: true
        });

        if (response.status === "connected") {
            this.log("Logged in to Facebook");
            let authResponse = response.authResponse;
            let user = this.state.user;
            user.userID = authResponse.userID;
            user.accessToken = authResponse.accessToken;
            this.setState({user: user});
            this.FB.api('/me', this.userProfile.bind(this));
        } else {
            this.log("Not signed in to Facebook");
            this.setState({
                loading: false,
                fbLoginStatus: false
            });
        }
    }

    userProfile(response) {
        Uno.login(
            {user_id: response.id, name: response.name}, this.state.user.accessToken,
            function (response, status) {
                if (status === 'success' && response.success === true) {
                    this.log("Platform login successful");
                    console.log(response, "Platform login response");
                    this.setState({
                        accessToken: response.data.longLivedAccessToken.accessToken,
                        uid: response.data.id,
                        username: response.data.name,
                        fbLoginStatus: true,
                        loading: false
                    });
                    this.getPermissions();
                } else {
                    var errorMsg, errorHTML;
                    if (response.responseJSON) {
                        let errorJson = response.responseJSON;
                        errorHTML = errorJson.data ? <p>{errorJson.data}</p>
                            : <span><strong>{errorJson.status}</strong> {errorJson.error}
                                <p>{errorJson.message}</p>
                        </span>;
                        errorMsg = errorJson.data ? errorJson.data : `${errorJson.status} ${errorJson.error} - ${errorJson.message}`;
                    } else {
                        errorMsg = response;
                        errorHTML = <p>Something went wrong</p>;
                    }

                    const errorTitle = "Login failed";
                    this.showError(errorTitle, errorHTML);

                    this.log("Platform log in failed");
                    console.error(errorMsg, "Failed to register login");
                    this.setState({loading: false, fbInit: false});
                }
            }.bind(this));
    }

    fbLogout() {
        this.FB.logout(this.onLogout)
    }

    onLogout(response) {
        console.log(response, "FB logout");
    }

    fbLogin() {
        if (this.FB) {
            console.log("Logging in to Facebook");
            this.setState({loading: true, fbAuthStatus: false});
            this.FB.login(this.onStatusChange, {scope: Facebook.REQUIRED_PERMISSIONS.join(', ')});
        } else {
            this.getFbConfig();
        }
    }

    getPermissions() {
        this.FB.api(`/${this.state.uid}/permissions`, function (response) {
            console.log(response, "permission check response");
            if (response && !response.error) {

                if (Array.isArray(response.data)) {
                    let granted_permissions = response.data;
                    let missing_permissions = [];
                    

                    Facebook.REQUIRED_PERMISSIONS.forEach((req_perm) => {
                    	var granted=false;
                    	granted_permissions.forEach((gratedPerm)=>{
                    		if(gratedPerm.permission==req_perm && gratedPerm.status=='granted'){
                    			granted=true;
                    		}
                    	});
                        if (granted==false) {
                            missing_permissions.push(req_perm);
                        } 
                    });

                    if (missing_permissions.length > 0) {
                        console.log(missing_permissions.join(", "), "permissions not granted");
                        this.setState({
                            loading: false,
                            hasPagesParams: false
                        });
                    } else {
                        console.log("All permissions granted");
                        this.setState({
                            loading: false,
                            hasPagesPerms: true
                        });
                    }

                    // var manage_pages = false;
                    // var pages_messaging_subscriptions = false;
                    // var pages_messaging = false;
                    // var pages_messaging_phone_number = false;

                    // response.data.map((perm) => {
                    //     if (perm.status === 'granted') {
                    //         if (perm.permission === 'manage_pages') {
                    //             manage_pages = true;
                    //         } else if (perm.permission === 'pages_messaging_phone_number') {
                    //             pages_messaging_phone_number = true;
                    //         } else if (perm.permission === 'pages_messaging') {
                    //             pages_messaging = true;
                    //         } else if (perm.permission === 'pages_messaging_subscriptions') {
                    //             pages_messaging_subscriptions = true;
                    //         }
                    //     }
                    //     return perm.status;
                    // });

                    // if (manage_pages && pages_messaging && pages_messaging_subscriptions) {
                    //     console.log("All permissions granted");
                    //     this.setState({
                    //         loading: false,
                    //         hasPagesPerms: true
                    //     })
                    // } else {
                    //     console.log(response.data, "Permissions not granted");
                    //     this.setState({
                    //         loading: false,
                    //         hasPagesParams: false
                    //     })
                    // }

                }
            } else {
                console.log(response, "Permissions request failed");
                this.setState({
                    loading: false,
                    hasPagesParams: false
                })
            }
        }.bind(this));
    }

    showError(title, message) {
        this.setState({
            hasError: true,
            error: {
                title: title,
                message: message
            }
        });

    }

    removeError() {
        this.setState({
            hasError: false,
            error: {title: null, message: null}
        })
    }

    render() {
        const errorMessage = this.state.hasError ? <div className="error" key="errorMessage">
            <div className="error-title">
                <p>{this.state.error.title}</p>
                <button className="delete" aria-label="delete" onClick={this.removeError}/>
            </div>
            <div className="error-message">{this.state.error.message}</div>
        </div> : '';

        const logs = <div className="log-line">{this.state.logs.map((l, i) => <p key={i}> > {l}</p>)}</div>;

        return (
            <div>{this.state.hasError ?
                <CSSTransitionGroup transitionName="example"
                                    transitionAppear={true}
                                    transitionAppearTimeout={2000}
                                    transitionEnter={false}
                                    transitionLeave={false}>
                    {errorMessage}
                </CSSTransitionGroup> : ''}
                {this.state.fbLoginStatus === true ?
                    <Home FB={this.FB} uid={this.state.uid} username={this.state.username}
                          onStatusChange={this.onStatusChange} showError={this.showError}
                          accessToken={this.state.accessToken} fbLoginStatus={this.state.fbLoginStatus}
                          fbLogin={this.fbLogin.bind(this)} hasPagesPerms={this.state.hasPagesPerms}
                          logout={this.fbLogout}
                    />
                    :
                    <Intro fbLoginStatus={this.state.fbLoginStatus} fbLogin={this.fbLogin} fbInit={this.state.fbInit}
                           authStatus={this.state.fbAuthStatus} isLoading={this.state.loading}/>
                }
                <Footer logs={logs} debug={this.state.debug}/>
            </div>
        );
    }
}

function Home(props) {
    return <section>
        <nav className="navbar is-dark" >
            <div className="navbar-brand">
                <div className="navbar-item">
                    <span className="subtitle is-size-7 has-text-weight-semibold has-text-white is-uppercase">NowFloats Conversations Platform</span>
                </div>
            </div>
            <div className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">{props.username}</a>
                        <div className="navbar-dropdown is-right">
                            <a onClick={props.logout} className="navbar-item has-text-info has-text">Log out</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <Facebook FB={props.FB} uid={props.uid} accessToken={props.accessToken} name={props.username}
                  fbLoginStatus={props.fbLoginStatus} onStatusChange={props.onStatusChange}
                  showError={props.showError} fbLogin={props.fbLogin} hasPagesPerms={props.hasPagesPerms}/>
    </section>;
}

function Intro(props) {
    return <section className="hero is-fullheight is-dark">
        <div className="hero-body has-text-centered-widescreen">
            <div className="container">
                <h2 className="title is-1 has-text-weight-thin">Hello.</h2>
                <h4 className="subtitle is-3 has-text-weight-thin">Let's build bots!</h4>
                {props.fbInit && !props.loading ?
                    <a className="button is-info has-text-white" onClick={props.fbLogin}>Sign in with Facebook</a>
                    : props.isLoading ? <a className="button is-info is-loading" disabled>Sign in with Facebook</a>
                        : <a className="button is-info" disabled>Sign in with Facebook</a>
                }
            </div>
        </div>
    </section>
}

function Footer(props) {
    return <footer className="footer">
        <div className="container">
            <div className="content has-text-centered">
                <p>
                    <strong>Conversations</strong> by <a href="http://nowfloats.com">NowFloats</a>.
                </p>
            </div>
        </div>
        {props.debug ?
            <section>
                <h6>Logs</h6>
                <code className="logs">{props.logs}</code>
            </section> : ''}
    </footer>;
}
