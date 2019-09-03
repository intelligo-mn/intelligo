---
title: Intelligo Messenger
sidebar: auto
sidebarDepth: 2
---

## Quick Start

The quickest way to get started with intelligo is to utilize the [`intelligo-generator`](https://github.com/intelligo-systems/intelligo-generator) to generate an bot as shown below:

Install the command line tool

```bash
$ npm install intelligo-cli -g
```

## Configuration

Generate the your messenger bot project:

<p align="center">
<img width="100%" src="https://raw.githubusercontent.com/intelligo-systems/intelligo-cli/master/.github/intelligo-cli-messenger.gif">
</p>

Set the values in `config/default.json` before running the bot. Using your Facebook Page's / App's `ACCESS_TOKEN`, `VERIFY_TOKEN` and `APP_SECRET`

- `ACCESS_TOKEN:` A page access token for your app, found under App -> Products -> Messenger -> Settings -> Token Generation
- `VERIFY_TOKEN:` A token that verifies your webhook is being called. Can be any value, but needs to match the value in App -> Products -> Webhooks -> Edit Subscription
- `APP_SECRET:` A app secret for your app, found under App -> Settings -> Basic -> App Secret -> Show

**Note:** If you don't know how to get these tokens, take a look at Facebook's [Quick Start Guide](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) .


### Install dependencies:

```bash
$ npm install
```

### Run your bot

Start your bot app:

```bash
$ npm start
```

## Intelligo 

| `params` key | Type | Default | Required |
|:--------------|:-----|:--------|:---------|
| `ACCESS_TOKEN` | string | | `Y` |
| `VERIFY_TOKEN` | string | | `Y` |
| `APP_SECRET` | string | | `Y` |
| `webhook` | string | `"/webhook"` | `N` |
| `graphApiVersion` | string | `4.0` | `N` |

Creates a new `Intelligo.MessengerBot` instance. Instantiates the new express app and all required webhooks. `params` param must contain all tokens and app secret of your Facebook app.

If you want to specify a custom endpoint name for your webhook, you can do it with the `webhook` option.


## Receive API

Use these methods to subscribe your bot to messages, attachments or anything the user might send.

### `.on(event, callback)`

| Param | Type | Default | Required |
|:------|:-----|:--------|:---------|
| `event` | string | | `Y` |
| `callback` | function | | `Y` |

Subscribe to an event emitted by the bot, and execute a callback when those events are emitted. Available events are:

| Event | Description |
|:------|:-----|
| `message` | The bot received a text message from the user |
| `quick_reply` | The bot received a quick reply from the user (quick replies emit both `message` and `quick_reply` events) |
| `attachment` | The bot received an attachment from the user |
| `postback` | The bot received a postback call from the user (usually means the user clicked a button) |
| `delivery` | The bot received a confirmation that your message was delivered to the user |
| `read` | The bot received a confirmation that your message was read by the user |
| `authentication` | A user has started a conversation with the bot using a "Send to Messenger" button |
| `referral` | A user that already has a thread with the bot starts a conversation. [more](https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_referrals) |

### `.on()` examples:

```javascript
bot.on("message", event => {
	console.log('A text message was received!');
});

bot.on('attachment', event => {
	console.log('An attachment was received!');
});

```

## Send API

Intelligo provides helper methods for every type of message supported by Facebook's Messenger API. It also provides a generic `sendTextMessage` method that you can use to send a custom payload. All messages from the Send API return a Promise that you can use to apply actions after a message was successfully sent. You can use this to send consecutive messages and ensure that they're sent in the right order.

Example:

```javascript
bot.on("message", event => {
  const senderID = event.sender.id,
    message = event.message;
  bot.sendTextMessage(senderID, 'Hello World');
});

```

### Sending text
 
#### `sendTextMessage(userId, message [, options])`

Send messages to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param   | Type                              | Description                                                                                                                                                                                                                       |
| ------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId  | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient][send-api-reference#recipient] object.                                                                                                                                         |
| message | `Object`                          | [message](https://developers.facebook.com/docs/messenger-platform/reference/send-api#message) object.                                                                                                                             |
| options | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) or [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |

Example:

```js
bot.sendTextMessage(USER_ID, {
  text: 'Hello World!',
});
```

You can specifiy [messaging type](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) using options. If `messaging_type` and `tag` is not provided, `UPDATE` will be used as default messaging type.

Example:

```js
bot.sendTextMessage(
  USER_ID,
  {
    text: 'Hello!',
  },
  {
    messaging_type: 'RESPONSE',
  }
);
```

### Sending Attachments

#### `sendAttachment(userId, attachment [, options])`

Send attachment messages to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param            | Type                              | Description                                                                                                                                                                                                                       |
| ---------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId           | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient][send-api-reference#recipient] object.                                                                                                                                         |
| attachment       | `Object`                          | [attachment](https://developers.facebook.com/docs/messenger-platform/reference/send-api#attachment) object.                                                                                                                       |
| options          | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) or [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |
| options.filename | Required when upload from buffer. |

Example:

```js
bot.sendAttachment(USER_ID, {
  type: 'image',
  payload: {
    url: 'https://example.com/pic.png',
  },
});
```

<br />

### Sending Audio

#### `sendAudioMessage(userId, audio [, options])`

Send sounds to specified user by uploading them or sharing a URL using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param            | Type                                                                         | Description                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId           | <code>String &#124; Object</code>                                            | Page-scoped user ID of the recipient or [recipient][send-api-reference#recipient] object.                                                         |
| audio            | <code>String &#124; Buffer &#124; ReadStream &#124; AttachmentPayload</code> | The audio to be sent.                                                                                                                             |
| options          | `Object`                                                                     | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |
| options.filename | Required when upload from buffer.                                            |

Example:

- Send audio using url string:

```js
bot.sendAudioMessage(USER_ID, 'https://intelligo.js.org/audio.mp3');
```

- Use `AttachmentPayload` to send cached attachment:

```js
bot.sendAudioMessage(USER_ID, { attachment_id: '55688' });
```

- Use `ReadStream` created from local file:

```js
const fs = require('fs');

bot.sendAudioMessage(USER_ID, fs.createReadStream('audio.mp3'));
```

- Use `Buffer` to send attachment:

```js
bot.sendAudioMessage(USER_ID, buffer, { filename: 'audio.mp3' });
```

<br />

### Sending Image

#### `sendImageMessage(userId, image [, options])`

Send images to specified user by uploading them or sharing a URL using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request). Supported formats are jpg, png and gif.

| Param            | Type                                                                         | Description                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId           | <code>String &#124; Object</code>                                            | Page-scoped user ID of the recipient or [recipient][send-api-reference#recipient] object.                                                         |
| image            | <code>String &#124; Buffer &#124; ReadStream &#124; AttachmentPayload</code> | The image to be sent.                                                                                                                             |
| options          | `Object`                                                                     | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |
| options.filename | Required when upload from buffer.                                            |

Example:

- Send image using url string:

```js
bot.sendImageMessage(USER_ID, 'https://intelligo.js.org/logo.jpg');
```

- Use `AttachmentPayload` to send cached attachment:

```js
bot.sendImageMessage(USER_ID, { attachment_id: '55688' });
```

- Use `ReadStream` created from local file:

```js
const fs = require('fs');

bot.sendImageMessage(USER_ID, fs.createReadStream('image.jpg'));
```

- Use `Buffer` to send attachment:

```js
bot.sendImageMessage(USER_ID, buffer, { filename: 'image.jpg' });
```

<br />

### Sending Video

#### `sendVideo(userId, video [, options])`

Send videos to specified user by uploading them or sharing a URL using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param            | Type                                                                         | Description                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId           | <code>String &#124; Object</code>                                            | Page-scoped user ID of the recipient or [recipient][send-api-reference#recipient] object.                                                         |
| video            | <code>String &#124; Buffer &#124; ReadStream &#124; AttachmentPayload</code> | The video to be sent.                                                                                                                             |
| options          | `Object`                                                                     | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |
| options.filename | Required when upload from buffer.                                            |

Example:

- Send video using url string:

```js
bot.sendVideoMessage(USER_ID, 'https://intelligo.js.org/video.mp4');
```

- Use `AttachmentPayload` to send cached attachment:

```js
bot.sendVideoMessage(USER_ID, { attachment_id: '55688' });
```

- Use `ReadStream` created from local file:

```js
const fs = require('fs');

bot.sendVideoMessage(USER_ID, fs.createReadStream('video.mp4'));
```

- Use `Buffer` to send attachment:

```js
bot.sendVideoMessage(USER_ID, buffer, { filename: 'video.mp4' });
```

<br />

### Sending File

#### `sendFileMessage(userId, file [, options])`

Send files to specified user by uploading them or sharing a URL using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param            | Type                                                                         | Description                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId           | <code>String &#124; Object</code>                                            | Page-scoped user ID of the recipient or [recipient][send-api-reference#recipient] object.                                                         |
| file             | <code>String &#124; Buffer &#124; ReadStream &#124; AttachmentPayload</code> | The file to be sent.                                                                                                                              |
| options          | `Object`                                                                     | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |
| options.filename | Required when upload from buffer.                                            |

Example:

- Send file using url string:

```js
bot.sendFileMessage(USER_ID, 'https://intelligo.js.org/document.pdf');
```

- Use `AttachmentPayload` to send cached attachment:

```js
bot.sendFileMessage(USER_ID, { attachment_id: '55688' });
```

- Use `ReadStream` created from local file:

```js
const fs = require('fs');

bot.sendFileMessage(USER_ID, fs.createReadStream('document.pdf'));
```

- Use `Buffer` to send attachment:

```js
bot.sendFileMessage(USER_ID, buffer, { filename: 'file.pdf' });
```

<br />

<a id="templates" />

## Message Templates

### Sending a Message Template 

`sendTemplate(userId, template [, options])`

Send structured message templates to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param    | Type                              | Description                                                                                                                                                                                                                       |
| -------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId   | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient][send-api-reference#recipient] object.                                                                                                                                         |
| template | `Object`                          | Object of the template.                                                                                                                                                                                                           |
| options  | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) or [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |

Example:

```js
bot.sendTemplate(USER_ID, {
  template_type: 'button',
  text: 'title',
  buttons: [
    {
      type: 'postback',
      title: 'Start Chatting',
      payload: 'USER_DEFINED_PAYLOAD',
    },
  ],
});
```

<br />

## Messenger Profile API

### Greeting Text

#### `.addGreeting(text)`

[Facebook Docs](https://developers.facebook.com/docs/messenger-platform/messenger-profile/greeting-text)

| Param | Type | Default | Required |
|:------|:-----|:--------|:---------|
| `text` | string or array | | `Y` |

Set a greeting text for new conversations. The Greeting Text is only rendered the first time the user interacts with a the Page on Messenger.

**Localization support:** `text` can be a string containing the greeting text, or an array of objects to support multiple locales. For more info on the format of these objects, see [the documentation](https://developers.facebook.com/docs/messenger-platform/messenger-profile/greeting-text).

Example

```javascript
bot.addGreeting(
  "cryptocurrency trading bot."
);
```

### Get Started Button 

#### `.addGetStartedButton(action)`

[Facebook Docs](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/get-started-button)

| Param | Type | Default | Required |
|:------|:-----|:--------|:---------|
| `action` | string or function | | `Y` |

React to a user starting a conversation with the bot by clicking the Get Started button. If `action` is a string, the Get Started button postback will be set to that string. If it's a function, that callback will be executed when a user clicks the Get Started button.

#### `.deleteGetStartedButton()`

Removes the Get Started button call to action.

### The Persistent Menu 

#### `.setPersistentMenu(buttons, [ disableInput ])`

[Facebook Docs](https://developers.facebook.com/docs/messenger-platform/messenger-profile/persistent-menu)

| Param | Type | Default | Required |
|:------|:-----|:--------|:---------|
| `buttons` | array of strings or objects | | `Y` |
| `disableInput ` | boolean | `false` | `N` |

Creates a Persistent Menu that is available at any time during the conversation. The `buttons` param can be an array of strings, button objects, or locale objects.

If `disableInput` is set to `true`, it will disable user input in the menu. The user will only be able to interact with the bot via the menu, postbacks, buttons and webviews.

**Localization support:** if `buttons` is an array of objects containing a `locale` attribute, it will be used as-is, expecting it to be an array of localized menues. For more info on the format of these objects, see [the documentation](https://developers.facebook.com/docs/messenger-platform/messenger-profile/persistent-menu).

Example 

```javascript
bot.addPersistentMenu([
  {
    locale: "default",
    composer_input_disabled: false,
    call_to_actions: [
      {
        title: "Home",
        type: "postback",
        payload: "HOME"
      },
      {
        title: "About",
        type: "nested",
        call_to_actions: [
          {
            type: "web_url",
            title: "Crypto Bot",
            url: "https://www.intelligo.systems",
            webview_height_ratio: "full"
          }
        ]
      },
      {
        title: "Contact Info",
        type: "postback",
        payload: "CONTACT"
      }
    ]
  }
]);
```

#### `.removePersistentMenu()`

Removes the Persistent Menu.

----------------------