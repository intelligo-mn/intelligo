'use strict';

const EventEmitter = require('eventemitter3'),
      express = require( 'express'),
      path = require( 'path'),
      morgan = require( 'morgan'),
      bodyParser = require( 'body-parser'), 
      config = require( 'config'),
      crypto = require( 'crypto'),
      https = require( 'https'),
      request = require( 'request'),
      session = require( 'express-session'),
      synaptic = require( 'synaptic'),
      TechstarAI = require('techstar-ai');


class IntelligoBot extends EventEmitter {
  constructor(options) {
    super();
    this.accessToken = options.accessToken;
    this.verifyToken = options.verifyToken;
    this.appSecret = options.appSecret;
    this.app = express();
    this.webhook = options.webhook || '/webhook';
    this.webhook = this.webhook.charAt(0) !== '/' ? `/${this.webhook}` : this.webhook;
    this.app.use(bodyParser.json({ verify: this.verifyRequestSignature.bind(this) }));
  }
  
  start(port) {
    this._initWebhook();
    this.app.set('port', port || 3000);
    this.server = this.app.listen(this.app.get('port'), () => {
      console.log('IntelligoBot server is running on port', this.app.get('port'));
    });
  }
  
  webhook() {
    this.app.get(this.webhook, function(req, res) {
      if (req.query['hub.mode'] === 'subscribe' &&
          req.query['hub.verify_token'] === VALIDATION_TOKEN) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
      } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);          
      }  
    });
    
    this.app.post(this.webhook, function (req, res) {
      var data = req.body;
    
      if (data.object == 'page') {
       
        data.entry.forEach(function(pageEntry) {
          var pageID = pageEntry.id;
          var timeOfEvent = pageEntry.time;
    
          pageEntry.messaging.forEach(function(messagingEvent) {
            if (messagingEvent.message) {
              this.receivedMessage(messagingEvent);
            } else if (messagingEvent.delivery) {
              receivedDeliveryConfirmation(messagingEvent);
            } else if (messagingEvent.postback) {
              receivedPostback(messagingEvent);
            } else if (messagingEvent.read) {
              receivedMessageRead(messagingEvent);
            } else if (messagingEvent.account_linking) {
              receivedAccountLink(messagingEvent);
            }else {
              console.log("Webhook received unknown messagingEvent: ", messagingEvent);
            }
          });
        });
    
        res.sendStatus(200);
      }
    });
  }
  
  receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;
  
    console.log("Received message for user %d and page %d at %d with message:", 
      senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));
  
    var isEcho = message.is_echo;
    var messageId = message.mid;
    var appId = message.app_id;
    var metadata = message.metadata;
  
    var messageText = message.text;
    var messageAttachments = message.attachments;
    var quickReply = message.quick_reply;
  
    if (isEcho) {
      console.log("Received echo for message %s and app %d with metadata %s", 
        messageId, appId, metadata);
      return;
    } else if (quickReply) {
      var quickReplyPayload = quickReply.payload;
      console.log("Quick reply for message %s with payload %s",
        messageId, quickReplyPayload);
  
      sendTextMessage(senderID, "Quick reply tapped");
      return;
    }
  
    if (messageText) {
      
      var result = answerAI(messageText);
      
      
      if (messageText == "update")
        sendTextMessage(senderID, updateJSON());    
      else if (textMatches(messageText, "зураг")) 
        sendImageMessage(senderID);
      else if (textMatches(messageText, "gif")) 
          sendGifMessage(senderID);
      else if (textMatches(messageText, "get started")) 
          sendWelcome(senderID);
      else if (textMatches(messageText, "дуу")) 
          sendAudioMessage(senderID);
      else if (textMatches(messageText, "бичлэг")) 
          sendVideoMessage(senderID);
      else if (textMatches(messageText, "файл")) 
          sendFileMessage(senderID);
      else if (textMatches(messageText, "товч")) 
          sendButtonMessage(senderID);
      else if (textMatches(messageText, "вэб")) 
          sendWebUrl(senderID);
      else if (textMatches(messageText, "утас")) 
          sendPhoneNumber(senderID);
      else if (textMatches(messageText, "судалгаа")) 
          sendFormUrl(senderID);
      else if (textMatches(messageText, "quick reply")) 
        sendQuickReply(senderID);
      else if (textMatches(messageText, "read receipt")) 
        sendReadReceipt(senderID);
      else if (textMatches(messageText, "typing on")) 
        sendTypingOn(senderID);
      else if (textMatches(messageText, "typing off")) 
        sendTypingOff(senderID);
      else if (textMatches(messageText, "сургалт")) 
        sendGenericMessage(senderID);
      else if (textMatches(messageText, "хичээл")) 
        sendReceiptMessage(senderID);
      else if (textMatches(messageText, "тусламж")) 
        sendHelp(senderID);
      else if(result == null || result == '')
        sendTextMessage(senderID, "Уучлаарай, та асуултаа тодорхтой оруулна уу.");
      else
        sendTextMessage(senderID, result+"");
        
      
    } else if (messageAttachments) {
      sendTextMessage(senderID, "Message with attachment received");
    }
  }
  
  
  verifyRequestSignature(req, res, buf) {
    var signature = req.headers["x-hub-signature"];
  
    if (!signature) {
      console.error("Couldn't validate the signature.");
    } else {
      var elements = signature.split('=');
      var method = elements[0];
      var signatureHash = elements[1];
  
      var expectedHash = crypto.createHmac('sha1', this.appSecret)
                          .update(buf)
                          .digest('hex');
  
      if (signatureHash != expectedHash) {
        throw new Error("Couldn't validate the request signature.");
      }
    }
  }
}

module.exports = IntelligoBot;