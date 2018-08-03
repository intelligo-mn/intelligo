'use strict';

const express = require( 'express'),
      EventEmitter = require('eventemitter3'),
      bodyParser = require( 'body-parser'),
      crypto = require( 'crypto'),
      request = require( 'request'),
      TechstarAI = require('techstar-ai');

class IntelligoBot extends EventEmitter{
  constructor(options) {
    super();
    if (!options || (options && (!options.PAGE_ACCESS_TOKEN || !options.VALIDATION_TOKEN || !options.APP_SECRET))) {
      throw new Error("You need to specify an PAGE_ACCESS_TOKEN, VALIDATION_TOKEN and APP_SECRET");
    }
    this.PAGE_ACCESS_TOKEN = options.PAGE_ACCESS_TOKEN;
    this.VALIDATION_TOKEN = options.VALIDATION_TOKEN;
    this.APP_SECRET = options.APP_SECRET;
    this.api = options.api;
    this.app = options.app || express();
    this.webhook = options.webhook || '/webhook';
    this.app.use(bodyParser.json({ verify: this.verifyRequestSignature.bind(this) }));
    this.techstarClassifier;
  }

  learn (data){
      console.log("AI суралцаж эхэллээ...");
      const startedTime = new Date().getTime();
      // Repeat multiple levels
      const TextClassifier = TechstarAI.classifiers.multilabel.BinaryRelevance.bind(0, {
          binaryClassifierType: TechstarAI.classifiers.Winnow.bind(0, {retrain_count: 100})
      });

      const WordExtractor = (input, features) => {
          return input.split(" ").map(word => features[word] = 1);
      };

      this.techstarClassifier = new TechstarAI.classifiers.EnhancedClassifier({
          classifierType: TextClassifier,
          featureExtractor: WordExtractor
      });

      this.techstarClassifier.trainBatch(data);
      console.log("AI суралцаж дууслаа." + (new Date().getTime()-startedTime)/1000+" секундэд уншиж дууслаа.");
  }

