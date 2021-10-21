import React from 'react';
import Uno from './uno';
import $ from 'jquery';

export default class BusinessForm extends React.Component {

    constructor(props) {
        super(props);
        this.page = props.page;
        this.fbUserId = props.fbUserId;
        this.state = {
            categories: [],
            name: this.page.name,
            category: "0",
            description: '',
            address: '',
            business: null,
            screen: 'pages',
            errorMessage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.state.category === 0 || this.state.category === "0") {
            this.setState({
                errorMessage: 'Please select a category'
            })
        } else {

            this.setState({
                errorMessage: ''
            });
            Uno.api("/businesses/", 'POST', {
                name: this.state.name,
                category: this.state.category,
                description: this.state.description,
                address: this.state.address,
                fb_page_id: this.page.id,
                fb_user_id: this.fbUserId
            }, function (response) {
                console.log(response, "Create business");
                if (response.success) {
                    //this.saveBusiness(true);
                    this.setState({
                        business: response.data,
                        screen: 'agents'
                    })
                }
            }.bind(this));
        }
    }

    componentDidMount() {
        Uno.api("/businesses/categories", function (response) {
            console.log(response, "Categories");
            if (response.success) {
                this.setState({
                    categories: response.data
                });
                $('select').material_select();
            }
        }.bind(this));

        Uno.api(`/businesses?fb_page=${this.page.id}`, function (response) {
            console.log(response, "Business for Page");
            if (response.success && response.data) {
                this.setState({
                    business: response.data,
                    screen: 'agents'
                })
            }
        }.bind(this));
    }

    agentConnected(business) {
        this.props.businessSaved(business, this.page);
    }

    pagesScreen() {
        this.setState({
            screen: 'pages'
        })
    }

    render() {
        if (this.state.screen === 'agents') {
            console.log(this.state.business, "Rendering ConnectAgent");
            return (
                <ConnectAgent agentConnected={this.agentConnected.bind(this)} business={this.state.business}
                              back={this.props.cancel}/>
            );
        } else {
            return (
                <div className="container">
                    <div className="row center">
                        <h5 className="light">Tell us about your business</h5>
                    </div>
                    <div className="row">
                        <form className="col s12" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input placeholder="Business Name" name="name" type="text"
                                           onChange={this.handleChange}
                                           className="validate" value={this.state.name}/>
                                    <label htmlFor="name" className="active">Business Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <label htmlFor="category" className="active">Category</label>
                                    <select name="category" value={this.state.category}
                                            onChange={this.handleChange} className="browser-default">
                                        <option value="0" disabled>Business Type</option>
                                        {
                                            this.state.categories.map((cat) =>
                                                <option value={cat.name} key={cat.id}>{cat.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                            <textarea name="description" className="materialize-textarea"
                                                      onChange={this.handleChange}
                                                      placeholder="Tell us about what your business is about"
                                                      value={this.state.description}/>
                                    <label htmlFor="description" className="active">Description</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <textarea name="address" className="materialize-textarea" onChange={this.handleChange}
                                          placeholder="" value={this.state.address}/>
                                    <label htmlFor="address">Address</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s3 offset-s4">
                                    <button className="btn grey lighten-2 col s12" onClick={this.props.cancel}>
                                        Cancel
                                    </button>
                                </div>
                                <div className="col s3 offset-s1">
                                    <button className="btn blue darken-4 col s12" type="submit"
                                            name="save_business">
                                        Save
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <div className="center red-text">{this.state.errorMessage}</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

class ConnectAgent extends React.Component {
    constructor(props) {
        super(props);

        this.business = this.props.business;
        this.state = {
            agents: []
        }
    }

    componentDidMount() {
        Uno.api("/ai/agents", function (response) {
            if (response.success) {
                this.setState({
                    agents: response.data
                })
            }
        }.bind(this))
    }

    connect(e) {
        var agentId = e.target.name;
        Uno.api(`/businesses/${this.props.business.id}/agent`, "PUT", {id: agentId}, function (response, status) {
            console.log(response, "Connect Bot to Business");
            if (status === 'success') {
                this.props.agentConnected(response);
            }
        }.bind(this))
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s2">
                        <button className="btn-flat" onClick={this.props.back}>
                            <i className="material-icons">fast_rewind</i></button>
                    </div>
                    <h5 className="thin col s4 offset-s2">Choose an agent</h5>
                </div>
                <ul className="collection">
                    {this.state.agents.map((agent) =>
                        <li className="collection-item" key={agent.name}>
                            <h6 className="light">{agent.name}</h6>

                            <p>{agent.description}</p>

                            <div className="row">
                                <a className="btn-flat blue-text darken-4 col s2 offset-s10 center"
                                   onClick={this.connect.bind(this)}
                                   name={agent.id}>Connect</a>
                            </div>
                        </li>)}
                </ul>
            </div>
        );
    }
}