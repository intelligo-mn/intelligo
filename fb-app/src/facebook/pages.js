import React from 'react';
import Uno from './uno';

export default class Pages extends React.Component {
    constructor(props) {
        super(props);

        this.user = props.user;
        this.FB = props.fb;
        this.uid = props.uid;
        this.accessToken = props.accessToken;

        this.pagesArrayCounter = 0;

        this.state = {
            accessToken: props.accessToken,
            loading: true,
            pages: [],
            status: '',
            pageDetails: [],
            connectedPages: [],
            unconnectedPages: []
        };

        this.showError = props.showError;
        this.showPages = this.showPages.bind(this);
        this.loadPages = this.loadPages.bind(this);
        this.savePage = this.savePage.bind(this);
        this.pageSaved = this.pageSaved.bind(this);
    }

    componentDidMount() {
        if (this.state.pages.length > 0) {
            this.setState({
                loading: false
            });
        } else {
            console.log("pages.js mounted");
            this.loadPages();
        }
    }

    loadPages() {
        this.setState({
            loading: true
        });

        this.FB.api(
            `/me/accounts`,
            function (response) {
                console.log(response, "/me/accounts");
                if (!response || response.error) {
                    if (response.error) {
                        console.error(response.error);
                    }
                } else {
                    this.setState({pages: response.data});
                    this.showPages();
                }
            }.bind(this));
    }

    showPages() {
        let pagesArray = this.state.pages;

        if (pagesArray.length > 0) {
            pagesArray.forEach((page) => this.savePage(page));
        } else {
            this.setState({
                loading: false
            })
        }
    }

    savePage(page) {
        let pageDTO = {
            id: page.id,
            name: page.name,
            access_token: page.access_token,
            user: this.user
        };
        console.log(`Saving page ${page.name}`);
        Uno.saveFBPage(pageDTO, function (response) {
            if (response.data) {
                let curPage = response.data;
                curPage.category = page.category;
                this.pageSaved(curPage);
            } else {
                console.error(response, "Failed to save page");
            }
        }.bind(this));
    }

    pageSaved(page) {
        console.log(`Saved page ${page.name}`);
        let connectedPages = this.state.connectedPages;
        let unconnectedPages = this.state.unconnectedPages;
        if (page.bot_id) {
            page.connected = true;
            connectedPages.push(page);
        } else {
            page.connected = false;
            unconnectedPages.push(page);
        }

        this.setState({
            connectedPages: connectedPages,
            unconnectedPages: unconnectedPages,
            loading: false
        });
    }

    pageSelected(page) {
        console.log(page, "page selected");
        this.setState({
            selectedPage: page,
            loading: true
        });

        Uno.api(
            `/facebook/pages/${page.id}/connect?page_access_token=${page.access_token}`, 'POST', null,
            function (response) {
                this.setState({loading: false});
                console.log(response, `${page.id}/connect response`);
                if (!response.success) {
                    let errorTitle = "Connect failed";
                    let errorStr = "The backend server was unable to fulfill the request.";
                    if (response.data) {
                        errorStr = response.data;
                    } else if (response.error) {
                        errorStr = <div>
                            <p><strong>{response.status}</strong> {response.error}</p>
                            <p>{response.message}</p>
                        </div>
                    }
                    this.showError(errorTitle, errorStr);
                } else {
                    let connectedPage = response.data;
                    connectedPage.connected = true;

                    let unconnectedPages = this.state.unconnectedPages.filter((curPage) => {
                        return curPage.id !== page.id;
                    });

                    let connectedPages = this.state.connectedPages;
                    connectedPages.push(connectedPage);

                    this.setState({
                        connectedPages: connectedPages,
                        unconnectedPages: unconnectedPages,
                        agentConnected: true,
                        loading: false
                    });
                    console.log("Subscribed to Page");
                }
            }.bind(this));

    }

    businessSaved(business, page) {
        console.log(business, "businessSaved");
        console.log(page, "businessSaved");

        this.FB.api(
            `/${page.id}/subscribed_apps?access_token=${this.accessToken}`,
            'post', {access_token: page.access_token},
            function (response) {
                if (!response || response.error) {
                    console.error(response.error.message, "subscribed_apps error");
                } else {
                    this.setState({
                        agentConnected: response.status,
                        editingBusiness: false
                    });
                    console.log(response, "Subscribed to Page");
                }
            }.bind(this));
    }

