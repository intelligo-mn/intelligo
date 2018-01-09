const express = require('express');
const cors = require('cors');
const app = express();

const path = require('path');
const githubUtil = require('./github-util');

const l = console.log;

// Enable CORS
app.use(cors());

// Serve static assets
// https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/visitorMap/:login', (req, res) => {
    let login = req.params.login || "tortuvshin";
    const { getUserDetail, getRepos, getVisitorDetails } = githubUtil;

    getRepos(login)
        .then(getVisitorDetails)
        .then(getUserDetail.bind(null, login))
        // Send "res" (response object) to the promise pipeline: https://stackoverflow.com/a/32912570/4035
        .then(sendDataAndCloseConnection.bind(null, res))
        .catch(handleError);
});

app.get('/', function (req, res) {
    res.send('Hello World! ' + staticPath);
});

// Always return the main index.html, so react-router render the route in the client
// https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

sendDataAndCloseConnection = (res, data) => {
    l("sendDataAndCloseConnection.data", data);
    Promise.all(data.visitorDetails)
        .then(result => {
            l("sendDataAndCloseConnection.result", result);

            // https://stackoverflow.com/questions/13554319/express-js-close-response
            res.set("Connection", "close");
            res.json({userDetail: data.userDetail, visitorDetails: result});
        });
}

handleError = (error) => {
    l("error!", error);
}

module.exports = app;