'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _ = require('lodash');

var request = require('request');

var Vow = require('vow');

var extend = require('extend');

var WebSocket = require('ws');

var EventEmitter = require('events').EventEmitter;

var _require = require('ws-heartbeat/client'),
    setWsHeartbeat = _require.setWsHeartbeat;

var SlackBot =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(SlackBot, _EventEmitter);

  /**
   * @param {object} params
   * @constructor
   */
  function SlackBot(params) {
    var _this;

    _classCallCheck(this, SlackBot);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SlackBot).call(this, params));
    _this.token = params.token;
    _this.name = params.name;
    _this.disconnect = params.disconnect;
    console.assert(params.token, 'token must be defined');

    if (!_this.disconnect) {
      _this.login();
    }

    return _this;
  }
  /**
   * Starts a Real Time Messaging API session
   */


  _createClass(SlackBot, [{
    key: "login",
    value: function login() {
      var _this2 = this;

      this._api('rtm.start').then(function (data) {
        _this2.wsUrl = data.url;
        _this2.self = data.self;
        _this2.team = data.team;
        _this2.channels = data.channels;
        _this2.users = data.users;
        _this2.ims = data.ims;
        _this2.groups = data.groups;

        _this2.emit('start');

        _this2.connect();
      }).fail(function (data) {
        _this2.emit('error', new Error(data.error ? data.error : data));
      }).done();
    }
    /**
     * Establish a WebSocket connection
     */

  }, {
    key: "connect",
    value: function connect() {
      this.ws = new WebSocket(this.wsUrl);
      setWsHeartbeat(this.ws, '{ "kind": "ping" }');
      this.ws.on('open', function (data) {
        this.emit('open', data);
      }.bind(this));
      this.ws.on('close', function (data) {
        this.emit('close', data);
      }.bind(this));
      this.ws.on('message', function (data) {
        try {
          this.emit('message', JSON.parse(data));
        } catch (e) {
          console.log(e);
        }
      }.bind(this));
    }
    /**
     * Get channels
     * @returns {vow.Promise}
     */

  }, {
    key: "getChannels",
    value: function getChannels() {
      if (this.channels) {
        return Vow.fulfill({
          channels: this.channels
        });
      }

      return this._api('channels.list');
    }
    /**
     * Get users
     * @returns {vow.Promise}
     */

  }, {
    key: "getUsers",
    value: function getUsers() {
      if (this.users) {
        return Vow.fulfill({
          members: this.users
        });
      }

      return this._api('users.list');
    }
    /**
     * Get groups
     * @returns {vow.Promise}
     */

  }, {
    key: "getGroups",
    value: function getGroups() {
      if (this.groups) {
        return Vow.fulfill({
          groups: this.groups
        });
      }

      return this._api('groups.list');
    }
    /**
     * Get user by name
     * @param {string} name
     * @returns {object}
     */

  }, {
    key: "getUser",
    value: function getUser(name) {
      return this.getUsers().then(function (data) {
        var res = _.find(data.members, {
          name: name
        });

        console.assert(res, 'user not found');
        return res;
      });
    }
    /**
     * Get channel by name
     * @param {string} name
     * @returns {object}
     */

  }, {
    key: "getChannel",
    value: function getChannel(name) {
      return this.getChannels().then(function (data) {
        var res = _.find(data.channels, {
          name: name
        });

        console.assert(res, 'channel not found');
        return res;
      });
    }
    /**
     * Get group by name
     * @param {string} name
     * @returns {object}
     */

  }, {
    key: "getGroup",
    value: function getGroup(name) {
      return this.getGroups().then(function (data) {
        var res = _.find(data.groups, {
          name: name
        });

        console.assert(res, 'group not found');
        return res;
      });
    }
    /**
     * Get user by id
     * @param {string} id
     * @returns {object}
     */

  }, {
    key: "getUserById",
    value: function getUserById(id) {
      return this.getUsers().then(function (data) {
        var res = _.find(data.members, {
          id: id
        });

        console.assert(res, 'user not found');
        return res;
      });
    }
    /**
     * Get channel by id
     * @param {string} id
     * @returns {object}
     */

  }, {
    key: "getChannelById",
    value: function getChannelById(id) {
      return this.getChannels().then(function (data) {
        var res = _.find(data.channels, {
          id: id
        });

        console.assert(res, 'channel not found');
        return res;
      });
    }
    /**
     * Get group by id
     * @param {string} id
     * @returns {object}
    */

  }, {
    key: "getGroupById",
    value: function getGroupById(id) {
      return this.getGroups().then(function (data) {
        var res = _.find(data.groups, {
          id: id
        });

        console.assert(res, 'group not found');
        return res;
      });
    }
    /**
     * Get channel ID
     * @param {string} name
     * @returns {string}
     */

  }, {
    key: "getChannelId",
    value: function getChannelId(name) {
      return this.getChannel(name).then(function (channel) {
        return channel.id;
      });
    }
    /**
     * Get group ID
     * @param {string} name
     * @returns {string}
     */

  }, {
    key: "getGroupId",
    value: function getGroupId(name) {
      return this.getGroup(name).then(function (group) {
        return group.id;
      });
    }
    /**
     * Get user ID
     * @param {string} name
     * @returns {string}
     */

  }, {
    key: "getUserId",
    value: function getUserId(name) {
      return this.getUser(name).then(function (user) {
        return user.id;
      });
    }
    /**
     * Get user by email
     * @param {string} email
     * @returns {object}
     */

  }, {
    key: "getUserByEmail",
    value: function getUserByEmail(email) {
      return this.getUsers().then(function (data) {
        return _.find(data.members, {
          profile: {
            email: email
          }
        });
      });
    }
    /**
     * Get "direct message" channel ID
     * @param {string} name
     * @returns {vow.Promise}
     */

  }, {
    key: "getChatId",
    value: function getChatId(name) {
      return this.getUser(name).then(function (data) {
        var chatId = _.find(this.ims, {
          user: data.id
        });

        return chatId && chatId.id || this.openIm(data.id);
      }.bind(this)).then(function (data) {
        return typeof data === 'string' ? data : data.channel.id;
      });
    }
    /**
     * Opens a "direct message" channel with another member of your Slack team
     * @param {string} userId
     * @returns {vow.Promise}
     */

  }, {
    key: "openIm",
    value: function openIm(userId) {
      return this._api('im.open', {
        user: userId
      });
    }
    /**
     * Get a list of all im channels
     * @returns {vow.Promise}
     */

  }, {
    key: "getImChannels",
    value: function getImChannels() {
      if (this.ims) {
        return Vow.fulfill({
          ims: this.ims
        });
      }

      return this._api('im.list');
    }
    /**
     * Posts an ephemeral message to a channel and user
     * @param {string} id - channel ID
     * @param {string} user - user ID
     * @param {string} text
     * @param {object} params
     * @returns {vow.Promise}
     */

  }, {
    key: "postEphemeral",
    value: function postEphemeral(id, user, text, params) {
      params = extend({
        text: text,
        channel: id,
        user: user,
        username: this.name
      }, params || {});
      return this._api('chat.postEphemeral', params);
    }
    /**
     * Posts a message to a channel by ID
     * @param {string} id - channel ID
     * @param {string} text
     * @param {object} params
     * @returns {vow.Promise}
     */

  }, {
    key: "postMessage",
    value: function postMessage(id, text, params) {
      params = extend({
        text: text,
        channel: id,
        username: this.name
      }, params || {});
      return this._api('chat.postMessage', params);
    }
    /**
     * Updates a message by timestamp
     * @param {string} id - channel ID
     * @param {string} ts - timestamp
     * @param {string} text
     * @param {object} params
     * @returns {vow.Promise}
     */

  }, {
    key: "updateMessage",
    value: function updateMessage(id, ts, text, params) {
      params = extend({
        ts: ts,
        channel: id,
        username: this.name,
        text: text
      }, params || {});
      return this._api('chat.update', params);
    }
    /**
     * Posts a message to user by name
     * @param {string} name
     * @param {string} text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     */

  }, {
    key: "postMessageToUser",
    value: function postMessageToUser(name, text, params, cb) {
      return this._post((params || {}).slackbot ? 'slackbot' : 'user', name, text, params, cb);
    }
    /**
     * Posts a message to channel by name
     * @param {string} name
     * @param {string} text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     */

  }, {
    key: "postMessageToChannel",
    value: function postMessageToChannel(name, text, params, cb) {
      return this._post('channel', name, text, params, cb);
    }
    /**
     * Posts a message to group by name
     * @param {string} name
     * @param {string} text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     */

  }, {
    key: "postMessageToGroup",
    value: function postMessageToGroup(name, text, params, cb) {
      return this._post('group', name, text, params, cb);
    }
    /**
     * Common method for posting messages
     * @param {string} type
     * @param {string} name
     * @param {string} text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     * @private
     */

  }, {
    key: "_post",
    value: function _post(type, name, text, params, cb) {
      var method = {
        'group': 'getGroupId',
        'channel': 'getChannelId',
        'user': 'getChatId',
        'slackbot': 'getUserId'
      }[type];

      if (typeof params === 'function') {
        cb = params;
        params = null;
      }

      return this[method](name).then(function (itemId) {
        return this.postMessage(itemId, text, params);
      }.bind(this)).always(function (data) {
        if (cb) {
          cb(data._value);
        }
      });
    }
    /**
     * Posts a message to group | channel | user
     * @param {string} name
     * @param {string} text
     * @param {object} params
     * @param {function} cb
     * @returns {vow.Promise}
     */

  }, {
    key: "postTo",
    value: function postTo(name, text, params, cb) {
      return Vow.all([this.getChannels(), this.getUsers(), this.getGroups()]).then(function (data) {
        name = this._cleanName(name);
        var all = [].concat(data[0].channels, data[1].members, data[2].groups);

        var result = _.find(all, {
          name: name
        });

        console.assert(result, 'wrong name');

        if (result['is_channel']) {
          return this.postMessageToChannel(name, text, params, cb);
        } else if (result['is_group']) {
          return this.postMessageToGroup(name, text, params, cb);
        } else {
          return this.postMessageToUser(name, text, params, cb);
        }
      }.bind(this));
    }
    /**
     * Remove @ or # character from group | channel | user name
     * @param {string} name
     * @returns {string}
     */

  }, {
    key: "_cleanName",
    value: function _cleanName(name) {
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

  }, {
    key: "_preprocessParams",
    value: function _preprocessParams(params) {
      params = extend(params || {}, {
        token: this.token
      });
      Object.keys(params).forEach(function (name) {
        var param = params[name];

        if (param && _typeof(param) === 'object') {
          params[name] = JSON.stringify(param);
        }
      });
      return params;
    }
    /**
     * Send request to API method
     * @param {string} methodName
     * @param {object} params
     * @returns {vow.Promise}
     * @private
     */

  }, {
    key: "_api",
    value: function _api(methodName, params) {
      var data = {
        url: 'https://slack.com/api/' + methodName,
        form: this._preprocessParams(params)
      };
      return new Vow.Promise(function (resolve, reject) {
        request.post(data, function (err, request, body) {
          if (err) {
            reject(err);
            return false;
          }

          try {
            body = JSON.parse(body); // Response always contain a top-level boolean property ok,
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
  }]);

  return SlackBot;
}(EventEmitter);

module.exports = SlackBot;