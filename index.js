const express = require("express");
const fs = require("fs");
//import * as WebSocket from 'ws';
//const path = require('path');
const spdy = require('spdy');

class WsChatRoom {
  constructor(name) {
    this.connections = [];
    this.messages = [];
    this.name = name;

    console.log('Initializing ws room: ' + name);
  }
  addConnection(wss) {
    console.log('Connection added on '+this.name);
    this.connections.push(wss);
    wss.on('message', function(msg) {
      console.log(msg);
    });
  }
}

const rooms = {};
rooms.car = new WsChatRoom('car');
rooms.fashion = new WsChatRoom('fashion');
rooms.health = new WsChatRoom('health');

const app = express();
const expressWs = require('express-ws')(app);

const chatData = [
  {
    name: 'Машины',
    wsConnect: 8082,
    imgSrc: '/gallery/Car',
    uuid: 'car'
  },
  {
    name: 'Мода',
    wsConnect: 8083,
    imgSrc: '/gallery/fashion',
    uuid: 'fashion'
  },
  {
    name: 'Здоровье',
    wsConnect: 8084,
    imgSrc: '/gallery/health',
    uuid: 'health'
  }
];

app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

app.get("/api/roomList", (req, res) => {
  res.json(chatData);
});

app.get('/gallery/:name', async (request, res) => {
  const options = {
    root: __dirname,
  };
  res.sendFile(`/gallery/${ request.params.name }.jpg`, options);
});

app.ws('/websocket/:uuid', function(wss, req) {

  if( rooms[req.params.uuid] ) {
    rooms[req.params.uuid].addConnection(wss);
  } else {
    rooms[req.params.uuid] = new WsChatRoom(req.params.uuid);
    rooms[req.params.uuid].addConnection(wss);
  }
});

console.log(process.env.NODE_ENV);
console.log(process.env.PORT);

app.listen(app.get("port"), () => {
  console.log(`server running at port ${app.get("port")}`);
});

/*fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '/build'),
}).listen(process.env.PORT || 5000, function (err, address) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`server listening on ${ address }`)
});

fastify.get('/foo', function (req, res) {
  res.send('foo')
});*/

/*
const Fastify = require('fastify');
const WebSocketServer = new require('ws');
const http2 = require('http2');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8081;

const PORT = process.env.PORT || 5000

const fastify = Fastify({
  http2: true,
  https: {
    key: fs.readFileSync('conf/key.pem'),
    cert: fs.readFileSync('conf/cert.pem')
  }
});


const chatData = [
  {
    name: 'Машины',
    wsConnect: 8082,
    imgSrc: 'https://127.0.0.1:8081/image/car'
  },
  {
    name: 'Мода',
    wsConnect: 8083,
    imgSrc: 'https://127.0.0.1:8081/image/fashion'
  },
  {
    name: 'Здоровье',
    wsConnect: 8084,
    imgSrc: 'https://127.0.0.1:8081/image/health'
  }
];

const gallery = {
  Car: fs.readFileSync('gallery/Car.jpg'),
  fashion: fs.readFileSync('gallery/fashion.jpg'),
  health: fs.readFileSync('gallery/health.jpg'),
};

fastify.get('/', async (request, reply) => {
  try {
    if (request.raw.stream.pushAllowed) {
      for (const asset of []) {//'/image/Car', '/image/fashion', '/image/health'
        request.raw.stream.pushStream({':path': asset}, (err, pushStream, headers) => {
          if (err) {
            console.log(err);
            return
          }
          const arr = asset.split('/');
          pushStream.respondWithFile(`./gallery/${ arr[arr.length-1] }.jpg`,
            { 'content-type': 'image/jpg' });
        });
      }
    } else {
      console.log('server push is not allowed by client');
    }
    reply.header('Access-Control-Allow-Origin', '*');
    return chatData;
  } catch (e) {
    console.log(e);
  }
});

fastify.get('/image/:name', async (request, reply) => {
  let img;
  await fs.readFile(`gallery/${ request.params.name }.jpg`, (err, data) => {
    if (err) throw err;
    img = data;
    reply.header('Content-Type', 'image/jpg');
    reply.send(img);
  });
});

fastify.listen(port, hostname, () => {
  console.log(`Http2 server running at https://${hostname}:${port}/`);
});

class WsChatServer {
  constructor(port){
    this.clients = {};
    this.messages = {};
    console.log('Starting ws server on port '+port);
    this.wss =  new WebSocketServer.Server({
      port: port
    });

    this.wss.on('connection', function(ws) {

      const id = Math.random();
      this.clients[id] = { ws, name: '' };
      const clients = this.clients;
      ws.on('message', function(message) {
        const event = JSON.parse(message);
        if(event.type === 'greetings') {
          for (const key in clients) {
            clients[id].name = event.name;
            clients[key].ws.send(JSON.stringify({ type: 'system', message: `Пользователь с ником ${ clients[id].name } присоединился`}));
          }
        }

        if(event.type === 'message') {
          for (const key in clients) {
            clients[key].ws.send(JSON.stringify({ type: 'message', message: event.message, name: clients[id].name }));
          }
        }
      });

      ws.on('close', function() {
        const name = clients[id].name;
        delete clients[id];
        for (const key in clients) {
          try {
            clients[key].ws.send(JSON.stringify({ type: 'system', message: `Пользователь с ником ${ name } отключился`}));
          } catch (e) {
          }
        }
      });
    });


  }
}

const wss1 = new WsChatServer(8082);
const wss2 = new WsChatServer(8083);
const wss3 = new WsChatServer(8084);


/!*fs.readFile(`gallery/${ arr[arr.length-1] }.jpg`, (err, data) => {
  pushStream.respond({ ':status': 200, 'content-type': 'image/jpg' });
  pushStream.end(data);
});*!/
//const data = fs.readFileSync(`gallery/${ arr[arr.length-1] }.jpg`);
//pushStream.respond({ ':status': 200, 'content-type': 'image/jpg' });
//pushStream.end(data);
//pushStream.respondWithFile(`./gallery/${ arr[arr.length-1] }.jpg`, { ':status': 200, 'Content-type': 'image/jpg' })
//const data = fs.readFileSync(`gallery/${ arr[arr.length-1] }.jpg`);

/!*pushStream.respond({ ':status': 200, 'Content-Type': 'image/jpg' });
pushStream.end(gallery[arr[arr.length-1]]);*!/
*/
