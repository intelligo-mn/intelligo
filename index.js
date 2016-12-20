'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// to post data
app.post('/webhook/', function (req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			if (text === 'Мэдээ') {
				sendGenericMessage(sender)
				continue
			}
			if (text === 'hi') {
				sendTextMessage(sender, "Сайн cайна уу монголоороо бичие ээ")
				continue
			}
			if (text === 'Hi') {
				sendTextMessage(sender, "Сайн cайна уу монголоороо бичие ээ")
				continue
			}
			if (text === 'сайн уу') {
				
				sendTextMessage(sender, "Сайн сайна уу юу байна даа")
				continue
			}
			if (text === 'xaxa') {
				sendTextMessage(sender, "чи өөрөө хах")
				continue
			}
			if (text === 'haha') {
				
				sendTextMessage(sender, "хуцаа чи")
					continue
			}
			if (text === 'чамайг хэн хийсэн бэ') {
				
			sendTextMessage(sender, "Төрөө гээд нэг залуу бий")
				continue
			}
			sendTextMessage(sender, "Сайн байна уу")
		}
		if (event.postback) {
			let text = JSON.stringify(event.postback)
			sendTextMessage(sender, ""+text.substring(0, 200), token)
			continue
		}
	}
	res.sendStatus(200)
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.PAGE_ACCESS_TOKEN
const token = "EAARx4ZCPHY40BAIraLY6LmSRJ5x7M2jPnE6o6ClZCj5475nEC6lsvRYrKuKpbag9JlkXQTWnU4mz6FSjgg3QSKe0jz8l5nZCCOPXQZANxqFHNAPIbKrJkBakJOwtXnALNFFchd8zjPUSYi4mubh8rqR3SRR9QVG70iBVBOWjKwZDZD"

function sendTextMessage(sender, text) {
	let messageData = { text:text }
	
	request({
		url: 'https://graph.facebook.com/v2.8/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendGenericMessage(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Сайн уу",
					"subtitle": "Амьдрал ямархуу байна даа",
					"buttons": [{
						"type": "postback",
						"title": "Дажгүй ээ",
						"payload": "Болж дээ хө",
					}, {
						"type": "postback",
						"title": "Өө муу муу",
						"payload": "За тэгээд юу болохгүй байнаа хө",
					}],
				}, {
					"title": "Худ худ",
					"subtitle": "Худ худ",
					"buttons": [{
						"type": "postback",
						"title": "дарчихаа",
						"payload": "аа ",
					}],
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.8/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
