# Cycle-Engine.IO

A [Cycle](http://cycle.js.org/) driver for applications using [engine.io](https://github.com/socketio/engine.io)

Based on [Cycle-Socket.IO](https://github.com/cgeorg/cycle-socket.io)

## Usage

```javascript
import Cycle from '@cycle/core';
import EngineIO from 'cycle-engine.io';

var main({dom, socket}) {
  const vtree$ = render(dom);

  let incoming$ = socket;
  let outgoing$ = incoming$.map(message => message);

  return {dom: vtree$, socket: outgoing$}
};

var domDriver = Cycle.makeDOMDriver(document.body);
var engineIODriver = EngineIO.makeEngineIODriver('ws://localhost:9999');

Cycle.run(main, {
  dom: domDriver,
  socket: engineIODriver
});
```
