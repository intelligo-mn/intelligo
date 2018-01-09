const express = require('express');
const app = express();

const axios = require('axios');
const path = require('path');
var Promise = require('promise');

const l = console.log;

// Enable CORS
// https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


getAuth = () => {
    // l("apiKeys.GITHUB_DEVELOPER_KEY", apiKeys);
    const password = process.env.GITHUB_DEVELOPER_KEY;
    // l("password:", password);

    return {
        username: "dance2die",
        password: password
    };
}

getVisitorDetail = (repo) => {
    // l("-- getVisitorDetail --");

    const { login } = repo.owner;
    const url = `https://api.github.com/repos/${login}/${repo.name}/traffic/views`;
    return axios.get(url, { auth: getAuth() });
}

getUserDetail = (login) => {
    // l("-- getUserDetail --");

    const url = `https://api.github.com/users/${login}`;
    return axios.get(url, { auth: getAuth() });
}

getRepos = (user) => {
    const login = user.data.login;
    const url = `https://api.github.com/users/${login}/repos?sort=updated&direction=desc&per_page=10`;

    return axios.get(url, { auth: getAuth() });
}

getVisitorDetails = ({ data: repos }) => {
    let promises = repos.map(repo => {
        return getVisitorDetail(repo)
            .then(response => {
                let visitorDetail = response.data;
                // l("visitorDetail!!!", visitorDetail);
                return { key: repo.name, value: visitorDetail, repo: repo };
            })
            .catch(error => {
                l("repo error", error);
                // alert("error!", error);
                return { key: repo.name, value: {} };
            });
    });

    return Promise.all(promises);
}

// testing deferred promises.
// http://www.dotnetcurry.com/jquery/1022/jquery-ajax-deferred-promises
app.get('/', function (req, res) {
    getUserDetail("dance2die")
        .then(getRepos)
        .then(getVisitorDetails)
        .then(visitorMap => {
            // https://stackoverflow.com/questions/13554319/express-js-close-response
            res.set("Connection", "close");
            res.send(visitorMap);
        })
        .catch(error => {
            l("error!", error);
        });
});

const port = 9999;
app.listen(port, function () {
    l(`Listening on port : ${port}`);
});


