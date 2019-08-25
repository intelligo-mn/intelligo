'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var express = require('express'),
    EventEmitter = require('eventemitter3'),
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    request = require('request'),
    IntelligoAI = require('intelligo.js');

var MessengerBot =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(MessengerBot, _EventEmitter);

  /**
     * @param {object} params
     * @constructor
     */
  function MessengerBot(params) {
    var _this;

    _classCallCheck(this, MessengerBot);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MessengerBot).call(this));

    if (!params || params && (!params.PAGE_ACCESS_TOKEN || !params.VALIDATION_TOKEN || !params.APP_SECRET)) {
      throw new Error("You need to specify an PAGE_ACCESS_TOKEN, VALIDATION_TOKEN and APP_SECRET");
    }

    _this.PAGE_ACCESS_TOKEN = params.PAGE_ACCESS_TOKEN;
    _this.VALIDATION_TOKEN = params.VALIDATION_TOKEN;
    _this.APP_SECRET = params.APP_SECRET;
    _this.FB_URL = params.FB_URL || 'https://graph.facebook.com/v3.1/';
    _this.app = params.app || express();
    _this.webhook = params.webhook || '/webhook';

    _this.app.use(bodyParser.json({
      verify: _this.verifyRequestSignature.bind(_assertThisInitialized(_this))
    }));

    _this.intelligoClassifier;
    return _this;
  }

  _createClass(MessengerBot, [{
    key: "learn",
    value: function learn(data) {
      // Repeat multiple levels
      var TextClassifier = IntelligoAI.classifiers.multilabel.BinaryRelevance.bind(0, {
        binaryClassifierType: IntelligoAI.classifiers.Winnow.bind(0, {
          retrain_count: 10
        })
      });

      var WordExtractor = function WordExtractor(input, features) {
        return input.split(" ").map(function (word) {
          return features[word] = 1;
        });
      };

      this.intelligoClassifier = new IntelligoAI.classifiers.EnhancedClassifier({
        classifierType: TextClassifier,
        featureExtractor: WordExtractor
      });
      this.intelligoClassifier.trainBatch(data);
    }
  }, {
    key: "answer",
    value: function answer(question) {
      var result = this.intelligoClassifier.classify(question);
      return result;
    }
  }, {
    key: "initWebhook",
    value: function initWebhook() {
      var _this2 = this;

      /*
       * Use your own validation token. Check that the token used in the Webhook 
       * setup is the same token used here.
       */
      this.app.get(this.webhook, function (req, res) {
        if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === _this2.VALIDATION_TOKEN) {
          console.log("Validating webhook");
          res.status(200).send(req.query['hub.challenge']);
        } else {
          console.error("Failed validation. Make sure the validation tokens match.");
          res.sendStatus(403);
        }
      });
      /*
       * All callbacks for Messenger are POST-ed. They will be sent to the same
       * webhook. Be sure to subscribe your app to your page to receive callbacks
       * for your page. 
       * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
       */

      this.app.post(this.webhook, function (req, res) {
        var data = req.body;

        if (data.object === 'page') {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = data.entry[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var pageEntry = _step.value;
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = pageEntry.messaging[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var messagingEvent = _step2.value;

                  _this2.handleEvent(messagingEvent);
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                    _iterator2["return"]();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          res.sendStatus(200);
        }
      });
    } // Iterate over each messaging event

  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      if (event.optin) {
        var optin = event.optin.ref;
        this.emit('optin', event.sender.id, event, optin);
      } else if (typeof event.message === 'string') {
        this.emit('message', event);
      } else if (event.message && !event.message.is_echo) {
        this.emit('message', event);
      } else if (event.message && event.message.attachment) {
        this.emit('attachment', event.sender.id, event.message.attachment, event.message.url, event.message.quickReplies);
      } else if (event.delivery) {
        var mids = event.delivery.mids;
        this.emit('delivery', event.sender.id, event, mids);
      } else if (event.read) {
        var recipient = event.recipient.id;
        this.emit('read', event.sender.id, recipient, event.read);
      } else if (event.postback || event.message && !event.message.is_echo && event.message.quick_reply) {
        var postback = event.postback && event.postback.payload || event.message.quick_reply.payload;
        var ref = event.postback && event.postback.referral && event.postback.referral.ref;
        this.emit('postback', event.sender.id, postback);
      } else if (event.referral) {
        var _ref = event.referral.ref;
        this.emit('referral', event.sender.id, event, _ref);
      } else if (event.account_linking) {
        var link = event.account_linking;
        this.emit('account_link', event.sender.id, event, link);
      } else {
        console.error('Invalid format for message.');
      }
    }
    /*
     * Verify that the callback came from Facebook. Using the App Secret from 
     * the App Dashboard, we can verify the signature that is sent with each 
     * callback in the x-hub-signature field, located in the header.
     *
     * https://developers.facebook.com/docs/graph-api/webhooks#setup
     *
     */

  }, {
    key: "verifyRequestSignature",
    value: function verifyRequestSignature(req, res, buf) {
      var signature = req.headers["x-hub-signature"];

      if (!signature) {
        // For testing, let's log an error. In production, you should throw an 
        // error.
        console.error("Couldn't validate the signature.");
      } else {
        var elements = signature.split('='),
            method = elements[0],
            signatureHash = elements[1];
        var expectedHash = crypto.createHmac('sha1', this.APP_SECRET).update(buf).digest('hex');

        if (signatureHash != expectedHash) {
          throw new Error("Couldn't validate the request signature.");
        }
      }
    }
  }, {
    key: "addGreeting",
    value: function addGreeting(text) {
      request({
        url: "".concat(this.FB_URL, "me/thread_settings"),
        qs: {
          access_token: this.PAGE_ACCESS_TOKEN
        },
        method: 'POST',
        json: {
          "setting_type": "greeting",
          "greeting": {
            "text": text
          }
        }
      }, function (error, response, body) {
        if (error) {
          console.log('Error sending message: ', error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
        }
      });
    }
  }, {
    key: "addGetStartedButton",
    value: function addGetStartedButton() {
      request({
        url: "".concat(this.FB_URL, "me/messenger_profile"),
        qs: {
          access_token: this.PAGE_ACCESS_TOKEN
        },
        method: 'POST',
        json: {
          "get_started": {
            "payload": "GET_STARTED_PAYLOAD"
          }
        }
      }, function (error, response, body) {
        if (error) {
          console.log('Error sending messages: ', error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
        }
      });
    }
  }, {
    key: "addPersistentMenu",
    value: function addPersistentMenu(persistent_menu) {
      request({
        url: "".concat(this.FB_URL, "me/messenger_profile"),
        qs: {
          access_token: this.PAGE_ACCESS_TOKEN
        },
        method: 'POST',
        json: {
          "persistent_menu": persistent_menu
        }
      }, function (error, response, body) {
        if (error) {
          console.log('Error sending message: ', error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
        }
      });
    }
  }, {
    key: "removePersistentMenu",
    value: function removePersistentMenu() {
      request({
        url: "".concat(this.FB_URL, "me/thread_settings"),
        qs: {
          access_token: this.PAGE_ACCESS_TOKEN
        },
        method: 'POST',
        json: {
          setting_type: "call_to_actions",
          thread_state: "existing_thread",
          call_to_actions: []
        }
      }, function (error, response, body) {
        console.log(response);

        if (error) {
          console.log('Error sending messages: ', error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
        }
      });
    }
    /**
     * @param {Recipient|Object} recipientId Recipient object or ID.
     * @param {String} messageText
     */

  }, {
    key: "sendTextMessage",
    value: function sendTextMessage(recipientId, messageText) {
      this.callSendAPI({
        recipient: {
          id: recipientId
        },
        message: {
          text: messageText
        }
      });
    }
    /**
     * @param {Recipient|String} recipientId
     * @param {String} type Must be 'image', 'audio', 'video' or 'file'.
     * @param {String} url URL of the attachment.
     */

  }, {
    key: "sendAttachment",
    value: function sendAttachment(recipientId, type, url) {
      this.callSendAPI({
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: type,
            payload: {
              url: url
            }
          }
        }
      });
    }
    /**
     * @param {Recipient|String} recipientId
     * @param {Array.<Element>} elements
     */

  }, {
    key: "sendGenericMessage",
    value: function sendGenericMessage(recipientId, elements) {
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: elements
            }
          }
        }
      };
      this.callSendAPI(messageData);
    }
  }, {
    key: "sendButtonMessage",
    value: function sendButtonMessage(recipientId, text, buttons) {
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "button",
              text: text,
              buttons: buttons
            }
          }
        }
      };
      this.callSendAPI(messageData);
    }
  }, {
    key: "callSendAPI",
    value: function callSendAPI(messageData) {
      request({
        uri: "".concat(this.FB_URL, "me/messages"),
        qs: {
          access_token: this.PAGE_ACCESS_TOKEN
        },
        method: 'POST',
        json: messageData
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var recipientId = body.recipient_id,
              messageId = body.message_id;

          if (messageId) {
            console.log("Successfully sent message with id %s to recipient %s", messageId, recipientId);
          } else {
            console.log("Successfully called Send API for recipient %s", recipientId);
          }
        } else {
          console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
        }
      });
    }
    /**
     * @param {Recipient|String} recipientId
     * @param {Array.<String>} greetings
     * @param {String>} text 
     */

  }, {
    key: "sendWelcome",
    value: function sendWelcome(recipientId, greetings, text) {
      // this (aka "the context") is a special keyword inside each function and its value only depends on how the function was called, 
      // not how/when/where it was defined. It is not affected by lexical scopes, like other variables
      var self = this;
      request({
        url: "".concat(this.FB_URL) + recipientId + "?access_token=" + this.PAGE_ACCESS_TOKEN
      }, function (error, response, body) {
        if (error || response.statusCode != 200) return;
        var fbProfileBody = JSON.parse(body),
            userName = fbProfileBody["first_name"],
            randomGreeting = greetings[self.getRandomNumber(0, greetings.length - 1)],
            welcomeMsg = "".concat(randomGreeting, " ").concat(userName, " ").concat(text);
        self.sendTextMessage(recipientId, welcomeMsg);
      });
    }
    /*
    * Postback Event
    *
    * This event is called when a postback is tapped on a Structured Message. 
    * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
    * 
    */

  }, {
    key: "receivedPostback",
    value: function receivedPostback(event) {
      var senderID = event.sender.id,
          recipientID = event.recipient.id,
          timeOfPostback = event.timestamp,
          payload = event.postback.payload;
      console.log("Received postback for user %d and page %d with payload '%s' " + "at %d", senderID, recipientID, payload, timeOfPostback);
      this.sendTextMessage(senderID, "Postback called");
    }
    /*
     * Send a read receipt to indicate the message has been read
     *
     */

  }, {
    key: "sendReadReceipt",
    value: function sendReadReceipt(recipientId) {
      this.callSendAPI({
        recipient: {
          id: recipientId
        },
        sender_action: "mark_seen"
      });
    }
    /**
     * @param {Recipient|Object} recipientId Recipient object or ID.
     */

  }, {
    key: "sendTypingOn",
    value: function sendTypingOn(recipientId) {
      this.callSendAPI({
        recipient: {
          id: recipientId
        },
        sender_action: "typing_on"
      });
    }
    /**
     * @param {Recipient|Object} recipientId Recipient object or ID.
     */

  }, {
    key: "sendTypingOff",
    value: function sendTypingOff(recipientId) {
      this.callSendAPI({
        recipient: {
          id: recipientId
        },
        sender_action: "typing_off"
      });
    }
  }, {
    key: "getRandomNumber",
    value: function getRandomNumber(minimum, maxmimum) {
      return Math.floor(Math.exp(Math.random() * Math.log(maxmimum - minimum + 1))) + minimum;
    }
  }, {
    key: "randomIntFromInterval",
    value: function randomIntFromInterval(min, max) {
      return this.getRandomNumber(min, max);
    }
  }, {
    key: "textMatches",
    value: function textMatches(message, matchString) {
      return message.toLowerCase().indexOf(matchString) != -1;
    }
  }, {
    key: "logObject",
    value: function logObject(obj) {
      console.log(JSON.stringify(obj, null, 2));
    }
  }]);

  return MessengerBot;
}(EventEmitter);

module.exports = MessengerBot;