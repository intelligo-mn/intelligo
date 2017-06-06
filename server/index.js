import express from 'express';
import path from 'path';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY
import config from 'config';
import crypto from 'crypto';
import https from 'https';
import request from 'request';
import session from 'express-session';

import api from './routes';

const app = express();
const port = process.env.PORT;
// const port = 3000;
const devPort = 4000;

app.use(morgan('dev'));
app.use(bodyParser.json({ verify: verifyRequestSignature }));               

app.use('/', express.static(path.join(__dirname, './../public')));

/* setup routers & static directory */
app.use('/api', api);

app.get('/team', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/team.html'));
});

app.get('/app', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/words.html'));
});


/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

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
  url: 'https://graph.facebook.com/v2.8/me/thread_settings',
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
  url: 'https://graph.facebook.com/v2.8/me/thread_settings',
  qs: {access_token: PAGE_ACCESS_TOKEN},
  method: 'POST',
  json: {
    "setting_type":"greeting",
    "greeting":{
      "text": "Сайн байна уу! Би Memorize бот байна."
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
        "title":"💪 Шинэ үг авах"
      },
      {
        "type":"web_url",
        "title":"😌 Судалгаа өгөх",
        "url":"https://docs.google.com/forms/d/e/1FAIpQLSfMbmOLRuss7NqBlgzMN3HZWIKs4_k9NHiBigqVO-l_D3_QEQ/viewform",
        "webview_height_ratio": "full"
      },
      {
        "type":"postback",
        "title":"🌟 Тохиргоо"
      },
      
      {
        "type":"web_url",
        "title":"🤖 Танилцуулга 👉",
        "url":""+SERVER_URL
      },
      {
        "type":"web_url",
        "title":"Тусламж",
        "url":""+SERVER_URL
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
        if (messagingEvent.optin) {
          receivedAuthentication(messagingEvent);
        } else if (messagingEvent.message) {
          receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        } else if (messagingEvent.read) {
          receivedMessageRead(messagingEvent);
        } else if (messagingEvent.account_linking) {
          receivedAccountLink(messagingEvent);
        } else {
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

    if (textMatches(messageText, "зураг")) 
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
    else if (textMatches(messageText, "шинэ үг")) 
      sendLanguageLevel(senderID);
    else if (textMatches(messageText, "сургалт")) 
      sendGenericMessage(senderID);
    else if (textMatches(messageText, "хичээл")) 
      sendReceiptMessage(senderID);
    else if (textMatches(messageText, "тохиргоо")) 
      sendSettings(senderID);
    else if (textMatches(messageText, "тусламж")) 
      sendHelp(senderID);
    else
      sendWelcome(senderID);
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
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
Намайг Memorize Bot гэдэг!
Таныг сонирхолтой байдлаар хэл сурахад туслана.
¯\\_(ツ)_/¯ .
      `;
      sendTextMessage(recipientId, welcomeMsg);
    }
  );
}
function sendHelp(recipientId) {
  var Desc = `
  🤖 Тусламж 👉
  Та дараах коммандуудыг ашиглаж илүү их зүйл мэдэх боломжтой 
  шинэ үг = Шинэ үг авах ;)
  бичлэг = сонирхолтой бичлэг үзэх
  дуу = сонсголын сайжруулах
  зураг = Meme зураг авах
  gif  = хөдөлгөөнтэй зурагнууд
  судалгаа = судалгаа өгөх
  тохиргоо = шинэ үг авах цаг болон IELTS, TOEFL ямар төрлийн шинэ үг авах вэ
  Тусламж = this...
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
          url:  ""+SERVER_URL+"/img/pro.png"
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
          url: ""+SERVER_URL+"/img/giphy.gif"
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
          url: ""+SERVER_URL+"/img/duu.mp3"
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
          url: ""+SERVER_URL+"/img/eminem.mov"
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
          url: ""+SERVER_URL+"/img/hi.txt"
        }
      }
    }
  };

  callSendAPI(messageData);
  sendTypingOff(recipientId);
}

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText,
      metadata: "DEVELOPER_DEFINED_METADATA"
    }
  };

  callSendAPI(messageData);
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
            url: "https://docs.google.com/forms/d/e/1FAIpQLSfMbmOLRuss7NqBlgzMN3HZWIKs4_k9NHiBigqVO-l_D3_QEQ/viewform?c=0&w=1",
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
            image_url: ""+SERVER_URL+"/img/pro.png",
            buttons: [{
              type: "web_url",
              url: ""+SERVER_URL,
              title: "Вэбэд зочлох"
            }, {
              type: "postback",
              title: "Болих",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "Nogoonjade",
            subtitle: "Nogoonjade сургалтын төв",
            item_url: ""+SERVER_URL,               
            image_url: ""+SERVER_URL+"/img/pro.png",
            buttons: [{
              type: "web_url",
              url: ""+SERVER_URL,
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

function sendSettings(recipientId){
 var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Та өдөрт хэдэн цагт шинэ үг хүлээн авахаа тохируулна уу?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"08:00",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"13:00",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        },
        {
          "content_type":"text",
          "title":"18:00",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

function sendLanguageLevel(recipientId){
 var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Та ямар ангилалын үг хүлээн авахаа сонгоно уу?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"TOEFL",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"IELTS",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
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

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.8/me/messages',
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

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}