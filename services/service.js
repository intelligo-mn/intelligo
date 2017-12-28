module.exports = [
  {
    url: 'http://localhost:3000', // URL of service we'll be pining
    timeout: 200 // threshold in milliseconds above which is considered degraded performance
  },
  {
    url: 'http://localhost:3001/health',
    timeout: 300
  }
]