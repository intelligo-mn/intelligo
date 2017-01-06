const JSONStream = require('./')
const stream = JSONStream.parse('data.*')


stream.on('data', (row) => {
  console.log(row) // this never gets called, the stream closes immediately
})


stream.write('{"data":')
stream.write('[')
stream.write('{"count": 1},')
stream.write('{"count": 2},')
stream.write('{"count": 3}')
stream.write(']}')
stream.end()


