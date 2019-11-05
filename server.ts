const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.use(bodyParser.json())
app.use(cookieParser())

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === '/about') {
        console.log('about');
        app.render(req, res, '/about', query)
      } else if (pathname === '/') {
        console.log('home');
        app.render(req, res, '/', query)
      } else {
        handle(req, res, parsedUrl)
      }
    }).listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
    .catch(err => {

    })
})

/* 
SHOULD BE...

app.use('/login', authMiddleWare, handle(req, res, parsedUrl))

FOR AUTH ROUTES 
app.use('/private-route', validationMiddleWare, handle(req, res, parsedUrl))

MIDDLEWARES:
const authMiddleWare = async(req, res, next) => {
  const { creds } = res.body;

  getToken
    .then(data =. {
      res.cookie('token', data.token, {expires: data.expires, httpOnly: true})
      next();
    })
    .catch(err => {
      res.status(500)
    })
}

*/