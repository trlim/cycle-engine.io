/* jshint esnext: true */
'use strict';

import {Rx} from '@cycle/core';
import EngineIO from 'engine.io-client';

function makeEngineIODriver(url, options) {
  let socket = new EngineIO.Socket(url, options);

  // socket.binaryType = 'blob';

  return function engineIODriver(event$) {
    event$.forEach(event => socket.send(event));
    return Rx.Observable.create(observer => {
      socket.on('open', function() {
        console.log('open', url);
      });
      socket.on('message', function(data) {
        observer.onNext(data);
      });
      socket.on('close', function() {
        console.log('close', url);
      });

      return function dispose() {
        socket.close();
      };
    });
  };
}

export default {makeEngineIODriver};
