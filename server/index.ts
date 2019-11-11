const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const redis = require('redis');

// GLOBAL PARAMS
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

// CONFIGURE REDIS
// const client = redis.createClient();

// client.on('error', function(err){
//   console.log('Something went wrong ', err)
// });
// client.set('my test key', 'my test value', redis.print);
// client.get('my test key', function(error, result) {
//   if (error) throw error;
//   console.log('GET result ->', result)
// });

// CONFIGURE APP


const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = require('express')();

    server.use(bodyParser.json())
    server.use(cookieParser())

    server.get('*', (req, res, next) => {
      handle(req, res)
    })
    

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })

  })
  .catch(err => {

  })