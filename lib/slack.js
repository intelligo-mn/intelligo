"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const request_1 = require("request");
const extend = require("extend");
const WebSocket = require("ws");
const eventemitter3_1 = require("eventemitter3");
const client_1 = require("ws-heartbeat/client");
class SlackBot extends eventemitter3_1.EventEmitter {
    /**
     * @param {object} params
     * @constructor
     */
    constructor(params) {
        super();
        this.token = params.token;
        this.name = params.name;
        this.disconnect = params.disconnect;
        console.assert(params.token, 'token must be defined');
        if (!this.disconnect) {
            this.login();
        }
    }
    /**
     * Starts a Real Time Messaging API session
     */
    login() {
        this.api('rtm.start')
            .then((data) => {
            this.wsUrl = data.url;
            this.self = data.self;
            this.team = data.team;
            this.channels = data.channels;
            this.users = data.users;
            this.ims = data.ims;
            this.groups = data.groups;
            this.emit('start');
            this.connect();
        });
        Promise.reject((data) => {
            this.emit('error', new Error(data.error ? data.error : data));
        });
        Promise.resolve();
    }
    /**
     * Establish a WebSocket connection
     */
    connect() {
        this.ws = new WebSocket(this.wsUrl);
        client_1.setWsHeartbeat(this.ws, '{ "kind": "ping" }');
        this.ws.on('open', (data) => {
            this.emit('open', data);
        });
        this.ws.on('close', (data) => {
            this.emit('close', data);
        });
        this.ws.on('message', (data) => {
            try {
                this.emit('message', JSON.parse(data));
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    /**
     * Get channels
     * @returns Promise
     */
    getChannels() {
        if (this.channels) {
            return Promise.resolve({ channels: this.channels });
        }
        return this.api('channels.list');
    }
    /**
     * Get users
     */
    getUsers() {
        if (this.users) {
            return Promise.resolve({ members: this.users });
        }
        return this.api('users.list');
    }
    /**
     * Get groups
     */
    getGroups() {
        if (this.groups) {
            return Promise.resolve({ groups: this.groups });
        }
        return this.api('groups.list');
    }
    /**
     * Get user by name
     * @param name
     * @returns
     */
    getUser(name) {
        return this.getUsers().then((data) => {
            var res = lodash_1.find(data.members, { name: name });
            console.assert(res, 'user not found');
            return res;
        });
    }
    /**
     * Get channel by name
     * @param name
     * @returns {object}
     */
    getChannel(name) {
        return this.getChannels().then((data) => {
            var res = lodash_1.find(data.channels, { name: name });
            console.assert(res, 'channel not found');
            return res;
        });
    }
    /**
     * Get group by name
     * @param name
     * @returns {object}
     */
    getGroup(name) {
        return this.getGroups().then((data) => {
            var res = lodash_1.find(data.groups, { name: name });
            console.assert(res, 'group not found');
            return res;
        });
    }
    /**
     * Get user by id
     * @param id
     * @returns {object}
     */
    getUserById(id) {
        return this.getUsers().then((data) => {
            var res = lodash_1.find(data.members, { id: id });
            console.assert(res, 'user not found');
            return res;
        });
    }
    /**
     * Get channel by id
     * @param id
     * @returns {object}
     */
    getChannelById(id) {
        return this.getChannels().then((data) => {
            var res = lodash_1.find(data.channels, { id: id });
            console.assert(res, 'channel not found');
            return res;
        });
    }
    /**
     * Get group by id
     * @param id
     * @returns {object}
     */
    getGroupById(id) {
        return this.getGroups().then((data) => {
            var res = lodash_1.find(data.groups, { id: id });
            console.assert(res, 'group not found');
            return res;
        });
    }
    /**
     * Get channel ID
     * @param name
     * @returns
     */
    getChannelId(name) {
        return this.getChannel(name).then((channel) => {
            return channel.id;
        });
    }
    /**
     * Get group ID
     * @param name
     * @returns
     */
    getGroupId(name) {
        return this.getGroup(name).then((group) => {
            return group.id;
        });
    }
    /**
     * Get user ID
     * @param name
     * @returns
     */
    getUserId(name) {
        return this.getUser(name).then((user) => {
            return user.id;
        });
    }
    /**
     * Get user by email
     * @param email
     * @returns {object}
     */
    getUserByEmail(email) {
        return this.getUsers().then((data) => {
            return lodash_1.find(data.members, { profile: { email: email } });
        });
    }
    /**
     * Get "direct message" channel ID
     * @param name
     * @returns {vow.Promise}
     */
    getChatId(name) {
        return this.getUser(name)
            .then((data) => {
            var chatId = lodash_1.find(this.ims, { user: data.id });
            return (chatId && chatId.id) || this.openIm(data.id);
        })
            .then((data) => {
            return typeof data === 'string' ? data : data.channel.id;
        });
    }
    /**
     * Opens a "direct message" channel with another member of your Slack team
     * @param userId
     * @returns {vow.Promise}
     */
    openIm(userId) {
        return this.api('im.open', { user: userId });
    }
    /**
     * Get a list of all im channels
     * @returns {vow.Promise}
     */
    getImChannels() {
        if (this.ims) {
            return Promise.resolve({ ims: this.ims });
        }
        return this.api('im.list');
    }
    /**
     * Posts an ephemeral message to a channel and user
     * @param id - channel ID
     * @param user - user ID
     * @param text
     * @param {object} params
     * @returns {vow.Promise}
     */
    postEphemeral(id, user, text, params) {
        params = extend({
            text: text,
            channel: id,
            user: user,
            username: this.name,
        }, params || {});
        return this.api('chat.postEphemeral', params);
    }
    /**
     * Posts a message to a channel by ID
     * @param id - channel ID
     * @param text
     * @param {object} params
     * @returns {vow.Promise}
     */
    postMessage(id, text, params) {
        params = extend({
            text: text,
            channel: id,
            username: this.name,
        }, params || {});
        return this.api('chat.postMessage', params);
    }
    /**
     * Updates a message by timestamp
     * @param id - channel ID
     * @param ts - timestamp
     * @param text
     * @param {object} params
     * @returns {vow.Promise}
     */
    updateMessage(id, ts, text, params) {
        params = extend({
            ts: ts,
            channel: id,
            username: this.name,
            text: text,
        }, params || {});
        return this.api('chat.update', params);
    }
    /**
     * Posts a message to user by name
     * @param name
     * @param text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     */
    postMessageToUser(name, text, params, cb) {
        return this._post((params || {}).slackbot ? 'slackbot' : 'user', name, text, params, cb);
    }
    /**
     * Posts a message to channel by name
     * @param name
     * @param text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     */
    postMessageToChannel(name, text, params, cb) {
        return this._post('channel', name, text, params, cb);
    }
    /**
     * Posts a message to group by name
     * @param name
     * @param text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     */
    postMessageToGroup(name, text, params, cb) {
        return this._post('group', name, text, params, cb);
    }
    /**
     * Common method for posting messages
     * @param type
     * @param name
     * @param text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     * @private
     */
    _post(type, name, text, params, cb) {
        let method = {
            group: 'getGroupId',
            channel: 'getChannelId',
            user: 'getChatId',
            slackbot: 'getUserId',
        }[type];
        if (typeof params === 'function') {
            cb = params;
            params = null;
        }
        return this[method](name)
            .then((itemId) => {
            return this.postMessage(itemId, text, params);
        })
            .always((data) => {
            if (cb) {
                cb(data._value);
            }
        });
    }
    /**
     * Posts a message to group | channel | user
     * @param name
     * @param text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     */
    postTo(name, text, params, cb) {
        return Promise.all([this.getChannels(), this.getUsers(), this.getGroups()]).then((data) => {
            name = this._cleanName(name);
            let all = [].concat(data[0].channels, data[1].members, data[2].groups);
            let result = lodash_1.find(all, { name: name });
            console.assert(result, 'wrong name');
            if (result['is_channel']) {
                return this.postMessageToChannel(name, text, params, cb);
            }
            else if (result['is_group']) {
                return this.postMessageToGroup(name, text, params, cb);
            }
            else {
                return this.postMessageToUser(name, text, params, cb);
            }
        });
    }
    /**
     * Remove @ or # character from group | channel | user name
     * @param name
     * @returns
     */
    _cleanName(name) {
        if (typeof name !== 'string') {
            return name;
        }
        var firstCharacter = name.charAt(0);
        if (firstCharacter === '#' || firstCharacter === '@') {
            name = name.slice(1);
        }
        return name;
    }
    /**
     * Preprocessing of params
     * @param params
     * @returns {object}
     * @private
     */
    _preprocessParams(params) {
        params = extend(params || {}, { token: this.token });
        Object.keys(params).forEach(function (name) {
            var param = params[name];
            if (param && typeof param === 'object') {
                params[name] = JSON.stringify(param);
            }
        });
        return params;
    }
    /**
     * Send request to API method
     * @param methodName
     * @param {object} params
     * @returns {vow.Promise}
     * @private
     */
    api(methodName, params) {
        var data = {
            url: 'https://slack.com/api/' + methodName,
            form: this._preprocessParams(params),
        };
        return new Promise((resolve, reject) => {
            request_1.post(data, (err, request, body) => {
                if (err) {
                    reject(err);
                    return false;
                }
                try {
                    body = JSON.parse(body);
                    // Response always contain a top-level boolean property ok,
                    // indicating success or failure
                    if (body.ok) {
                        resolve(body);
                    }
                    else {
                        reject(body);
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
}
exports.SlackBot = SlackBot;
//# sourceMappingURL=slack.js.map