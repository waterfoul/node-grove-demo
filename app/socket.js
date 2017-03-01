//@flow

import SockJS from 'sockjs-client';

export const socketServer = new SockJS('/socket');

const subs = {};
let connected = false;
const queue = [];


socketServer.onopen = function()  {
  connected = true;
  queue.forEach(socketServer.send.bind(socketServer));
};
socketServer.onmessage = function(e) {
  const data = JSON.parse(e.data);

  const msgSubs = subs[data.name][data.channel];

  if(msgSubs) {
    msgSubs.forEach((fn) => fn(data.value));
  }
};

function send(data) {
  data = JSON.stringify(data);
  
  if(connected) {
    socketServer.send(data);
  } else {
    queue.push(data);
  }
}

export function subscribe(name, socket, callback) {
  subs[name] = subs[name] || {};
  subs[name][socket] = subs[name][socket] || [];
  subs[name][socket].push(callback);

  send({
    subscribe: {
      name,
      socket
    }
  })
}