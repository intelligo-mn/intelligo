'use strict';

const express = require('express'),
      config = require('config'),
      request = require('request'),
      async = require('async'),
      fs = require('fs'),
      path = require('path'),
      Intelligo = require('intelligo');

const app = express();

const PAGE_ACCESS_TOKEN = (process.env.PAGE_ACCESS_TOKEN) ?
  (process.env.PAGE_ACCESS_TOKEN) :
  config.get('PAGE_ACCESS_TOKEN');

const VALIDATION_TOKEN = (process.VALIDATION_TOKEN) ?
  (process.env.VALIDATION_TOKEN) :
  config.get('VALIDATION_TOKEN');

const APP_SECRET = (process.env.APP_SECRET) ?
  (process.env.APP_SECRET) :
  config.get('APP_SECRET');

const bot = new Intelligo({
  PAGE_ACCESS_TOKEN: PAGE_ACCESS_TOKEN,
  VALIDATION_TOKEN: VALIDATION_TOKEN,
  APP_SECRET: APP_SECRET,
  FB_URL: 'https://graph.facebook.com/v3.1/',
  app: app
});

bot.initWebhook();
bot.addGreeting("Japanese-English-Mongolian dictionary chatbot. It lets you find words, kanji and more quickly and easily.");
bot.addGetStartedButton();
bot.addPersistentMenu([
    {
      "locale":"default",
      "composer_input_disabled": false,
      "call_to_actions":[
        {
          "title":"Home",
          "type":"postback",
          "payload":"HOME"
        },
        {
          "title":"About",
          "type":"nested",
          "call_to_actions":[
            {
              "type":"web_url",
              "title":"Jisho.org",
              "url":"https://www.jisho.org",
              "webview_height_ratio":"full"
            },
            {
              "type":"web_url",
              "title":"Source code",
              "url":"https://github.com/techstar-cloud/memorize-bot",
              "webview_height_ratio":"full"
            }
          ]
        },
        {
          "title":"Contact Info",
          "type":"postback",
          "payload":"CONTACT"
        }
      ]
    }
  ]);


bot.on('message', (event) => {

  const senderID = event.sender.id,
        message = event.message;

  if (message.text) {
      bot.sendTypingOn(senderID);
      
      request({
          uri: 'https://jisho.org/api/v1/search/words?keyword='+message.text.toLowerCase(),

        }, function (error, response, body) {
          if (!error) {

            let res = JSON.parse(body);
            
            let dataSet = [];

            if (res.data.length > 0) {
              
                async.eachLimit(res.data, 5, function(content, callback){
                 
                  let definitions = [];
                  for (let i = 0; i < content.senses.length; i++){
                    definitions.push(content.senses[i].english_definitions);
                  }
                  let senses = definitions.join("\n");
  
                  // markdown format
                  // space after commas
                  senses = senses.replace(/,/gm, ', ');
                  // adds a bullet at the beginning of each line
                  senses = senses.replace(/^/gm, '・');
  
                  // message with the result to send
                  let word_defined = (content.japanese[0].word != undefined) ? content.japanese[0].word : content.japanese[0].reading;
                  
                  dataSet.push({
                    title: content.japanese[0].reading+" : "+word_defined,
                    subtitle: senses,
                    item_url: "http://jisho.org/search/" + word_defined,
                    image_url: "https://techstar-cloud-tortuvshin.c9users.io/background.jpg",
                    buttons: [
                      {
                        "type":"web_url",
                        "title":"Search jisho",
                        "url":"http://jisho.org/search/" + word_defined,
                        "webview_height_ratio":"full"
                      }
                    ]
                  });
                  
                }, function(error){
                    console.error(error);
                });
              
                console.log(dataSet);
                bot.sendGenericMessage(senderID, dataSet);
              }
              // if the query doesn't return any result
              else {
                  bot.sendTextMessage(senderID, "Result not found ");
              }
          } else {
            console.error("Failed calling jisho API");
          }
      });
      bot.sendTypingOff(senderID);
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});
