const axios = require('axios');
const Promise = require('promise');

// Debug
const l = console.log;

getAuth = () => {
    const password = process.env.GITHUB_DEVELOPER_KEY;

    return {
        username: "tortuvshin",
        password: password
    };
}

getVisitorDetail = (repo) => {
    const { login } = repo.owner;
    const url = `https://api.github.com/repos/${login}/${repo.name}/traffic/views`;

    return axios.get(url, { auth: getAuth() });
}

module.exports = {
    getUserDetail: (login, visitorDetails) => {
        const url = `https://api.github.com/users/${login}`;

        return axios.get(url, { auth: getAuth() })
            .then(userDetail => {
                return {userDetail: userDetail.data, visitorDetails};
            })
            .catch(error => l("error in getUserDetail", error));
    },

    getRepos: (login) => {
        const url = `https://api.github.com/users/${login}/repos?sort=updated&direction=desc`;

        return axios.get(url, { auth: getAuth() });
    },

    getVisitorDetails: ({ data: repos }) => {
        return repos.map(repo => {
            return getVisitorDetail(repo)
                .then(response => {
                    let visitorDetail = response.data;
                    return { key: repo.name, value: visitorDetail, repo: repo };
                })
                .catch(error => {
                    l("repo error", error);
                    return { key: repo.name, value: {} };
                });
        });
    }
};
