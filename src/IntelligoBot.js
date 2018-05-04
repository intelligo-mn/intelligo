'use strict';

const express = require( 'express'),
      EventEmitter = require('eventemitter3'),
      bodyParser = require( 'body-parser'), 
      crypto = require( 'crypto'), 
      request = require( 'request'),
      fs = require('fs'),
      TechstarAI = require('techstar-ai');
      
class IntelligoBot extends EventEmitter{
  constructor(options) {
    super();
    if (!options || (options && (!options.PAGE_ACCESS_TOKEN || !options.VALIDATION_TOKEN || !options.APP_SECRET))) {
      throw new Error("You need to specify an PAGE_ACCESS_TOKEN, VALIDATION_TOKEN and APP_SECRET");
    }
    this._PAGE_ACCESS_TOKEN = options.PAGE_ACCESS_TOKEN;
    this._VALIDATION_TOKEN = options.VALIDATION_TOKEN;
    this._APP_SECRET = options.APP_SECRET;
    this._api = options.api;
    this._app = options.app || express();
    this._webhook = options.webhook || '/webhook';
    this._webhook = this._webhook.charAt(0) !== '/' ? `/${this._webhook}` : this._webhook;
    this.app.use(bodyParser.json({ verify: this.verifyRequestSignature.bind(this) }));
    this._techstarClassifier;
  }
  
  get techstarClassifier(){
  	return this._techstarClassifier;
  }
  
  set techstarClassifier(value){
  	this._techstarClassifier = value;
  }
  
  get webhook(){
  	return this._webhook;
  }
  
  set webhook(value){
  	this._webhook = value;
  }
  
  get app(){
  	return this._app;
  }
  
  set app(value){
  	this._app = value;
  }
  
  get api(){
  	return this._api;
  }
  
  set api(value){
  	this._api = value;
  }
  
  get APP_SECRET(){
  	return this._APP_SECRET;
  }
  
  set APP_SECRET(value){
  	this._APP_SECRET = value;
  }
  
  get VALIDATION_TOKEN(){
  	return this._VALIDATION_TOKEN;
  }
  
  set VALIDATION_TOKEN(value){
  	this._VALIDATION_TOKEN = value;
  }
  
  get PAGE_ACCESS_TOKEN(){
  	return this._PAGE_ACCESS_TOKEN;
  }
  
  set PAGE_ACCESS_TOKEN(value){
  	this._PAGE_ACCESS_TOKEN = value;
  }
  
  //to find clarification and search for user search data
  askMore(senderID, messageText){
    var similarWords = this.findSimilarKeyword(messageText);
    if(similarWords.length != 0){
      this.sendTextMessage(senderID, "Дараах түлхүүр үгүүдээс сонгоно уу");
      this.sendTextMessage(senderID, similarWords);
      // askSimilarOptions(senderID, similarWords);
    }
    else
      this.sendTextMessage(senderID, "Таны хайсан өгөгдөл олдсонгүй!");
  }
  
  //find similar questions when searching for a findable data
  findSimilarKeyword(keyword){
        //Send neighboring words to arrays as an option
        let similarQuestions = new Array();
        let sum = "";
        
        var json = JSON.parse(fs.readFileSync("./data/training_data.json", "utf8"));
        for(const data of json){
            const words = data.input.split(" ");
            if(words.includes(keyword)){
                const index = words.indexOf(keyword);
                const neighborWord = index === words.length ? words[index-1] + " " + keyword : keyword + " " + words[index+1];
                if(!sum.includes(neighborWord)){
                    sum += sum == '' ? neighborWord : ',' + neighborWord;
                    similarQuestions.push({ "content_type": "text", "title": neighborWord });
                }
            }
        }
        return sum;
    }
  //ask questions from similar words
  askSimilarOptions(recipientId, words){
        this.callSendAPI({
            recipient: {
                id: recipientId
            },
            message: {
                text: "Since your search is too general, select from the following options",
                quick_replies: words
            }
        });
    }
  
  //clear more characters
    cleanJSON(json){
        for(var i=0; i<json.length; i++){
            json[i].input = json[i].input.replace("/[\?\,\:]/", "");
        }
        return json;
    }
  
  learn (json){
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

        this.techstarClassifier.trainBatch(JSON.parse(fs.readFileSync(json, 'utf8')));
        console.log("AI суралцаж дууслаа." + (new Date().getTime()-startedTime)/1000+" секундэд уншиж дууслаа.");
    }
  