    cancelBusinessForm() {
        this.setState({editingBusiness: false});
    }

    render() {
        console.log("rendering pages");
        console.log(this.state.connectedPages.length, "connectedPages length in render");
        console.log(this.state.pages.length, "pages length in render");
        console.log(this.state.loading, "this.state.loading in render");
        // if (this.state.loading) {
        //     return (
        //         <Loading />
        //     );
        // }
        return (
            <section>
                {(!this.state.loading && this.state.connectedPages.length + this.state.unconnectedPages.length < this.state.pages.length) ?
                    <div className="fixed-at-top">
                        <nobr>
                            {/*<progress className="progress is-small is-info"*/}
                                      {/*value={this.state.unconnectedPages + this.state.connectedPages.length}*/}
                                      {/*max={this.state.pages.length}>*/}
                                {/*{this.state.pages.length - this.state.unconnectedPages.length - this.state.connectedPages.length}*/}
                                {/*pages pending*/}
                            {/*</progress>*/}
                            {this.state.unconnectedPages.length + this.state.connectedPages.length} / {this.state.pages.length} pages
                        </nobr>
                    </div> : ''}
                <div>{this.state.connectedPages.length > 0 || this.state.unconnectedPages.length > 0 ?
                    <div>
                        <PageList pages={this.state.connectedPages} FB={this.FB}
                                  onPageSelected={this.pageSelected.bind(this)} accessToken={this.props.accessToken}/>

                        <PageList pages={this.state.unconnectedPages} FB={this.FB}
                                  onPageSelected={this.pageSelected.bind(this)} accessToken={this.props.accessToken}/>
                    </div>
                    : this.state.loading ? <Loading/> : <NoPages/>
                }
                </div>
            </section>
        )
    }

}

function NoPages(props) {
    return <section className="hero is-large">
        <div className="hero-body has-text-centered-widescreen">
            <div className="container">
                <h2 className="subtitle is-3">Looks like you are not managing any pages</h2>
            </div>
        </div>
    </section>;
}

function Loading(props) {
    return <section className="hero is-large">
        <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-3 has-text-centered-widescreen">
                        <h2 className="title is-4">Loading pages</h2>
                        <progress className="col s4 offset-s4">loading...</progress>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}

function PageList(props) {
    return <section className="section">
        <div className="container">
            <h2 className="title is-4 has-text-weight-normal">Connected pages</h2>
            <div className="columns is-multiline ">
                {props.pages.map(
                    (page) =>
                        <div className="column is-one-quarter" key={page.id}>
                            <Page FB={props.FB} onPageSelected={props.onPageSelected}
                                  page={page} accessToken={props.accessToken}/>
                        </div>)
                }
            </div>
        </div>
    </section>
}

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.page = props.page;

        this.state = {
            img: null,
            connected: false,
            agent: null
        };

        this.onListItemClicked = this.onListItemClicked.bind(this);
    }

    componentDidMount() {
        this.props.FB.api(`${this.page.id}`, {access_token: this.props.accessToken}, function (response) {
            console.log(response, `/${this.page.id}`);
        }.bind(this));
        this.props.FB.api(
            `/${this.page.id}/picture?height=42&width=42`,
            function (response) {
                if (response && !response.error) {
                    this.setState({img: response.data.url});
                }
            }.bind(this)
        );
    }

    onListItemClicked() {
        this.props.onPageSelected(this.page);
    }

    render() {
        console.log(`rendering page ${this.page.name}`);
        return (
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-4by4">
                                <img src={this.state.img} alt="" className="square"/>
                            </figure>
                        </div>
                        <div className="media-content">
                            <h5 className="title is-5">{this.page.name}</h5>
                            <p className="subtitle is-6 grey-text">{this.page.category}</p>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    {!this.page.connected ?
                        <a className="card-footer-item has-text-info" onClick={this.onListItemClicked}>Connect</a>
                        :
                        <span className="card-footer-item">Connected</span>
                    }
                </div>
            </div>
        );
    }
}

