  learnRequest(url){
      request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {

              console.log("AI суралцаж эхэллээ...");

              const startedTime = new Date().getTime();
              // Repeat multiple levels
              const TextClassifier = TechstarAI.classifiers.multilabel.BinaryRelevance.bind(0, {
                  binaryClassifierType: TechstarAI.classifiers.Winnow.bind(0, {retrain_count: 100})
              });

              // Unblock the words in the sentence with spaces and create attributes
              const WordExtractor = (input, features) => {
                  return input.split(" ").map(word => features[word] = 1);
              };

              this.techstarClassifier = new TechstarAI.classifiers.EnhancedClassifier({
                  classifierType: TextClassifier,
                  featureExtractor: WordExtractor
              });

              this.techstarClassifier.trainBatch(JSON.parse(body));
              console.log("AI суралцаж дууслаа." + (new Date().getTime()-startedTime)/1000+" секундэд уншиж дууслаа.");
          }
      })
  }

  answer (question) {
      const startedTime = new Date().getTime();
      console.log("AI хариултыг хайж байна...");
      const result =  this.techstarClassifier.classify(question);
      console.log("AI хариултыг оллоо.  \n " + (new Date().getTime()-startedTime)/1000+" секундэд уншиж дууслаа.");
      return result;
  }

  initWebhook() {
      this.app.get(this.webhook, (req, res) => {
          if (req.query['hub.mode'] === 'subscribe' &&
              req.query['hub.verify_token'] === this.VALIDATION_TOKEN) {
              console.log("Validating webhook");
              res.status(200).send(req.query['hub.challenge']);
          } else {
              console.error("Failed validation. Make sure the validation tokens match.");
              res.sendStatus(403);
          }
      });

      this.app.post(this.webhook, (req, res) => {
          var data = req.body;

          if (data.object === 'page') {
              for(const pageEntry of data.entry){
                  for(const messagingEvent of pageEntry.messaging){
                    this.handleEvent(messagingEvent);
                  }
              }

              res.sendStatus(200);
          }
      });
  }
  
  handleEvent(message) { 
    if (message.optin) {
        let optin = message.optin.ref;
        this.emit('optin', message.sender.id, message, optin);
    } else if (message.message) {
         this.emit('message', message);
    } else if (message.delivery) {
        let mids = message.delivery.mids;
        this.emit('delivery', message.sender.id, message, mids);
    } else if (message.read) {
        let recipient = message.recipient.id;
        this.emit('read', message.sender.id, recipient, message.read);
    } else if (message.postback || (message.message && !message.message.is_echo && message.message.quick_reply)) {
        let postback = (message.postback && message.postback.payload) || message.message.quick_reply.payload;
        let ref = message.postback && message.postback.referral && message.postback.referral.ref;
        this.emit('postback', message.sender.id, message, postback, ref);
    } else if (message.referral) {
        let ref = message.referral.ref;
        this.emit('referral', message.sender.id, message, ref);
    } else if (message.account_linking) {
        let link = message.account_linking;
        this.emit('account_link', message.sender.id, message, link);
    }
  }

  verifyRequestSignature(req, res, buf) {
      const signature = req.headers["x-hub-signature"];

      if (!signature) {
          console.error("Couldn't validate the signature.");
      } else {
          const elements = signature.split('='),
              method = elements[0],
              signatureHash = elements[1];

          const expectedHash = crypto.createHmac('sha1', this.APP_SECRET)
              .update(buf)
              .digest('hex');

          if (signatureHash != expectedHash) {
              throw new Error("Couldn't validate the request signature.");
          }
      }
  }

  setGreeting(text){
    request({
      url: 'https://graph.facebook.com/v2.11/me/thread_settings',
      qs: {access_token: this.PAGE_ACCESS_TOKEN},
      method: 'POST',
      json: {
        "setting_type":"greeting",
        "greeting":{
          "text": text
          }
        }
      }, function(error, response, body) {
        if (error) {
          console.log('Error sending message: ', error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
      }
    });

  }

  sendTextMessage(recipientId, messageText) {
      this.callSendAPI({
          recipient: {
              id: recipientId
          },
          message: {
              text: messageText
          }
      });
  }

  sendImageMessage(recipientId, imageUrl) {
      this.callSendAPI({
          recipient: {
              id: recipientId
          },
          message: {
              attachment: {
                  type: "image",
                  payload: {
                      url:  imageUrl
                  }
              }
          }
      });
  }

  sendGifMessage(recipientId, gifUrl) {
      this.callSendAPI({
          recipient: {
              id: recipientId
          },
          message: {
              attachment: {
                  type: "image",
                  payload: {
                      url: gifUrl
                  }
              }
          }
      });
  }

  sendAudioMessage(recipientId, audioUrl) {
      this.callSendAPI({
          recipient: {
              id: recipientId
          },
          message: {
              attachment: {
                  type: "audio",
                  payload: {
                      url: audioUrl
                  }
              }
          }
      });
  }

  sendVideoMessage(recipientId, videoUrl) {
      this.callSendAPI({
          recipient: {
              id: recipientId
          },
          message: {
              attachment: {
                  type: "video",
                  payload: {
                      url: videoUrl
                  }
              }
          }
      });
  }

  sendFileMessage(recipientId, fileUrl) {
      this.callSendAPI({
          recipient: {
              id: recipientId
          },
          message: {
              attachment: {
                  type: "file",
                  payload: {
                      url: fileUrl
                  }
              }
          }
      });
  }

  callSendAPI(messageData) {
      request({
          uri: 'https://graph.facebook.com/v2.11/me/messages',
          qs: { access_token: this.PAGE_ACCESS_TOKEN },
          method: 'POST',
          json: messageData

      }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              const recipientId = body.recipient_id,
                  messageId = body.message_id;

              if (messageId) {
                  console.log("Successfully sent message with id %s to recipient %s",
                      messageId, recipientId);
              } else {
                  console.log("Successfully called Send API for recipient %s",
                      recipientId);
              }
          } else {
              console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
          }
      });
  }

  sendWelcome(recipientId, greetings, text) {
      // this (aka "the context") is a special keyword inside each function and its value only depends on how the function was called, 
      // not how/when/where it was defined. It is not affected by lexical scopes, like other variables
      const self = this;
      request({
              url: 'https://graph.facebook.com/v2.11/' + recipientId
              + '?access_token=' + this.PAGE_ACCESS_TOKEN
          },
          function (error, response, body) {
              if (error || response.statusCode != 200) return;

              const fbProfileBody = JSON.parse(body),
                  userName = fbProfileBody["first_name"],
                  randomGreeting = greetings[self.getRandomNumber(0, greetings.length - 1)],
                  welcomeMsg = `${randomGreeting} ${userName} ${text}`;
              self.sendTextMessage(recipientId, welcomeMsg);
          }
      );
  }

  receivedPostback(event) {
      const senderID = event.sender.id,
          recipientID = event.recipient.id,
          timeOfPostback = event.timestamp,
          payload = event.postback.payload;

      console.log("Received postback for user %d and page %d with payload '%s' " +
          "at %d", senderID, recipientID, payload, timeOfPostback);

      this.sendTextMessage(senderID, "Postback called");
  }

  sendReadReceipt(recipientId) {

      this.callSendAPI({
          recipient: {
              id: recipientId
          },
          sender_action: "mark_seen"
      });
  }

  sendTypingOn(recipientId) {

      this.callSendAPI({
          recipient: {
              id: recipientId
          },
          sender_action: "typing_on"
      });
  }

  sendTypingOff(recipientId) {
      this.callSendAPI({
          recipient: {
              id: recipientId
          },
          sender_action: "typing_off"
      });
  }

  getRandomNumber(minimum, maxmimum) {
    return Math.floor(Math.exp(Math.random()*Math.log(maxmimum-minimum+1)))+minimum;
  }

  randomIntFromInterval(min,max) {
    return this.getRandomNumber(min, max);
  }

  textMatches(message, matchString) {
    return message.toLowerCase().indexOf(matchString) != -1;
  }

  logObject(obj) {
    console.log(JSON.stringify(obj, null, 2));
  }
}

module.exports = IntelligoBot;
