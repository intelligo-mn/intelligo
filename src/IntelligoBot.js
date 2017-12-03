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
    this.accessToken = options.accessToken;
    this.verifyToken = options.verifyToken;
    this.appSecret = options.appSecret;
    this.app = express();
    this.webhook = options.webhook || '/webhook';
    this.webhook = this.webhook.charAt(0) !== '/' ? `/${this.webhook}` : this.webhook;
    this.app.use(bodyParser.json({ verify: this.verifyRequestSignature.bind(this) }));
    this.techstarClassifier;
  }
    
  start(port) {
    this.app.set('port', process.env.PORT || port);
    this.app.listen(this.app.get('port'), () => {
      console.log('IntelligoBot server is running on port', this.app.get('port'));
    });
    this.initWebhook();
  }
  
  initWebhook() {
    this.app.get(this.webhook, (req, res) => {
      if (req.query['hub.mode'] === 'subscribe' &&
          req.query['hub.verify_token'] === this.verifyToken) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
      } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);          
      }  
    });
    
    this.app.post(this.webhook, (req, res) => {
      var data = req.body;
    
      if (data.object == 'page') {
       
        data.entry.forEach((pageEntry) => {
          var pageID = pageEntry.id;
          var timeOfEvent = pageEntry.time;
    
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
  
      var expectedHash = crypto.createHmac('sha1', this.appSecret)
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
      qs: {access_token: this.accessToken},
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
    var similarQuestions = new Array();
    var sum = "";
    
    var json = JSON.parse(fs.readFileSync('./data/training_data.json', 'utf8'));
    json.forEach(function(data){
      var words = data.input.split(" ");
      //Start a given keyword or locate neighbor words
      if(words.indexOf(keyword) != -1){
        var index = words.indexOf(keyword);
        //to get the word neighbor with the word
        var neighborWord = index == words.length ? words[index-1]+" "+keyword : keyword+" "+words[index+1];
        //the word has not been registered before
        if(sum.indexOf(neighborWord)==-1)
          sum+= sum=="" ? neighborWord : ","+neighborWord;
        similarQuestions.push({"content_type":"text","title":neighborWord});
      }
    });
    return sum;
  }
  //ask questions from similar words
  askSimilarOptions(recipientId, words){
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: "Since your search is too general, select from the following options",
        quick_replies: words
      }
    };
  
    this.callSendAPI(messageData);
  }
  
  //clear more characters
  cleanJSON(json){
    for(var i=0; i<json.length; i++){
      json[i].input = json[i].input.replace("/[\?\,\:]/", "");
    }
  }
  
  ai(opt){
    if(opt.json) {
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
      
      this.techstarClassifier.trainBatch(JSON.parse(fs.readFileSync(opt.json, 'utf8')));
      console.log("AI суралцаж дууслаа." + (new Date().getTime()-startedTime)/1000+" секундэд уншиж дууслаа.");
        
    } else if (opt.question) {
      var startedTime = new Date().getTime();
      console.log("AI хариултыг хайж байна...");
      var result =  this.techstarClassifier.classify(opt.question);
      console.log("AI хариултыг оллоо.  \n " + (new Date().getTime()-startedTime)/1000+" секундэд уншиж дууслаа.");
      return result;
    }
  }
  
  learn (json){
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
    
    this.techstarClassifier.trainBatch(JSON.parse(fs.readFileSync(json, 'utf8')));
    console.log("AI суралцаж дууслаа." + (new Date().getTime()-startedTime)/1000+" секундэд уншиж дууслаа.");  
  }
  
  answer (question) {
    var startedTime = new Date().getTime();
    console.log("AI хариултыг хайж байна...");
    var result =  this.techstarClassifier.classify(question);
    console.log("AI хариултыг оллоо.  \n " + (new Date().getTime()-startedTime)/1000+" секундэд уншиж дууслаа.");
    return result;
  }
  
  // текст илгээх
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
  
  callSendAPI(messageData) {
    request({
      uri: 'https://graph.facebook.com/v2.9/me/messages',
      qs: { access_token: this.accessToken },
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
          + '?access_token=' + this.accessToken
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