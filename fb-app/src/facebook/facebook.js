import React, {Component} from 'react';
import Pages from './pages.js';

export default class Facebook extends Component {

    static get REQUIRED_PERMISSIONS() {
        return ['public_profile', 'email', 'manage_pages', 'pages_messaging'];
    }

    constructor(props) {
        super(props);

        this.FB = props.FB;
        this.uid = props.uid;
        this.accessToken = props.accessToken;
        this.name = props.name;

        this.user = {
            id: this.uid,
            name: this.name,
            accessToken: this.accessToken
        };

        this.state = {
            hasPagesPerms: props.hasPagesPerms,
            loading: true,
            showPages: false
        };
        this.getPermissions = props.fbLogin;
        this.showError = props.showError;
        this.onStatusChange = props.onStatusChange;
        // this.getPermissions = this.getPermissions.bind(this);
        console.log(props.fbLoginStatus, "fbLoginStatus in Facebook");
    }

    componentDidMount() {
        console.log("Facebook didMount");
    }

    // getPermissions() {
    //     this.FB.login(this.onStatusChange, {scope: 'public_profile, email, manage_pages, publish_pages, pages_messaging, pages_messaging_subscriptions, pages_messaging_phone_number'});
    // }

    render() {
        console.log(`Rendering Facebook [hasPagesPerms = ${this.props.hasPagesPerms}]`);
        return (
            <div>{
                this.props.hasPagesPerms === true ?
                    <Pages fb={this.FB} uid={this.uid} accessToken={this.props.accessToken} showError={this.showError}
                           user={this.user}/>
                    : <Permissions getPermissions={this.getPermissions}/>}
            </div>
        );
    }
}

function Permissions(props) {
    return <section className="hero is-large">
        <div className="hero-body has-text-centered-widescreen">
            <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                    <h2 className="title is-2 is-capitalized">Need access</h2>
                    <h4 className="subtitle is-6">
                        <p>Please allow the app to manage your pages, so that it can connect the bot to your page,<br/>
                            and talk to people who message your page.</p>
                        <p>We won't post anything without your permission.</p>
                    </h4>
                    <a className="button is-info" onClick={props.getPermissions}>
                        Allow access
                    </a>
                </div>
            </div>
        </div>
    </section>;
}