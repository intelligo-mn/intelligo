import * as express from 'express';
import { EventEmitter } from 'eventemitter3';
import { json as _json } from 'body-parser';
import { createHmac } from 'crypto';
import * as request from 'request';
import * as intelligo from 'intelligo.js';

export class MessengerBot extends EventEmitter {
  PAGE_ACCESS_TOKEN: any;
  VALIDATION_TOKEN: any;
  APP_SECRET: any;
  FB_URL: any;
  app: any;
  webhook: any;
  intelligoClassifier: any;
  /**
   * @param params
   * @constructor
   */
  constructor(params: any) {
    super();
    if (!params || (params && (!params.PAGE_ACCESS_TOKEN || !params.VALIDATION_TOKEN || !params.APP_SECRET))) {
      throw new Error('You need to specify an PAGE_ACCESS_TOKEN, VALIDATION_TOKEN and APP_SECRET');
    }
    this.PAGE_ACCESS_TOKEN = params.PAGE_ACCESS_TOKEN;
    this.VALIDATION_TOKEN = params.VALIDATION_TOKEN;
    this.APP_SECRET = params.APP_SECRET;
    this.FB_URL = params.FB_URL || 'https://graph.facebook.com/v3.1/';
    this.app = params.app || express();
    this.webhook = params.webhook || '/webhook';
    this.app.use(_json({ verify: this.verifyRequestSignature.bind(this) }));
    this.intelligoClassifier;
  }

  learn(data: any) {
    // Repeat multiple levels
    const TextClassifier = intelligo.classifiers.multilabel.BinaryRelevance.bind(0, {
      binaryClassifierType: intelligo.classifiers.Winnow.bind(0, { retrain_count: 10 }),
    });

    const WordExtractor = (input: any, features: any) => {
      return input.split(' ').map((word: string | number) => {
        return (features[word] = 1);
      });
    };

    this.intelligoClassifier = new intelligo.classifiers.EnhancedClassifier({
      classifierType: TextClassifier,
      featureExtractor: WordExtractor,
    });

    this.intelligoClassifier.trainBatch(data);
  }

  answer(question: any) {
    const result = this.intelligoClassifier.classify(question);
    return result;
  }

