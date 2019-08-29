
## Quick Start

The quickest way to get started with intelligo is to utilize the [`intelligo-cli`](https://github.com/intelligo-systems/intelligo-cli) to generate an bot as shown below:

Install the command line tool

```bash
$ npm install intelligo-cli -g
```

### Configuration

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

#### `new Intelligo.MessengerBot(options)`

| `options` key | Type | Default | Required |
|:--------------|:-----|:--------|:---------|
| `accessToken` | string | | `Y` |
| `verifyToken` | string | | `Y` |
| `appSecret` | string | | `Y` |
| `webhook` | string | `"/webhook"` | `N` |
| `graphApiVersion` | string | `4.0` | `N` |

Creates a new `Intelligo.MessengerBot` instance. Instantiates the new express app and all required webhooks. `options` param must contain all tokens and app secret of your Facebook app.

If you want to specify a custom endpoint name for your webhook, you can do it with the `webhook` option.


### Receive API

Use these methods to subscribe your bot to messages, attachments or anything the user might send.

#### `.on(event, callback)`

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

##### `.on()` examples:

```javascript
bot.on("message", event => {
	console.log('A text message was received!');
});

bot.on('attachment', event => {
	console.log('An attachment was received!');
});

```

### Send API

BootBot provides helper methods for every type of message supported by Facebook's Messenger API. It also provides a generic `sendMessage` method that you can use to send a custom payload. All messages from the Send API return a Promise that you can use to apply actions after a message was successfully sent. You can use this to send consecutive messages and ensure that they're sent in the right order.

Example:

```javascript
bot.on("message", event => {
  const senderID = event.sender.id,
    message = event.message;
  bot.sendTextMessage(senderID, 'Hello World');
});

```

#### `.sendTextMessage()`

| Method signature |
|:-----------------|
| `bot.sendTextMessage(userId, text, [ quickReplies, options ])` |

The `text` param must be a string containing the message to be sent.

The `quickReplies` param can be an array of strings or [quick_reply objects](https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies).


#### `.sendButtonTemplate()`

| Method signature |
|:-----------------|
| `bot.sendButtonTemplate(userId, text, buttons, [ options ])` |

The `text` param must be a string containing the message to be sent.

The `buttons` param can be an array of strings or [button objects](https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template).


#### `.sendGenericTemplate()`

| Method signature |
|:-----------------|
| `bot.sendGenericTemplate(userId, elements, [ options ])` |

The `elements` param must be an array of [element objects](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template).

The `options` param extends `options` param of the [`.say()`](#say) method with `imageAspectRatio` property.

#### `.sendListTemplate()`

| Method signature |
|:-----------------|
| `bot.sendListTemplate(userId, elements, buttons, [ options ])` |

The `elements` param must be an array of [element objects](https://developers.facebook.com/docs/messenger-platform/send-api-reference/list-template).

The `buttons` param can be an array with one element: string or [button object](https://developers.facebook.com/docs/messenger-platform/send-api-reference/list-template).

The `options` param extends `options` param of the [`.say()`](#say) method with `topElementStyle` property.

#### `.sendTemplate()`

| Method signature |
|:-----------------|
| `bot.sendTemplate(userId, payload, [ options ])` |

Use this method if you want to send a custom template `payload`, like a [receipt template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/receipt-template) or an [airline itinerary template](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-itinerary-template).


#### `.sendAttachment()`

| Method signature |
|:-----------------|
| `bot.sendAttachment(userId, type, url, [ quickReplies, options ])` |

The `type` param must be `'image'`, `'audio'`, `'video'` or `'file'`.

The `url` param must be a string with the URL of the attachment.

The `quickReplies` param can be an array of strings or [quick_reply objects](https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies).

#### `.sendAction()`

| Method signature |
|:-----------------|
| `bot.sendAction(userId, action, [ options ])` |

The `action` param must be `'mark_seen'`, `'typing_on'` or `'typing_off'`. To send a typing indicator in a more convenient way, see the [`.sendTypingIndicator`](#sendtypingindicator) method.


#### `.sendMessage()`

| Method signature |
|:-----------------|
| `bot.sendMessage(userId, message, [ options ])` |

Use this method if you want to send a custom `message` object.

#### `.sendTypingOn()`

| Method signature |
|:-----------------|
| `bot.sendTypingOn(userId)` |

#### `.sendTypingOff()`

| Method signature |
|:-----------------|
| `bot.sendTypingOff(userId)` |


### Messenger Profile API

#### `.addGreeting(text)`

[Facebook Docs](https://developers.facebook.com/docs/messenger-platform/messenger-profile/greeting-text)

| Param | Type | Default | Required |
|:------|:-----|:--------|:---------|
| `text` | string or array | | `Y` |

Set a greeting text for new conversations. The Greeting Text is only rendered the first time the user interacts with a the Page on Messenger.

**Localization support:** `text` can be a string containing the greeting text, or an array of objects to support multiple locales. For more info on the format of these objects, see [the documentation](https://developers.facebook.com/docs/messenger-platform/messenger-profile/greeting-text).

##### Example

```
bot.addGreeting(
  "cryptocurrency trading bot."
);
```

#### `.addGetStartedButton(action)`

[Facebook Docs](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/get-started-button)

| Param | Type | Default | Required |
|:------|:-----|:--------|:---------|
| `action` | string or function | | `Y` |

React to a user starting a conversation with the bot by clicking the Get Started button. If `action` is a string, the Get Started button postback will be set to that string. If it's a function, that callback will be executed when a user clicks the Get Started button.

#### `.deleteGetStartedButton()`

Removes the Get Started button call to action.

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

```
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