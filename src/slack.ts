import { find } from 'lodash';
import { post } from 'request';
import * as extend from 'extend';
import * as WebSocket from 'ws';
import { EventEmitter } from 'eventemitter3';
import { setWsHeartbeat } from 'ws-heartbeat/client';

export class SlackBot extends EventEmitter {
  token: any;
  name: any;
  disconnect: any;
  wsUrl: any;
  self: any;
  team: any;
  channels: any;
  users: any;
  ims: any;
  groups: any;
  ws: any;
  /**
   * @param {object} params
   * @constructor
   */

  constructor(params: any) {
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
      .then((data: any) => {
        this.wsUrl = data.url;
        this.self = data.self;
        this.team = data.team;
        this.channels = data.channels;
        this.users = data.users;
        this.ims = data.ims;
        this.groups = data.groups;

        this.emit('start');

        this.connect();
      })
      Promise.reject((data: any) => {
        this.emit('error', new Error(data.error ? data.error : data));
      })
      Promise.resolve();
  }

  /**
   * Establish a WebSocket connection
   */
  connect() {
    this.ws = new WebSocket(this.wsUrl);

    setWsHeartbeat(this.ws, '{ "kind": "ping" }');

    this.ws.on('open', (data: any) => {
      this.emit('open', data);
    });

    this.ws.on('close', (data: any) => {
      this.emit('close', data);
    });

    this.ws.on('message', (data: any) => {
      try {
        this.emit('message', JSON.parse(data));
      } catch (e) {
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
  getUser(name: string) {
    return this.getUsers().then((data: any) => {
      var res = find(data.members, { name: name });

      console.assert(res, 'user not found');
      return res;
    });
  }

  /**
   * Get channel by name
   * @param name
   * @returns {object}
   */
  getChannel(name: string) {
    return this.getChannels().then((data: any) => {
      var res = find(data.channels, { name: name });

      console.assert(res, 'channel not found');
      return res;
    });
  }

  /**
   * Get group by name
   * @param name
   * @returns {object}
   */
  getGroup(name: string) {
    return this.getGroups().then((data: any) => {
      var res = find(data.groups, { name: name });

      console.assert(res, 'group not found');
      return res;
    });
  }

  /**
   * Get user by id
   * @param id
   * @returns {object}
   */
  getUserById(id: string) {
    return this.getUsers().then((data: any) => {
      var res = find(data.members, { id: id });

      console.assert(res, 'user not found');
      return res;
    });
  }

  /**
   * Get channel by id
   * @param id
   * @returns {object}
   */
  getChannelById(id: string) {
    return this.getChannels().then((data: any) => {
      var res = find(data.channels, { id: id });

      console.assert(res, 'channel not found');
      return res;
    });
  }

  /**
   * Get group by id
   * @param id
   * @returns {object}
   */
  getGroupById(id: string) {
    return this.getGroups().then((data: any) => {
      var res = find(data.groups, { id: id });

      console.assert(res, 'group not found');
      return res;
    });
  }

  /**
   * Get channel ID
   * @param name
   * @returns
   */
  getChannelId(name: string) {
    return this.getChannel(name).then((channel: any) => {
      return channel.id;
    });
  }

  /**
   * Get group ID
   * @param name
   * @returns
   */
  getGroupId(name: string): Promise<any> {
    return this.getGroup(name).then((group: any) => {
      return group.id;
    });
  }

  /**
   * Get user ID
   * @param name
   * @returns
   */
  getUserId(name: string) {
    return this.getUser(name).then((user: any) => {
      return user.id;
    });
  }

  /**
   * Get user by email
   * @param email
   * @returns {object}
   */
  getUserByEmail(email: string) {
    return this.getUsers().then((data: any) => {
      return find(data.members, { profile: { email: email } });
    });
  }

  /**
   * Get "direct message" channel ID
   * @param name
   * @returns {vow.Promise}
   */
  getChatId(name: string): any {
    return this.getUser(name)
      .then((data: any) => {
        var chatId = find(this.ims, { user: data.id });

        return (chatId && chatId.id) || this.openIm(data.id);
      })
      .then((data: any) => {
        return typeof data === 'string' ? data : data.channel.id;
      });
  }

  /**
   * Opens a "direct message" channel with another member of your Slack team
   * @param userId
   * @returns {vow.Promise}
   */
  openIm(userId: string) {
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
  postEphemeral(id: string, user: string, text: string, params: any) {
    params = extend(
      {
        text: text,
        channel: id,
        user: user,
        username: this.name,
      },
      params || {},
    );

    return this.api('chat.postEphemeral', params);
  }

  /**
   * Posts a message to a channel by ID
   * @param id - channel ID
   * @param text
   * @param {object} params
   * @returns {vow.Promise}
   */
  postMessage(id: string, text: string, params: any) {
    params = extend(
      {
        text: text,
        channel: id,
        username: this.name,
      },
      params || {},
    );

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
  updateMessage(id: string, ts: string, text: string, params: any) {
    params = extend(
      {
        ts: ts,
        channel: id,
        username: this.name,
        text: text,
      },
      params || {},
    );

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
  postMessageToUser(name: string, text: string, params: any, cb: any) {
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
  postMessageToChannel(name: string, text: string, params: any, cb: any) {
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
  postMessageToGroup(name: string, text: string, params: any, cb: any) {
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
  _post(type: string, name: string, text: string, params: any, cb: any) {
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
      .then((itemId: any) => {
        return this.postMessage(itemId, text, params);
      })
      .always((data: any) => {
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
  postTo(name: string, text: string, params: any, cb: any) {
    return Promise.all([this.getChannels(), this.getUsers(), this.getGroups()]).then((data: any) => {
      name = this._cleanName(name);

      let all = [].concat(data[0].channels, data[1].members, data[2].groups);
      let result: any = find(all, { name: name });

      console.assert(result, 'wrong name');

      if (result['is_channel']) {
        return this.postMessageToChannel(name, text, params, cb);
      } else if (result['is_group']) {
        return this.postMessageToGroup(name, text, params, cb);
      } else {
        return this.postMessageToUser(name, text, params, cb);
      }
    });
  }

  /**
   * Remove @ or # character from group | channel | user name
   * @param name
   * @returns
   */
  _cleanName(name: string) {
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
  _preprocessParams(params: any) {
    params = extend(params || {}, { token: this.token });

    Object.keys(params).forEach(function(name) {
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
  api(methodName?: string, params?: any) {
    var data = {
      url: 'https://slack.com/api/' + methodName,
      form: this._preprocessParams(params),
    };

    return new Promise((resolve: any, reject: any) => {
      post(data, (err, request, body) => {
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
          } else {
            reject(body);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }
}