  initWebhook() {
    /*
     * Use your own validation token. Check that the token used in the Webhook
     * setup is the same token used here.
     */
    this.app.get(this.webhook, (req: any, res: any) => {
      if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === this.VALIDATION_TOKEN) {
        console.log('Validating webhook');
        res.status(200).send(req.query['hub.challenge']);
      } else {
        console.error('Failed validation. Make sure the validation tokens match.');
        res.sendStatus(403);
      }
    });
    /*
     * All callbacks for Messenger are POST-ed. They will be sent to the same
     * webhook. Be sure to subscribe your app to your page to receive callbacks
     * for your page.
     * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
     */
    this.app.post(this.webhook, (req: any, res: any) => {
      var data = req.body;

      if (data.object === 'page') {
        for (const pageEntry of data.entry) {
          for (const messagingEvent of pageEntry.messaging) {
            this.handleEvent(messagingEvent);
          }
        }

        res.sendStatus(200);
      }
    });
  }

  // Iterate over each messaging event
  handleEvent(event: any) {
    if (event.optin) {
      let optin = event.optin.ref;
      this.emit('optin', event.sender.id, event, optin);
    } else if (typeof event.message === 'string') {
      this.emit('message', event);
    } else if (event.message && !event.message.is_echo) {
      this.emit('message', event);
    } else if (event.message && event.message.attachment) {
      this.emit('attachment', event.sender.id, event.message.attachment, event.message.url, event.message.quickReplies);
    } else if (event.delivery) {
      let mids = event.delivery.mids;
      this.emit('delivery', event.sender.id, event, mids);
    } else if (event.read) {
      let recipient = event.recipient.id;
      this.emit('read', event.sender.id, recipient, event.read);
    } else if (event.postback || (event.message && !event.message.is_echo && event.message.quick_reply)) {
      let postback = (event.postback && event.postback.payload) || event.message.quick_reply.payload;
      let ref = event.postback && event.postback.referral && event.postback.referral.ref;
      this.emit('postback', event.sender.id, postback);
    } else if (event.referral) {
      let ref = event.referral.ref;
      this.emit('referral', event.sender.id, event, ref);
    } else if (event.account_linking) {
      let link = event.account_linking;
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
  verifyRequestSignature(req: any, res: any, buf: any) {
    const signature = req.headers['x-hub-signature'];

    if (!signature) {
      // For testing, let's log an error. In production, you should throw an
      // error.
      console.error("Couldn't validate the signature.");
    } else {
      const elements = signature.split('='),
        method = elements[0],
        signatureHash = elements[1];

      const expectedHash = createHmac('sha1', this.APP_SECRET)
        .update(buf)
        .digest('hex');

      if (signatureHash != expectedHash) {
        throw new Error("Couldn't validate the request signature.");
      }
    }
  }

  addGreeting(text: string) {
    request(
      {
        url: `${this.FB_URL}me/thread_settings`,
        qs: { access_token: this.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
          setting_type: 'greeting',
          greeting: {
            text: text,
          },
        },
      },
      function(error, response, body) {
        if (error) {
          console.log('Error sending message: ', error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
        }
      },
    );
  }

  addGetStartedButton() {
    request(
      {
        url: `${this.FB_URL}me/messenger_profile`,
        qs: { access_token: this.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
          get_started: {
            payload: 'GET_STARTED_PAYLOAD',
          },
        },
      },
      function(error, response, body) {
        if (error) {
          console.log('Error sending messages: ', error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
        }
      },
    );
  }

  addPersistentMenu(persistent_menu: any) {
    request(
      {
        url: `${this.FB_URL}me/messenger_profile`,
        qs: { access_token: this.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
          persistent_menu: persistent_menu,
        },
      },
      function(error, response, body) {
        if (error) {
          console.log('Error sending message: ', error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
        }
      },
    );
  }

  removePersistentMenu() {
    request(
      {
        url: `${this.FB_URL}me/thread_settings`,
        qs: { access_token: this.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
          setting_type: 'call_to_actions',
          thread_state: 'existing_thread',
          call_to_actions: [],
        },
      },
      function(error, response, body) {
        console.log(response);
        if (error) {
          console.log('Error sending messages: ', error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
        }
      },
    );
  }

  /**
   * @param {Recipient|Object} recipientId Recipient object or ID.
   * @param {String} messageText
   */
  sendTextMessage(recipientId: any, messageText: string) {
    this.callSendAPI({
      recipient: {
        id: recipientId,
      },
      message: {
        text: messageText,
      },
    });
  }
  /**
   * @param {Recipient|String} recipientId
   * @param {String} type Must be 'image', 'audio', 'video' or 'file'.
   * @param {String} url URL of the attachment.
   */
  sendAttachment(recipientId: any, type: any, url: any) {
    this.callSendAPI({
      recipient: {
        id: recipientId,
      },
      message: {
        attachment: {
          type: type,
          payload: {
            url: url,
          },
        },
      },
    });
  }
  /**
   * @param {Recipient|String} recipientId
   * @param {Array.<Element>} elements
   */
  sendGenericMessage(recipientId: any, elements: any) {
    var messageData = {
      recipient: {
        id: recipientId,
      },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: elements,
          },
        },
      },
    };

    this.callSendAPI(messageData);
  }

  sendButtonMessage(recipientId: any, text: any, buttons: any) {
    var messageData = {
      recipient: {
        id: recipientId,
      },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: text,
            buttons: buttons,
          },
        },
      },
    };

    this.callSendAPI(messageData);
  }

  callSendAPI(messageData: any) {
    request(
      {
        uri: `${this.FB_URL}me/messages`,
        qs: { access_token: this.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: messageData,
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          const recipientId = body.recipient_id,
            messageId = body.message_id;

          if (messageId) {
            console.log('Successfully sent message with id %s to recipient %s', messageId, recipientId);
          } else {
            console.log('Successfully called Send API for recipient %s', recipientId);
          }
        } else {
          console.error('Failed calling Send API', response.statusCode, response.statusMessage, body.error);
        }
      },
    );
  }

  /**
   * @param {Recipient|String} recipientId
   * @param greetings
   * @param text
   */
  sendWelcome(recipientId: any, greetings: any, text: any) {
    // this (aka "the context") is a special keyword inside each function and its value only depends on how the function was called,
    // not how/when/where it was defined. It is not affected by lexical scopes, like other variables
    const self = this;
    request(
      {
        url: `${this.FB_URL}` + recipientId + `?access_token=` + this.PAGE_ACCESS_TOKEN,
      },
      function(error, response, body) {
        if (error || response.statusCode != 200) return;

        const fbProfileBody = JSON.parse(body),
          userName = fbProfileBody['first_name'],
          randomGreeting = greetings[self.getRandomNumber(0, greetings.length - 1)],
          welcomeMsg = `${randomGreeting} ${userName} ${text}`;
        self.sendTextMessage(recipientId, welcomeMsg);
      },
    );
  }

  /*
   * Postback Event
   *
   * This event is called when a postback is tapped on a Structured Message.
   * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
   *
   */
  receivedPostback(event: any) {
    const senderID = event.sender.id,
      recipientID = event.recipient.id,
      timeOfPostback = event.timestamp,
      payload = event.postback.payload;

    console.log(
      "Received postback for user %d and page %d with payload '%s' " + 'at %d',
      senderID,
      recipientID,
      payload,
      timeOfPostback,
    );

    this.sendTextMessage(senderID, 'Postback called');
  }

  /*
   * Send a read receipt to indicate the message has been read
   *
   */
  sendReadReceipt(recipientId: any) {
    this.callSendAPI({
      recipient: {
        id: recipientId,
      },
      sender_action: 'mark_seen',
    });
  }
  /**
   * @param {Recipient|Object} recipientId Recipient object or ID.
   */
  sendTypingOn(recipientId: any) {
    this.callSendAPI({
      recipient: {
        id: recipientId,
      },
      sender_action: 'typing_on',
    });
  }
  /**
   * @param {Recipient|Object} recipientId Recipient object or ID.
   */
  sendTypingOff(recipientId: any) {
    this.callSendAPI({
      recipient: {
        id: recipientId,
      },
      sender_action: 'typing_off',
    });
  }

  getRandomNumber(minimum: number, maxmimum: number) {
    return Math.floor(Math.exp(Math.random() * Math.log(maxmimum - minimum + 1))) + minimum;
  }

  randomIntFromInterval(min: number, max: number) {
    return this.getRandomNumber(min, max);
  }

  textMatches(message: string, matchString: string) {
    return message.toLowerCase().indexOf(matchString) != -1;
  }
}