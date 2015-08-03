/* jshint esnext: true */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cycleCore = require('@cycle/core');

var _engineIoClient = require('engine.io-client');

var _engineIoClient2 = _interopRequireDefault(_engineIoClient);

function makeEngineIODriver(url, options) {
  var socket = new _engineIoClient2['default'].Socket(url, options);

  // socket.binaryType = 'blob';
  return function engineIODriver(event$) {
    event$.forEach(function (event) {
      return socket.send(event);
    });
    return _cycleCore.Rx.Observable.create(function (observer) {
      socket.on('message', function (data) {
        observer.onNext(data);
      });
      socket.on('close', function () {
        console.log('close', url);
      });

      return function dispose() {
        socket.close();
      };
    });
  };
}

exports['default'] = { makeEngineIODriver: makeEngineIODriver };
module.exports = exports['default'];
