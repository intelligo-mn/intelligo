module.exports = [
  {
    url: 'http://www.techstar.cloud', // URL of service we'll be pining
    timeout: 200 // threshold in milliseconds above which is considered degraded performance
  },
  {
    url: 'http://www.techstar.cloud/console',
    timeout: 300
  }
]