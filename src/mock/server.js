const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'mock-server.json'));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

console.log("started!")

server.use(jsonServer.bodyParser)
server.use(middlewares);

server.use(jsonServer.rewriter({
  '/servers': '/servers'
}));

server.post('/user/auth', (req, res) => {
  if (req.method === 'POST') {
    let user = req.body['username'];
    if (user != null && user == "user") {
      res.status(200).jsonp({
        "token": "token-content"
      });
    } else {
      res.status(400).jsonp({
        error: "Login error"
      });
    }
  }
});

server.use(router);
server.listen(port);