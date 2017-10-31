'use strict';

const express = require( 'express'),
      path = require( 'path'),
      morgan = require( 'morgan'),
      bodyParser = require( 'body-parser'), 
      config = require( 'config'),
      crypto = require( 'crypto'),
      https = require( 'https'),
      request = require( 'request'),
      session = require( 'express-session'),
      synaptic = require( 'synaptic'),
      NaturalSynaptic = require( 'natural-synaptic'),
      limdu = require('limdu');

const app = express();

app.set('port', process.env.PORT || 5000);
app.use(morgan('dev'));
app.use(bodyParser.json({ verify: verifyRequestSignature }));               
app.use('/', express.static(path.join(__dirname, './../public')));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

var Neuron = synaptic.Neuron,
  	Layer = synaptic.Layer,
  	Network = synaptic.Network,
  	Trainer = synaptic.Trainer,
  	Architect = synaptic.Architect;
var limduClassifier; //limdu classifier
var network; //synaptic network

const APP_SECRET = (process.env.MESSENGER_APP_SECRET) ? 
  process.env.MESSENGER_APP_SECRET :
  config.get('appSecret');

const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?
  (process.env.MESSENGER_VALIDATION_TOKEN) :
  config.get('validationToken');

const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
  (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
  config.get('pageAccessToken');

const SERVER_URL = (process.env.SERVER_URL) ?
  (process.env.SERVER_URL) :
  config.get('serverURL');
  
if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN && SERVER_URL)) {
  console.error("Missing config values");
  process.exit(1);
}

request({
  url: 'https://graph.facebook.com/v2.9/me/thread_settings',
  qs: {access_token: PAGE_ACCESS_TOKEN},
  method: 'POST',
  json: {
    "setting_type":"call_to_actions",
    "thread_state":"new_thread",
    "call_to_actions":[
      {
        "payload":"PAYLOAD_NEW_THREAD"
      }
    ]
  }
}, function(error, response, body) {
  if (error) {
    console.log('Error sending message: ', error);
  } else if (response.body.error) {
    console.log('Error: ', response.body.error);
  }
});

// greeting
request({
  url: 'https://graph.facebook.com/v2.9/me/thread_settings',
  qs: {access_token: PAGE_ACCESS_TOKEN},
  method: 'POST',
  json: {
    "setting_type":"greeting",
    "greeting":{
      "text": "Hi i am techstar AI bot."
      }
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
  }
});


// persistent menu
request({
  url: 'https://graph.facebook.com/v2.8/me/thread_settings',
  qs: {access_token: PAGE_ACCESS_TOKEN},
  method: 'POST',
  json: {
    "setting_type":"call_to_actions",
    "thread_state" : "existing_thread",
    "call_to_actions":[
      {
        "type":"postback",
        "title":"💪 Get Started"
      },
      {
        "type":"web_url",
        "title":"🤖 Танилцуулга 👉",
        "url":SERVER_URL
      },
      {
        "type":"web_url",
        "title":"Тусламж",
        "url":SERVER_URL
      }
    ]
  }
}, function(error, response, body) {
  if (error) {
    console.log('Error sending message: ', error);
  } else if (response.body.error) {
    console.log('Error: ', response.body.error);
  }
});

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});

