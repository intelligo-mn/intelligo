const validate = require('./helpers/validate');
const request = require('request');
const path = require('path');

const middlewareWrapper = config => {
  const validatedConfig = validate(config);

  const pingService = (url, cb) => {
    request({
      method: 'GET',
      uri: url,
      time: true
    }, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        // we'll use the time from the point we try to establish a connection with
        // the service until the first byte is received
        cb(res.timingPhases.firstByte)
      } else {
        cb('OUTAGE')
      }
    })
  }
  
  const pingInterval = 1*1000*60 // 1 minutes
  let serviceStatus = {}
  
  monitor => {
    serviceStatus[validatedConfig.url] = {
      status: 'OPERATIONAL', // initialize all services as operational when we start
      responseTimes: [], // array containing the responses times for last 3 pings
      timeout: validatedConfig.timeout // load up the timout from the config
    }
  
    setInterval(() => {
      pingService(validatedConfig.url, (serviceResponse) => {
        if (serviceResponse === 'OUTAGE' && serviceStatus[validatedConfig.url].status !== 'OUTAGE') {
          // only update and post to Slack on state change
          serviceStatus[validatedConfig.url].status = 'OUTAGE'
          postToSlack(validatedConfig.url)
        } else {
          let responseTimes = serviceStatus[validatedConfig.url].responseTimes
          responseTimes.push(serviceResponse)
  
          // check degraded performance if we have 3 responses so we can average them
          if (responseTimes.length > 3) {
            // remove the oldest response time (beginning of array)
            responseTimes.shift()
  
            // compute average of last 3 response times
            let avgResTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
            let currService = serviceStatus[validatedConfig.url]
  
            if (avgResTime > currService.timeout && currService.status !== 'DEGRADED') {
              currService.status = 'DEGRADED'
              postToSlack(validatedConfig.url)
            } else if (avgResTime < currService.timeout && currService.status !== 'OPERATIONAL') {
              currService.status = 'OPERATIONAL'
              postToSlack(validatedConfig.url)
            }
          }
  
        }
      })
    }, pingInterval)
  }
  
  const postToSlack = (serviceUrl) => {
    var message = "";
    if (serviceStatus[serviceUrl].status == 'DEGRADED'){
        message = "`СИСТЕМИЙН АЖИЛЛАГАА УНАСАН !!!` :skull: ";
    } else if (serviceStatus[serviceUrl].status == 'OPERATIONAL') {
       message = "СИСТЕМИЙН АЖИЛЛАГАА ХЭВИЙН БАЙНА :robot_face:";
    } else if (serviceStatus[serviceUrl].status == 'OUTAGE') {
       message = "СИСТЕМИЙН АЖИЛЛАГАА ДОГОЛДЛОО :zzz:";
    }
    let slackPayload = {
      text: `*${message}*\n_${serviceUrl}_`
    }
  
    request({
      method: 'POST',
      uri: validatedConfig.SLACK_WEBHOOK_URL,
      body: slackPayload,
      json: true
    }, (err, res, body) => {
      if (err) console.log(`Error posting to Slack: ${err}`)
    })
  }
  
  const middleware = (req, res, next) => {
    
    const startTime = process.hrtime();

    if (req.path === validatedConfig.path) {
      if (validatedConfig.iframe) {
        if (res.removeHeader) {
          res.removeHeader('X-Frame-Options');
        }
        if (res.remove) {
          res.remove('X-Frame-Options');
        }

      }
      res.send("Hello");
    } else {
      next();
    }
  };

  middleware.middleware = middleware;
  middleware.pageRoute = (req, res) => {
    res.send("Hello");
  };
  return middleware;
};

module.exports = middlewareWrapper;