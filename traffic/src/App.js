import React, { Component } from 'react';
import shortid from 'short-id';
import axios from 'axios';

import './App.css';
import Visitor from './visitor';
import UserCard from './UserCard';

// debug
const l = console.log;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      visitorMap: []
    }
  }

  componentDidMount() {
    const apiURL = `${window.location.protocol}//${window.location.hostname}/visitorMap/${this.state.user}`;
    // l("apiURL", apiURL);

    axios.get(apiURL)
      .then(response => {
        const visitorMap = response.data;
        l("==> res.data", response.data);


        this.setState({ visitorMap });
      })
      .catch(error => {
        l("error in app.js", error);
      });
  }

  render() {
    let { visitorMap } = this.state;
    l("state...", this.state);

    l("visitorMap: begin", visitorMap);

    if (!visitorMap || !visitorMap.visitorDetails || visitorMap.visitorDetails.length === 0) {
      return <div>Loading...</div>;
    }

    const { visitorDetails, userDetail } = visitorMap;

    let filteredVisitorDetails = visitorDetails
      // Do not display graph with no traffic history
      .filter(visitor => visitor.value.views.length > 0)
      // Show graph with most traffic history count
      .sort((a, b) => b.value.views.length - a.value.views.length);

    // l('vmap', visitorMap);

    const visitors = filteredVisitorDetails
      .map(visitor => {
        const repo = visitor.repo;
        const visitorDetail = visitor.value;
        const id = shortid.generate();

        return <Visitor key={id} id={id} repo={repo} visitorDetail={visitorDetail} />;
      });

    l("--- render, visitorMap ---", visitorMap);

    return (
      <div className="App">
        <header>
          <UserCard userDetail={userDetail} />
        </header>
        <main>
          {visitors}
        </main>
      </div>
    );
  }
}

export default App;