app.post('/webhook', function (req, res) {
  var data = req.body;

  if (data.object == 'page') {
   
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.message) {
          receivedMessage(messagingEvent);
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

function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', APP_SECRET)
                        .update(buf)
                        .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

function receivedMessage(event) {
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
    
    //Хэрэглэгчийн хайсан өгөгдөл олдсон эсэх
    if(result == null || result == ''){
      sendTextMessage(senderID, "Уучлаарай, та асуултаа тодорхтой оруулна уу.");
      // askMore(senderID, messageText);
    }
    else if (messageText == "update")
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
    else
      sendTextMessage(senderID, result+"");
    
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}
//to find clarification and search for user search data
function askMore(senderID, messageText){
      var similarWords = findSimilarKeyword(messageText);
      if(similarWords.length != 0){
        sendTextMessage(senderID, "Дараах түлхүүр үгүүдээс сонгоно уу");
        sendTextMessage(senderID, similarWords);
        // askSimilarOptions(senderID, similarWords);
      }
      else
        sendTextMessage(senderID, "Таны хайсан өгөгдөл олдсонгүй!");
}
//find similar questions when searching for a findable data
function findSimilarKeyword(keyword){
  //Send neighboring words to arrays as an option
  var similarQuestions = new Array();
  var sum = "";
  readJSON().forEach(function(data){
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
function askSimilarOptions(recipientId, words){
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Since your search is too general, select from the following options",
      quick_replies: words
    }
  };

  callSendAPI(messageData);
}
//Read the data from the json file
function readJSON(){
  var fs = require('fs');
  return JSON.parse(fs.readFileSync('data/training_data.json', 'utf8'));
}

//clear more characters
function cleanJSON(json){
  for(var i=0; i<json.length; i++){
    json[i].input = json[i].input.replace("/[\?\,\:]/", "");
  }
}

function learnAI(json){
  console.log("AI суралцаж эхэллээ...");
  var startedTime = new Date().getTime();
  // Repeat multiple levels
  var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
  	binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 100})
  });
  
  // Unblock the words in the sentence with spaces and create attributes
  var WordExtractor = function(input, features) {
  	input.split(" ").forEach(function(word) {
  		features[word]=1;
  	});
  };
  
  limduClassifier = new limdu.classifiers.EnhancedClassifier({
  	classifierType: TextClassifier,
  	featureExtractor: WordExtractor
  });
  
  limduClassifier.trainBatch(json);
  console.log("AI суралцаж дууслаа. \n Нийт "+json.length + " ширхэг өгөдлийг " + (new Date().getTime()-startedTime)/1000+" секундэд уншиж дууслаа.");
}

function answerAI(question){
  var startedTime = new Date().getTime();
  console.log("AI хариултыг хайж байна...");
  var result =  limduClassifier.classify(question);
  console.log("AI хариултыг оллоо.  \n " + (new Date().getTime()-startedTime)/1000+" секундэд уншиж дууслаа.");
  return result;
}

// текст илгээх
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.9/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
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

function sendWelcome(recipientId) {
  request({
      url: 'https://graph.facebook.com/v2.8/' + recipientId 
        + '?access_token=' + PAGE_ACCESS_TOKEN
    },
    function (error, response, body) {
      if (error || response.statusCode != 200) return;
    
      var fbProfileBody = JSON.parse(body);
      var userName = fbProfileBody["first_name"];
      var greetings = ["Hey", "Hello", "Good Evening", "Good Morning", "What's up", "Сайн уу","Юу байна", "Сайн уу"];
      var randomGreeting = getRandomItemFromArray(greetings);
      var welcomeMsg = `${randomGreeting} ${userName}, 
I am Techstar AI bot.
¯\\_(ツ)_/¯ .
      `;
      sendTextMessage(recipientId, welcomeMsg);
    }
  );
}


function sendHelp(recipientId) {
  var Desc = `
  🤖 Help 👉
  
  Help = this...
  why = ??
  how = source code link
  `;
  sendTextMessage(recipientId, Desc);
}

function receivedDeliveryConfirmation(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var delivery = event.delivery;
  var messageIDs = delivery.mids;
  var watermark = delivery.watermark;
  var sequenceNumber = delivery.seq;

  if (messageIDs) {
    messageIDs.forEach(function(messageID) {
      console.log("Received delivery confirmation for message ID: %s", 
        messageID);
    });
  }

  console.log("All message before %d were delivered.", watermark);
}


function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  sendTextMessage(senderID, "Postback called");
}

function receivedMessageRead(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  var watermark = event.read.watermark;
  var sequenceNumber = event.read.seq;

  console.log("Received message read event for watermark %d and sequence " +
    "number %d", watermark, sequenceNumber);
}

function receivedAccountLink(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  var status = event.account_linking.status;
  var authCode = event.account_linking.authorization_code;

  console.log("Received account link event with for user %d with status %s " +
    "and auth code %s ", senderID, status, authCode);
}

function sendImageMessage(recipientId) {
  sendTypingOn(receiptId);
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url:  SERVER_URL+"/img/pro.png"
        }
      }
    }
  };

  callSendAPI(messageData);
  sendTypingOff(recipientId);
}

function sendGifMessage(recipientId) {
  sendTypingOn(recipientId);
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: SERVER_URL+"/img/giphy.gif"
        }
      }
    }
  };

  callSendAPI(messageData);
  sendTypingoff(recipientId);
}

function sendAudioMessage(recipientId) {
  sendTypingOn(recipientId);
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "audio",
        payload: {
          url: SERVER_URL+"/img/duu.mp3"
        }
      }
    }
  };

  callSendAPI(messageData);
  sendTypingOff(receiptId);
}

