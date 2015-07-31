# Cycle-SockJS

A [Cycle](http://cycle.js.org/) driver for applications using [SockJS](http://sockjs.org/)
Based on [Cycle-Socket.IO](https://github.com/cgeorg/cycle-socket.io)

## Usage

```javascript
import Cycle from '@cycle/core';
import SockJS from 'cycle-sockjs';

var main({dom, sockjs}) {
  const vtree$ = render(dom);

  let incoming$ = sockjs;
  let outgoing$ = incoming$.map(message => message);

  return {dom: vtree$, sockjs: outgoing$}
};

var domDriver = Cycle.makeDOMDriver(document.body);
var sockJSDriver = SockJS.makeSockJSDriver('http://localhost:9999/echo');

Cycle.run(main, {
  dom: domDriver,
  sockjs: sockJSDriver
});
```
