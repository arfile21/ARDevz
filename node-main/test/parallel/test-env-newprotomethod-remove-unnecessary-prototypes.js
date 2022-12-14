// Flags: --expose-internals
'use strict';
require('../common');

// This test ensures that unnecessary prototypes are no longer
// being generated by node::NewFunctionTemplate.

const assert = require('assert');
const { internalBinding } = require('internal/test/binding');
[
  internalBinding('udp_wrap').UDP.prototype.bind6,
  internalBinding('tcp_wrap').TCP.prototype.bind6,
  internalBinding('udp_wrap').UDP.prototype.send6,
  internalBinding('tcp_wrap').TCP.prototype.bind,
  internalBinding('udp_wrap').UDP.prototype.close,
  internalBinding('tcp_wrap').TCP.prototype.open,
].forEach((binding, i) => {
  assert.strictEqual('prototype' in binding, false, `Test ${i} failed`);
});