function sendVideoMessage(recipientId) {
  sendTypingOn(recipientId);
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "video",
        payload: {
          url: SERVER_URL+"/img/eminem.mov"
        }
      }
    }
  };

  callSendAPI(messageData);
  sendTypingOff(recipientId);
}

function sendFileMessage(recipientId) {
  sendTypingOn(recipientId);
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "file",
        payload: {
          url: SERVER_URL+"/img/hi.txt"
        }
      }
    }
  };

  callSendAPI(messageData);
  sendTypingOff(recipientId);
}

function sendButtonMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Холбоо барих мэдээллүүд",
          buttons:[{
            type: "web_url",
            url: SERVER_URL,
            title: "Вэб хуудас"
          }, {
            type: "phone_number",
            title: "Утасны дугаар",
            payload: "+97689860933"
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

function sendPhoneNumber (recipientId) {
    var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Холбоо барих утасны дугаар",
          buttons:[{
            type: "phone_number",
            title: "Утасруу залгах",
            payload: "+97689860933"
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

function sendWebUrl(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Вэб хуудас",
          buttons:[{
            type: "web_url",
            url: SERVER_URL,
            title: "Вэб хуудас"
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}


function sendFormUrl(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Судалгаа",
          buttons:[{
            type: "web_url",
            url: "https://docs.google.com/forms/",
            title: "Судалгаа өгөх"
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}


function sendGenericMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "IBT",
            subtitle: "IELTS, TOEFL-д бэлдэнэ",
            item_url: SERVER_URL,               
            image_url: SERVER_URL+"/img/pro.png",
            buttons: [{
              type: "web_url",
              url: SERVER_URL,
              title: "Вэбэд зочлох"
            }, {
              type: "postback",
              title: "Болих",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "Nogoonjade",
            subtitle: "Nogoonjade сургалтын төв",
            item_url: SERVER_URL,               
            image_url: SERVER_URL+"/img/pro.png",
            buttons: [{
              type: "web_url",
              url: SERVER_URL,
              title: "Вэбэд зочлох"
            }, {
              type: "postback",
              title: "Болих",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

function sendReceiptMessage(recipientId) {
  var receiptId = "order" + Math.floor(Math.random()*1000);

  var messageData = {
    recipient: {
      id: recipientId
    },
    message:{
      attachment: {
        type: "template",
        payload: {
          template_type: "receipt",
          recipient_name: "ToRoo",
          order_number: receiptId,
          currency: "USD",
          payment_method: "Visa 1234",        
          timestamp: "1428444852", 
          elements: [ {
            title: "IELTS",
            subtitle: "Төлбөртэй хичээл үзсэн",
            quantity: 1,
            price: 99.99,
            currency: "USD",
            image_url: SERVER_URL + "/assets/gearvrsq.png"
          }],
          address: {
            street_1: "Itpark",
            street_2: "",
            city: "",
            postal_code: "94025",
            state: "Ulaanbaatar",
            country: "Mongolia"
          },
          summary: {
            subtotal: 698.99,
            shipping_cost: 20.00,
            total_tax: 57.67,
            total_cost: 626.66
          },
          adjustments: [{
            name: "New Customer Discount",
            amount: -50
          }, {
            name: "$100 Off Coupon",
            amount: -100
          }]
        }
      }
    }
  };

  callSendAPI(messageData);
}

function sendQuickReply(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What's your favorite movie genre?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Action",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"Comedy",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        },
        {
          "content_type":"text",
          "title":"Drama",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
        }
      ]
    }
  };

  callSendAPI(messageData);
}


function sendReadReceipt(recipientId) {
  console.log("Sending a read receipt to mark message as seen");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "mark_seen"
  };

  callSendAPI(messageData);
}

function sendTypingOn(recipientId) {
  console.log("Turning typing indicator on");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_on"
  };

  callSendAPI(messageData);
}

function sendTypingOff(recipientId) {
  console.log("Turning typing indicator off");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_off"
  };

  callSendAPI(messageData);
}

function getRandomNumber(minimum, maxmimum) {
  return Math.floor(Math.exp(Math.random()*Math.log(maxmimum-minimum+1)))+minimum;
}

function randomIntFromInterval(min,max) {
  return getRandomNumber(min, max);
}

function textMatches(message, matchString) {
  return message.toLowerCase().indexOf(matchString) != -1;
}

function getRandomItemFromArray(items) {
  var random_item = items[getRandomNumber(0, items.length - 1)];
  return random_item;
}

function logObject(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

app.listen(app.get('port'), function() {
  console.log('Bot server is running on port', app.get('port'));
  //learn start here
  learnAI(readJSON());
});

module.exports = app;