  learnRequest(url){
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        
        console.log("AI суралцаж эхэллээ...");
        
        var startedTime = new Date().getTime();
        // Repeat multiple levels
        var TextClassifier = TechstarAI.classifiers.multilabel.BinaryRelevance.bind(0, {
        	binaryClassifierType: TechstarAI.classifiers.Winnow.bind(0, {retrain_count: 100})
        });
        
        // Unblock the words in the sentence with spaces and create attributes
        var WordExtractor = function(input, features) {
        	input.split(" ").forEach(function(word) {
        		features[word]=1;
        	});
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
    var startedTime = new Date().getTime();
    console.log("AI хариултыг хайж байна...");
    var result =  this.techstarClassifier.classify(question);
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
       
        data.entry.forEach((pageEntry) => {
          pageEntry.messaging.forEach((messagingEvent) => {
            if (messagingEvent.message) {
              this.receivedMessage(messagingEvent);
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
  
      this.sendTextMessage(senderID, "Quick reply tapped");
      return;
    }
  
    if (messageText) {
      
      var result = this.answer(messageText);
      
      if (messageText == "update")
        this.sendTextMessage(senderID, this.updateJSON());
      else if (this.textMatches(messageText, "get started")) 
        this.sendWelcome(senderID);
      else if (this.textMatches(messageText, "help")) 
        this.sendHelp(senderID);
      else if(result == null || result == '')
        this.sendTextMessage(senderID, "Уучлаарай, та асуултаа тодорхтой оруулна уу.");
      else
        this.sendTextMessage(senderID, result+"");
    } else if (messageAttachments) {
        this.sendTextMessage(senderID, "Message with attachment received");
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
  
      var expectedHash = crypto.createHmac('sha1', this.APP_SECRET)
                          .update(buf)
                          .digest('hex');
  
      if (signatureHash != expectedHash) {
        throw new Error("Couldn't validate the request signature.");
      }
    }
  }
  
  setGreeting(text){
    request({
      url: 'https://graph.facebook.com/v2.9/me/thread_settings',
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
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText
      }
    };
  
    this.callSendAPI(messageData);
  }
  
  sendImageMessage(recipientId, imageUrl) {
    var messageData = {
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
    };
  
    this.callSendAPI(messageData);
  }
  
  sendGifMessage(recipientId, gifUrl) {
    var messageData = {
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
    };
  
    this.callSendAPI(messageData);
  }
  
  sendAudioMessage(recipientId, audioUrl) {
    var messageData = {
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
    };
  
    this.callSendAPI(messageData);
  }
  
  sendVideoMessage(recipientId, videoUrl) {
    var messageData = {
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
    };
  
    this.callSendAPI(messageData);
  }
  
  sendFileMessage(recipientId, fileUrl) {
    var messageData = {
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
    };
  
    this.callSendAPI(messageData);
  }
  
  callSendAPI(messageData) {
    request({
      uri: 'https://graph.facebook.com/v2.9/me/messages',
      qs: { access_token: this.PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: messageData
  
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;
  
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
  
  sendWelcome(recipientId) {
    request({
        url: 'https://graph.facebook.com/v2.8/' + recipientId 
          + '?access_token=' + this.PAGE_ACCESS_TOKEN
      },
      function (error, response, body) {
        if (error || response.statusCode != 200) return;
      
        var fbProfileBody = JSON.parse(body);
        var userName = fbProfileBody["first_name"];
        var greetings = ["Hey", "Hello", "Good Evening", "Good Morning", "What's up"];
        var randomGreeting = this.getRandomItemFromArray(greetings);
        var welcomeMsg = `${randomGreeting} ${userName}, 
  I am Techstar AI bot.
  ¯\\_(ツ)_/¯ .
        `;
        this.sendTextMessage(recipientId, welcomeMsg);
      }
    );
  }
  
  sendHelp(recipientId) {
    var Desc = `
    🤖 Help 👉
    
    Help = this...
    why = ??
    how = source code link
    `;
    this.sendTextMessage(recipientId, Desc);
  }
  
  receivedPostback(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;
  
    var payload = event.postback.payload;
  
    console.log("Received postback for user %d and page %d with payload '%s' " + 
      "at %d", senderID, recipientID, payload, timeOfPostback);
  
    this.sendTextMessage(senderID, "Postback called");
  }
 
  sendReadReceipt(recipientId) {
    console.log("Sending a read receipt to mark message as seen");
  
    var messageData = {
      recipient: {
        id: recipientId
      },
      sender_action: "mark_seen"
    };
  
    this.callSendAPI(messageData);
  }
  
  sendTypingOn(recipientId) {
    console.log("Turning typing indicator on");
  
    var messageData = {
      recipient: {
        id: recipientId
      },
      sender_action: "typing_on"
    };
  
    this.callSendAPI(messageData);
  }
  
  sendTypingOff(recipientId) {
    console.log("Turning typing indicator off");
  
    var messageData = {
      recipient: {
        id: recipientId
      },
      sender_action: "typing_off"
    };
  
    this.callSendAPI(messageData);
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
  
  getRandomItemFromArray(items) {
    var random_item = items[this.getRandomNumber(0, items.length - 1)];
    return random_item;
  }
  
  logObject(obj) {
    console.log(JSON.stringify(obj, null, 2));
  }

}

module.exports = IntelligoBot;
