'use strict';
const common = require('../common');
const assert = require('assert');
const net = require('net');
const dc = require('diagnostics_channel');

const netClientSocketChannel = dc.channel('net.client.socket');
const netServerSocketChannel = dc.channel('net.server.socket');

const isNetSocket = (socket) => socket instanceof net.Socket;

netClientSocketChannel.subscribe(common.mustCall(({ socket }) => {
  assert.strictEqual(isNetSocket(socket), true);
}));

netServerSocketChannel.subscribe(common.mustCall(({ socket }) => {
  assert.strictEqual(isNetSocket(socket), true);
}));

const server = net.createServer(common.mustCall((socket) => {
  socket.destroy();
  server.close();
}));

server.listen(() => {
  const { port } = server.address();
  net.connect(port);
});
