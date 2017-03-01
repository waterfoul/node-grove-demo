//@flow

const sockjs = require('sockjs');

const server = sockjs.createServer({sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"});
const clients = [];
const subscriptions = {};
const unsubscriptions = {};

function onSubscribe (channelName, callback) {
  subscriptions[channelName] = subscriptions[channelName] || [];

  subscriptions[channelName].push(callback);
}

function onUnsubscribe (channelName, callback) {
  unsubscriptions[channelName] = unsubscriptions[channelName] || [];

  unsubscriptions[channelName].push(callback);
}

server.on('connection', function(conn) {
  clients.push(conn);
  conn.on('data', function(message) {
    message = JSON.parse(message);

    if(message.subscribe) {
      const sub = subscriptions[message.subscribe.name];
      if(sub) {
        sub.forEach((fn) => fn(conn, message.subscribe.socket));
      }
    }
  });
});

module.exports = {
  server,
  onSubscribe,
  onUnsubscribe
};
