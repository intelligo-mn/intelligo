(() => {
  let base = {
    uuidv4: () => {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
        .toString()
        .replace(/[018]/g, function(c) {
          return (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16);
        });
    },
    parseURL: url => {
      var a = document.createElement('a');
      a.href = url;
      return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
      };
    },
    setCookie: (name, value, days = 7, path = '/') => {
      try {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie =
          name +
          '=' +
          encodeURIComponent(value) +
          '; expires=' +
          expires +
          '; path=' +
          path;
      } catch (e) {}
    },
    getCookie: name => {
      try {
        return document.cookie.split('; ').reduce((r, v) => {
          const parts = v.split('=');
          return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, '');
      } catch (e) {
        return '';
      }
    },
    deleteCookie: (name, path) => {
      setCookie(name, '', -1, path);
    },
    scriptEle: () => {
      return document.getElementById('intelligo-web-chat-script');
    },
    getAttr: (script, attr) => {
      return (
        script.getAttribute('intelligo-' + attr) ||
        script.getAttribute('data-' + attr)
      );
    },
    deeplinkHandler: null,
    initScript: () => {
      var minMaxClickHandler = () => {
        var minBtn = document.getElementById('intelligo-min-btn');
        var maxBtn = document.getElementById('intelligo-max-btn');
        let intelligoRoot = document.getElementById('intelligo-root');
        if (!intelligoRoot.classList.contains('intelligo-min')) {
          intelligoRoot.classList.add('intelligo-min');
          minBtn.classList.remove('intelligo-max');
          maxBtn.classList.remove('intelligo-max');
          intelligoRoot.classList.remove('maximizeAnimation');
          intelligoRoot.classList.add('minimizeAnimation');
        } else {
          intelligoRoot.classList.remove('intelligo-min');
          minBtn.classList.add('intelligo-max');
          maxBtn.classList.add('intelligo-max');
          intelligoRoot.classList.add('maximizeAnimation');
          intelligoRoot.classList.remove('intelligo-hidden');
          intelligoRoot.classList.remove('minimizeAnimation');
        }
      };

      document
        .getElementById('intelligo-min-btn')
        .addEventListener('click', minMaxClickHandler);
      document
        .getElementById('intelligo-max-btn')
        .addEventListener('click', minMaxClickHandler);

      window.onmessage = function(event) {
        if (event.data && event.data.type && event.data.type == 'LOADED')
          document.getElementsByClassName(
            'intelligo-loading-overlay',
          )[0].style.display = 'none';
        if (event.data && event.data.type && event.data.type == 'DEEPLINK') {
          if (base.deeplinkHandler) base.deeplinkHandler(event.data.payload);
        }
      };
    },
    autoOpenSetup: (autoOpen, fullpage) => {
      var maximize = () => {
        var minBtn = document.getElementById('intelligo-min-btn');
        var maxBtn = document.getElementById('intelligo-max-btn');
        let intelligoRoot = document.getElementById('intelligo-root');
        intelligoRoot.classList.remove('intelligo-min');
        minBtn.classList.add('intelligo-max');
        maxBtn.classList.add('intelligo-max');
        intelligoRoot.classList.add('maximizeAnimation');
        intelligoRoot.classList.remove('intelligo-hidden');
        intelligoRoot.classList.remove('minimizeAnimation');
      };

      if (autoOpen > 0 && !fullpage) {
        setTimeout(() => {
          maximize();
        }, autoOpen * 1000);
      }
    },
    main: (givenCustomerId, initVerbs, deeplinkHandler) => {
      let script = base.scriptEle();
      let showBranding = base.getAttr(script, 'show-branding') || false;
      let fullpage = base.getAttr(script, 'fullpage') || false;
      let simulator = base.getAttr(script, 'simulator') || false;
      let stompEndpoint = base.getAttr(script, 'endpoint');
      let businessId = base.getAttr(script, 'businessid');
      let apiEndpoint = base.getAttr(script, 'api-endpoint');
      let logoClickUrl = base.getAttr(script, 'logo-action-url');
      let msgSounds = base.getAttr(script, 'msg-sounds') || false;
      let autoOpen = parseInt(base.getAttr(script, 'auto-open') || 0);
      let allowFlowReset =
        base.getAttr(script, 'allow-chat-reset') === 'true' ? true : false;
      let htmlMessages =
        base.getAttr(script, 'html-messages') === 'true' ? true : false;
      let currentSessionOnly =
        base.getAttr(script, 'current-session-only') === 'false' ? false : true;
      let flowId = base.getAttr(script, 'flowid');
      let fileUploadUrl = '';

      base.deeplinkHandler = deeplinkHandler;

      if (!apiEndpoint) {
        fileUploadUrl = base.getAttr(script, 'file-upload-url');
        if (fileUploadUrl) {
          let _url = base.parseURL(fileUploadUrl);
          apiEndpoint = _url.protocol + '://' + _url.host;
          if (apiEndpoint.charAt(apiEndpoint.length - 1) != '/')
            apiEndpoint += '/';
        }
      } else {
        if (apiEndpoint.charAt(apiEndpoint.length - 1) != '/')
          apiEndpoint += '/';

        fileUploadUrl = apiEndpoint + 'files';
      }

      let customerIdCookieName = 'intelligo-customerid-for-' + businessId;
      if (givenCustomerId) {
        base.setCookie(customerIdCookieName, givenCustomerId);
      }
      let customerId = base.getCookie(customerIdCookieName); //Get customer id for this business
      if (!customerId) {
        customerId = base.uuidv4(); //new customer id
        base.setCookie(customerIdCookieName, customerId);
      }

      let stompConfig = {
        endpoint: stompEndpoint,
        customerId: customerId,
        businessId: businessId,
        flowId: flowId || businessId,
        currentSessionOnly: currentSessionOnly,
        debug: base.getAttr(script, 'debug') || false,
      };

      let brandingConfig = {
        primaryBackgroundColor: base.getAttr(script, 'primary-bg') || '#8cc83c',
        primaryForegroundColor: base.getAttr(script, 'primary-fg') || 'white',
        secondaryBackgroundColor:
          base.getAttr(script, 'secondary-bg') || '#3c3c3c',
        logoUrl:
          base.getAttr(script, 'logo-url') ||
          'https://intelligo.systems/favicon.ico',
        agentName: base.getAttr(script, 'agent-name'),
        agentDesc: base.getAttr(script, 'agent-desc'),
        frameHeight: base.getAttr(script, 'frame-height') || '500px',
        frameWidth: base.getAttr(script, 'frame-width') || '360px',
        frameContentWidth:
          base.getAttr(script, 'frame-content-width') || '360px',
        logoClickUrl: logoClickUrl,
      };

      let appConfig = {
        fileUploadEndpoint: fileUploadUrl,
        apiEndpoint: apiEndpoint,
        initVerbs: initVerbs,
        htmlMessages: htmlMessages,
        allowFlowReset: allowFlowReset,
        fullpage: fullpage,
        msgSounds: msgSounds,
      };
      let thirdPartyConfig = {
        googleMapsKey: base.getAttr(script, 'gmaps-key'),
      };
      let settings = {};
      let iframeUrl = {};

      if (simulator) {
        settings = {
          brandingConfig,
          appConfig,
          thirdPartyConfig,
        };
        iframeUrl =
          base.getAttr(script, 'iframe-src') +
          '?s=' +
          btoa(JSON.stringify(settings));
      } else {
        settings = {
          stompConfig,
          brandingConfig,
          appConfig,
          thirdPartyConfig,
        };
        iframeUrl =
          base.getAttr(script, 'iframe-src') +
          '?s=' +
          btoa(JSON.stringify(settings));
      }

      let styleInHead = `
   .intelligo-full {
      width: 100%;
      height: 100%;
    }

    .intelligo-root {
	  z-index: 1000000;
      position: fixed;
      bottom: 35px;
      right: 20px;
      background-color: transparent;
      font-family: 'Open Sans';
      display: block;
    }
	.intelligo-root.fullscreen {
		top: 50%;
		left: 50%;
		right: 30%;
		transform: translate(-50%,-50%);
	}
	
    .intelligo-frame-container {
      box-shadow: 0px 6px 40px 1px rgba(0,0,0,0.36);
      border-radius: 10px !important;
      display: flex;
      flex-direction: column;
      position: relative;
	  background-color: #F5F5F5;
    }

    .intelligo-full-screen {
      background-color: rgba(0, 0, 0, 0.84);
    }

    .intelligo-iframe {
      border: none;
      width: 100%;
      flex-grow: 1;
      border-radius: inherit;
    }

    .intelligo-title {
      
    }

    .intelligo-content {
      display: inline;
    }

      .intelligo-content > .title {
        font-weight: bold;
        font-size: 18px;
        position: relative;
      }

      .intelligo-content > .subtitle {
        font-size: 11px;
      }

    .intelligo-online-dot {
      border-radius: 5px;
      height: 5px;
      width: 5px;
      background-color: #00DF50;
      border: 1px solid ${brandingConfig.primaryForegroundColor};
      position: absolute;
      bottom: 4px;
      transform: translate(4px, -0.5px);
    }

    .intelligo-actions > img {
      width: 50px;
    }

    .intelligo-minmax-btn {
	  z-index: 1000000;
      position: fixed;
      right: 20px;
      bottom: 20px;
      background-color: ${brandingConfig.primaryBackgroundColor};
      height: 60px;
      width: 60px;
      border-radius: 60px !important;
      cursor: pointer;
      box-shadow: 0px 6px 40px 1px rgba(0,0,0,0.36);
    }
    .intelligo-minmax-btn:hover {
      box-shadow: 0px 6px 40px 4px rgba(0,0,0,0.36);
    }
    .intelligo-minmax-btn>img,
	.intelligo-minmax-btn>.max-btn{
        width: 36px;
        height: 36px;
        margin: 12px;
    }
    
	.intelligo-min.intelligo-root {
      /*display: none;*/
    }

    @-webkit-keyframes maximizeAnimation {
      0% {
          opacity: 0;
		  width: 0px;
          height: 0px;
      }
      100% {
          opacity: 1;
          width: ${brandingConfig.frameWidth};
          height: ${brandingConfig.frameHeight};
      }
    }
         
    @keyframes maximizeAnimation {
      0% {
          opacity: 0;
		  width: 0px;
          height: 0px;
      }
      100% {
          opacity: 1;
          width: ${brandingConfig.frameWidth};
          height: ${brandingConfig.frameHeight};
      }
    }
         
    .maximizeAnimation {
      -webkit-animation-name: maximizeAnimation;
      animation-name: maximizeAnimation;
      -webkit-animation-duration: 0.3s;
      animation-duration: 0.3s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }

    @-webkit-keyframes minimizeAnimation {
      0% {
          opacity: 1;
          width: ${brandingConfig.frameWidth};
          height: ${brandingConfig.frameHeight};
      }
      100% {
          opacity: 0;
          display: none;
          width: 0px;
          height: 0px;
      }
    }
         
    @keyframes minimizeAnimation {
      0% {
          opacity: 1;
          width: ${brandingConfig.frameWidth};
          height: ${brandingConfig.frameHeight};
      }
      100% {
          opacity: 0;
          display: block;
          width: 0px;
          height: 0px;
      }
    }
         
    .minimizeAnimation {
      -webkit-animation-name: minimizeAnimation;
      animation-name: minimizeAnimation;
      -webkit-animation-duration: 0.3s;
      animation-duration: 0.3s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }

    .intelligo-hidden {
      display: none;
    }

	.intelligo-max.intelligo-minmax-btn{
		border-radius: 3px !important;
		height: 24px;
		width: 24px;
		box-shadow: none;
		background-color: transparent;

		position: absolute;
		top: 15px;
		right: 10px;
	}
	.intelligo-max.intelligo-minmax-btn:hover {
		background-color: rgba(0,0,0,0.1);
	}
	.intelligo-max.intelligo-minmax-btn:hover>.min-btn {
		opacity: 1;
	}

	.intelligo-max.intelligo-minmax-btn path{
		fill: ${brandingConfig.primaryForegroundColor};
	}

	.intelligo-max.intelligo-minmax-btn>.max-btn{
		display: none;
	}
	.intelligo-max.intelligo-minmax-btn>.min-btn{
		display: block;
		opacity: 0.6;
	}
    .powered-by-intelligo {
		font-size: 11px;
		text-align: right;
		z-index: 20;
		position: absolute;
		bottom: -22px;
		width: 100%;
		display: ${showBranding ? 'block' : 'none'};
	}
	
	.powered-by-intelligo > div {
		display: inline;
		/*background-color: #F5F5F5;*/
		border-radius: 0 0 10px 10px;
		padding: 6px 24px;
		/*box-shadow: 0px 20px 40px 1px rgba(0,0,0,0.36)*/
	}
	
    .intelligo-link {
		color: #3c3c3c;
		text-decoration: none;
		font-family: sans-serif;
	}
    .intelligo-link:hover {
		text-decoration: underline;
	}
/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
	.intelligo-root{
		position: fixed;
		bottom: 0;
		right: 0;
		border: 0;		
		height: 100%;
		width: 100vw;
		color: #3c3c3c;
	}
    .powered-by-intelligo {
		display: none;
	}
	@-webkit-keyframes maximizeAnimation {
      0% {
          opacity: 0;
		  width: 0px;
          height: 0px;
      }
      100% {
          opacity: 1;
          width: 100vw;
          height: 100%;
      }
    }
         
    @keyframes maximizeAnimation {
      0% {
          opacity: 0;
		  width: 0px;
          height: 0px;
      }
      100% {
          opacity: 1;
		  width: 100vw;
          height: 100%;
      }
    }

	@-webkit-keyframes minimizeAnimation {
      0% {
          opacity: 1;
          width: 100vw;
          height: 100%;
      }
      100% {
          opacity: 0;
          display: none;
          width: 0px;
          height: 0px;
      }
    }
         
    @keyframes minimizeAnimation {
      0% {
          opacity: 1;
          width: 100vw;
          height: 100%;
      }
      100% {
          opacity: 0;
          display: block;
          width: 0px;
          height: 0px;
      }
    }
	
	.intelligo-frame-container {
		border-radius: 0 !important;
	}
}
.intelligo-minmax-btn.fullscreen,
.fullscreen .intelligo-minmax-btn{
	display: none;
}


.sk-circle {
  margin: 100px auto;
  width: 70px;
  height: 70px;
  position: relative;
}
.sk-circle .sk-child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-circle .sk-child:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: white;
  border-radius: 100%;
  -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
          animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
}
.sk-circle .sk-circle2 {
  -webkit-transform: rotate(30deg);
      -ms-transform: rotate(30deg);
          transform: rotate(30deg); }
.sk-circle .sk-circle3 {
  -webkit-transform: rotate(60deg);
      -ms-transform: rotate(60deg);
          transform: rotate(60deg); }
.sk-circle .sk-circle4 {
  -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
          transform: rotate(90deg); }
.sk-circle .sk-circle5 {
  -webkit-transform: rotate(120deg);
      -ms-transform: rotate(120deg);
          transform: rotate(120deg); }
.sk-circle .sk-circle6 {
  -webkit-transform: rotate(150deg);
      -ms-transform: rotate(150deg);
          transform: rotate(150deg); }
.sk-circle .sk-circle7 {
  -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
          transform: rotate(180deg); }
.sk-circle .sk-circle8 {
  -webkit-transform: rotate(210deg);
      -ms-transform: rotate(210deg);
          transform: rotate(210deg); }
.sk-circle .sk-circle9 {
  -webkit-transform: rotate(240deg);
      -ms-transform: rotate(240deg);
          transform: rotate(240deg); }
.sk-circle .sk-circle10 {
  -webkit-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
          transform: rotate(270deg); }
.sk-circle .sk-circle11 {
  -webkit-transform: rotate(300deg);
      -ms-transform: rotate(300deg);
          transform: rotate(300deg); }
.sk-circle .sk-circle12 {
  -webkit-transform: rotate(330deg);
      -ms-transform: rotate(330deg);
          transform: rotate(330deg); }
.sk-circle .sk-circle2:before {
  -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s; }
.sk-circle .sk-circle3:before {
  -webkit-animation-delay: -1s;
          animation-delay: -1s; }
.sk-circle .sk-circle4:before {
  -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s; }
.sk-circle .sk-circle5:before {
  -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s; }
.sk-circle .sk-circle6:before {
  -webkit-animation-delay: -0.7s;
          animation-delay: -0.7s; }
.sk-circle .sk-circle7:before {
  -webkit-animation-delay: -0.6s;
          animation-delay: -0.6s; }
.sk-circle .sk-circle8:before {
  -webkit-animation-delay: -0.5s;
          animation-delay: -0.5s; }
.sk-circle .sk-circle9:before {
  -webkit-animation-delay: -0.4s;
          animation-delay: -0.4s; }
.sk-circle .sk-circle10:before {
  -webkit-animation-delay: -0.3s;
          animation-delay: -0.3s; }
.sk-circle .sk-circle11:before {
  -webkit-animation-delay: -0.2s;
          animation-delay: -0.2s; }
.sk-circle .sk-circle12:before {
  -webkit-animation-delay: -0.1s;
          animation-delay: -0.1s; }

@-webkit-keyframes sk-circleBounceDelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
            transform: scale(0);
  } 40% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}

@keyframes sk-circleBounceDelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
            transform: scale(0);
  } 40% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}

.intelligo-loading-overlay {
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	position: absolute;
	background-color: rgba(0,0,0,0.1);
	border-radius: 10px;
}

.intelligo-loading-overlay .intelligo-loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
`;
      let htmlIntoBody = `
				<div class="intelligo-root ${
          fullpage
            ? 'intelligo-max maximizeAnimation fullscreen'
            : 'intelligo-min minimizeAnimation intelligo-hidden'
        }" id="intelligo-root">
					<div class="intelligo-frame-container intelligo-full">
						<iframe src="${iframeUrl}" class="intelligo-iframe" scrolling="no"></iframe>
					</div>
					<div class="intelligo-minmax-btn" id="intelligo-min-btn">
						<div class="min-btn" >
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
								<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
							</svg>
						</div>
					</div>
					<div class="powered-by-intelligo"><div><a class="intelligo-link" href="https://intelligo.systems" target="_blank">powered by intelligo</a></div></div>
					<div class="intelligo-loading-overlay">
						<div class="intelligo-loading">
							<div class="sk-circle">
							  <div class="sk-circle1 sk-child"></div>
							  <div class="sk-circle2 sk-child"></div>
							  <div class="sk-circle3 sk-child"></div>
							  <div class="sk-circle4 sk-child"></div>
							  <div class="sk-circle5 sk-child"></div>
							  <div class="sk-circle6 sk-child"></div>
							  <div class="sk-circle7 sk-child"></div>
							  <div class="sk-circle8 sk-child"></div>
							  <div class="sk-circle9 sk-child"></div>
							  <div class="sk-circle10 sk-child"></div>
							  <div class="sk-circle11 sk-child"></div>
							  <div class="sk-circle12 sk-child"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="intelligo-minmax-btn ${
          fullpage ? 'fullscreen' : ''
        }" id="intelligo-max-btn">
					<div class="max-btn" >
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
							<style type="text/css">
								.st0{fill:#FFFFFF;}
							</style>
							<g>
								<g>
									<path class="st0" d="M0,256c0,68.4,26.6,132.6,75,181c49.4,49.4,115,75,181.2,75c41.2,0,82.8-10,120.8-30.4
										c34.1,24.6,67.4,29.9,90.1,29.9c8.4,0,15.4-0.8,20.2-1.5c10.4-1.6,18.4-9.7,20-20.1s-3.7-20.5-13.1-25.1
										c-19.6-9.6-32.8-28.9-41-45.5c83.9-101,77.4-250.7-16.1-344.2c-48.4-48.4-112.6-75-181-75s-132.6,26.6-181,75S0,187.6,0,256z
											M95.9,95.7c88.3-88.4,232.2-88.4,320.6,0c84.6,84.6,88.8,221,9.5,310.6c-2.1,2.4-3.2,5.3-3.6,8.2c-0.8,3-0.5,6.3,0.8,9.4
										c8.1,18.5,22,42.3,43.9,58.3h-0.1c-19.1,0-47.8-4.8-77.2-27.5c-0.3-0.3-0.8-0.6-1.2-0.9c-4.7-4.7-11.9-5.7-17.8-2.3
										c-89,52.3-202.1,37.8-275.2-35.3C7.4,327.9,7.4,184.1,95.9,95.7z"/>
									<circle class="st0" cx="256.1" cy="256" r="18"/>
									<circle class="st0" cx="163.5" cy="256" r="18"/>
									<circle class="st0" cx="348.8" cy="256" r="18"/>
								</g>
							</g>
						</svg>
					</div>
				</div> 
				  `;

      let headStyle = document.createElement('style');
      headStyle.innerHTML = styleInHead;
      document.head.appendChild(headStyle);

      let divEle = document.createElement('div');
      divEle.innerHTML = htmlIntoBody;
      document.body.appendChild(divEle);

      base.initScript();

      base.autoOpenSetup(autoOpen, fullpage);
    },
  };
  let script = base.scriptEle();
  let manualInit = base.getAttr(script, 'manual-init');
  if (manualInit == 'true') {
    window.Intelligo = (...args) => {
      base.main(...args);
    };
  } else {
    base.main();
  }
})();
