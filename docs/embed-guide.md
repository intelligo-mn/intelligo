# Chatbots.mn Embed Plugin

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

Use Chatbots.mn Embed Plugin to deploy your intelligo chat bot onto your website. 

  - Brand it as your website.
  - Mobile friendly out of the box. 
  - A small code snippet to integrate it on any page. 

## Integration

**Step 1:**

Setup [intelligo Conversation Studio and intelligo Chat Server](https://github.com/intelligo-systems/chatbots.mn) to design and publish an intelligo chat bot.
  - Assuming you have done that have an intelligo Chat Server URL, let's call it `intelligo-chat-server.com`

**Step 2:**

Download `intelligo-web-chat-plugin.zip` from [releases](https://github.com/intelligo-systems/chatbots.mn/releases), extract and host it on any normal http server. Note the server URL. Let's call it `web-plugin.intelligo-chat-server.com`
   - If you want to host this at a path like `/web-plugin/` instead of the root of your server, you will also need to update `<base href="/">` inside `head` of `index.html` to `<base href="/web-plugin/">`. If you do it, intelligo web chat plug-in server URL will now be `intelligo-chat-server.com/web-plugin/`

**Step 3:**

Using intelligo Conversation Studio, design a chat bot, publish it and note down the chat project id. Let's call it `chat-bot-1` 
  - Click [here](https://github.com/intelligo-systems/chatbots.mn) if you have not setup intelligo Conversation Studio and created your chat bot yet! 

**Step 4:**

You need few more things listed below
   - The color hex code you want your chat window to be in.   For intelligo it's `#8cc83c`
   - Logo URL for the chat bot. For intelligo it's `http://intelligo.chat/favicon.ico`
   - Your chat bot name and a small description.
   - If your chat bot asks for locations to the users, you will need a google api key with google static maps and google maps javaScript SDK enabled. Head over to [Google API Console](https://console.developers.google.com) to get one.  
 
**Step 5:**

Replace all the placeholders in the below code with the onces noted above, copy and paste it in your website's html file just above the &lt;/body&gt; (body's closing tag)

```html
<script type="text/javascript" id="intelligo-web-chat-script"

src="http://<web-plugin.intelligo-chat-server.com>/assets/embed/intelligo-web-chat-plugin.js" 
intelligo-endpoint="http://<intelligo-chat-server.com>:8088/wscustomers/chatcustomers-websocket"
intelligo-businessid="chat-bot-1"
intelligo-primary-bg="#8cc83c"
intelligo-flowid="chat-project-id-1"

intelligo-logo-url="<Your chat bot logo url>"
intelligo-agent-name="<Chat bot name>"
intelligo-agent-desc="<A small description>"

intelligo-iframe-src="http://<web-plugin.intelligo-chat-server.com>/"
intelligo-api-endpoint="http://<intelligo-chat-server.com>:8080/"
intelligo-gmaps-key="<Your Google Maps API Key>"

intelligo-primary-fg="white"
intelligo-secondary-bg="black"
intelligo-frame-height="70vh"
intelligo-frame-width="360px"

intelligo-fullpage="true"
></script>
```

**Advanced options**

```
No of seconds to wait and open the chat window automatically:
intelligo-auto-open="30" 

Show or hide chat reset button:
intelligo-allow-chat-reset="true" or "false"

Enable HTML formatting in messages:
intelligo-html-messages="true" or "false"

Load only current chat session in history:
intelligo-current-session-only="false" or "true"

Show or hide 'Powered by Chatbots.mn':
intelligo-show-branding="true" or "false"

Enable chat message sounds:
intelligo-msg-sounds="false" or "true"
```

**Manual Initialization**

By default, the script will be initialized automatically. If you want to pass your own userId and any variables during the initialization, **you need to add** ```intelligo-manual-init="true"``` to the script tag and add the below snippet with the information you need. 
```
<script>
intelligo(<user-id>, {
    "<variable1>":"<value1>",
    "<variable2>":"<value2>"
});
</script>
```

## License

Chatbots.mn Embed Plugin is available under the [GNU GPLv3 license](https://www.gnu.org/licenses/gpl-3.0.en.html).